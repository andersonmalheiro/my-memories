import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { handleError } from 'utils/error-handler';
import { client } from '../api';

export interface AuthContextProps {
  user: UserData | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginData) => void;
  logout: () => void;
  check: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export interface UserData {
  auth_id: number;
  cliente_novo_revan: boolean;
  documento: string;
  email: string;
  hash_key: string;
  id: number;
  nome: string;
  resetar_senha: boolean;
  telefone: number;
  telefone2: number;
  token: string;
  upload_termos: boolean;
}

export interface LoginData {
  documento: string;
  senha: string;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (data: LoginData) => {
    try {
      setLoading(true);
      const response = await client.post('auth/login', data);

      if (response.data) {
        const { data } = response;
        client.defaults.headers.token = data.token;
        setLoading(false);
        setUser(data);
        localStorage.setItem('_auth', JSON.stringify(data));
      }
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('_auth');
    setUser(null);
  };

  const check = useCallback(async () => {
    try {
      setLoading(true);
      const response = await client.get('/auth/check');

      if (response.status === 200) {
        setLoading(false);
        return;
      }
    } catch (error) {
      handleError(error);
      setLoading(false);
      logout();
    }
  }, []);

  useEffect(() => {
    const loadUserFromStorage = () => {
      let storedUser = localStorage.getItem('_auth');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        client.defaults.headers.token = parsedUser.token;
      }
      setLoading(false);
    };
    loadUserFromStorage();
    check();
  }, [check]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout, check }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export const PrivateRoute: React.FC<RouteProps> = ({ ...rest }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
};

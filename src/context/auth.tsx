import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { handleError } from 'utils/error-handler';
import { client, login, check, ILoginBody } from '../api';

export interface AuthContextProps {
  user: ILoginBody | null;
  isAuthenticated: boolean;
  loading: boolean;
  authenticate: (data: ILoginBody) => void;
  checkToken: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<ILoginBody | null>(null);
  const [loading, setLoading] = useState(true);

  const authenticate = async (data: ILoginBody) => {
    try {
      setLoading(true);
      const response = await login(data);

      if (response) {
        client.defaults.headers.Authorization = `Bearer ${response.token}`;
        setLoading(false);
        setUser(response as any);
        localStorage.setItem('_auth', JSON.stringify(response));
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

  const checkToken = useCallback(async () => {
    try {
      setLoading(true);
      const response = await check();

      if (response) {
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
        client.defaults.headers.Authorization = `Bearer ${parsedUser.token}`;
      }
      setLoading(false);
    };
    loadUserFromStorage();
    check();
  }, [check]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        authenticate,
        loading,
        logout,
        checkToken,
      }}
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

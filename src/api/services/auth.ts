import { client } from '../client';

export interface ILoginBody {
  username: string;
  password: string;
}

export interface ILoginResult {
  token: string;
  exp: string;
  username: string;
  userId: string;
  accessLevel: boolean;
}

interface ICheckResult {
  token: string;
  exp: string;
  username: string;
  userId: string;
  accessLevel: boolean;
}

export const login = async (
  data: ILoginBody
): Promise<ILoginResult | undefined> => {
  try {
    const response = await client.post('/auth/login', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const check = async (): Promise<ICheckResult | undefined> => {
  try {
    const response = await client.get('/auth/check');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

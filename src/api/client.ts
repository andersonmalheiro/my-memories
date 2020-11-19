import Axios from 'axios';
import { handleError } from 'utils/error-handler';
const API_URL = 'https://memory-app-back.herokuapp.com/';

export const client = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    handleError(error);
    return Promise.reject(error);
  }
);

import Axios from 'axios';
const API_URL = 'https://memory-app-back.herokuapp.com/';

export const client = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

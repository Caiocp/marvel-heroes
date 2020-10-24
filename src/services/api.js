import Axios from 'axios';

const api = Axios.create({
  baseURL: 'https://gateway.marvel.com:443/v1/public',
});

export default api;

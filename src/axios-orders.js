import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-b7330.firebaseio.com/'
});

export default instance;
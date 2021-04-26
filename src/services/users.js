import axios from 'axios';

export const fetcher = (url) => axios.get(url).then(res => res.data);

export const fetchUsers = () => {
  return axios.get('https://randomuser.me/api/?results=10').then((resp) => resp.data.results);
}
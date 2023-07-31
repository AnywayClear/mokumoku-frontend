import Axios from 'axios';
const axios = Axios.create(
  
);

export const get = async (url: string) => {
  const res = await axios.get<Response>(url);
  return res.data;
};

const post = async (url: string, body?: Request) => {
  const res = await axios.post<Response>(url, body);
  return res.data;
};

const put = async (url: string, body?: Request) => {
  const res = await axios.put<Response>(url, body);
  return res.data;
};




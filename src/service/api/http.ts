import Axios from 'axios';
const axios = Axios.create({
  withCredentials: true,
  // headers: {
  // Authorization:
  //   localStorage && localStorage.getItem('accessToken')
  //     ? `Bearer ${localStorage.getItem('accessToken')}`
  //     : null,
  // 'Content-Type': 'application/json',
  // },
});

export const get = async (url: string) => {
  const res = await axios.get<Response>(url);
  return res.data;
};

export const post = async (url: string, body?: Request) => {
  const res = await axios.post<Response>(url, body);
  return res.data;
};

export const put = async (url: string, body?: Request) => {
  const res = await axios.put<Response>(url, body);
  return res.data;
};

export const del = async (url: string) => {
  const res = await axios.delete<Response>(url);
  return res.data;
};

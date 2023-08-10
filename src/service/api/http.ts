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

const getConfig = () => {
  return {
    headers: {
      Authorization:
        localStorage && localStorage.getItem('accessToken')
          ? `Bearer ${localStorage.getItem('accessToken')}`
          : null,
      'Content-Type': 'application/json',
    },
  };
};

export const get = async (url: string) => {
  const res = await axios.get<Response>(getUrl(url), getConfig());
  return res.data;
};

export const post = async (url: string, body?: any) => {
  const res = await axios.post<Response>(getUrl(url), body, getConfig());
  return res.data;
};

export const put = async (url: string, body?: any) => {
  const res = await axios.put<Response>(getUrl(url), body, getConfig());
  return res.data;
};

export const del = async (url: string) => {
  const res = await axios.delete<Response>(getUrl(url), getConfig());
  return res.data;
};

export const patch = async (url: string, body?: any) => {
  const res = await axios.patch<Response>(getUrl(url), body, getConfig());
  return res.data;
};

export const getUrl = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`;
};

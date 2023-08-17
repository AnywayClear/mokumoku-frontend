import { get, post, put, del } from './http';

export const getUserInfo = async (userId: string) => {
    const res = await get(`/api/members/${userId}`);
    return res;
}

export const delUser = async () => {
    const res = await del(`/api/members`);
    return res;
}

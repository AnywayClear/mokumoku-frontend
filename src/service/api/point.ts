import { string } from 'yup';
import { get, post, put, patch } from './http';

export const getPoint = async() => {
    const res = await get(`/api/points`);
    return res;
}

export const changePoint = async(sellerId:string, amount:number, is_plus:boolean)=>{
    const data = {sellerId: sellerId, amount:amount, is_plus:is_plus};
    const res = await patch(`/api/points?userId={{consumerId2}}`, data);
    return res;
}

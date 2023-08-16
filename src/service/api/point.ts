import { string } from 'yup';
import { get, post, put, patch } from './http';

export const getPoint = async (customerId: string) => {
    const res = await get(`/api/points/${customerId}`);
    return res;
}

export const changePoint = async(consumerId:string,balance:number)=>{
    console.log(`/api/points/${consumerId}`);

    const data = {
        balance:balance
    };
    const res = await patch(`/api/points/${consumerId}`, data);
    return res;
}

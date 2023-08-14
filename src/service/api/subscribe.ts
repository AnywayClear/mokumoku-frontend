import { get, post, put } from './http';

export const hasSubscribed = async(sellerId: string|null|undefined)=>{
    const res = await get(`/api/subscribes/${sellerId}/member`);
    return res;
}

export const doSubscribe = async(sellerId: string|null|undefined, consumerId: string|null|undefined)=>{
    const data = {
        consumerId : consumerId,
        sellerId : sellerId
    }
    const res = await post(`/api/subscribes`,data);
    return res;
}

export const getSubscribeList = async(consumerId: string | undefined)=>{
    const res = await get(`/api/subscribes?userId=${consumerId}`);
    return res;
}


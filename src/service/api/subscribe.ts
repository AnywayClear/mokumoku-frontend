import { get, post, put , del} from './http';

export const hasSubscribed = async(sellerId: string|undefined)=>{
    console.log(sellerId);
    const res = await get(`/api/subscribes/${sellerId}/member`);
    return res;
}

export const doSubscribe = async(sellerId: string|undefined)=>{
    const res = await get(`/api/subscribes/${sellerId}/subscribe`);
    console.log(`do: /api/subscribes/${sellerId}`);
    return res;
}

export const cancelSubscribe = async(sellerId: string|undefined)=>{
    const res = await del(`/api/subscribes/${sellerId}`);
    console.log(`cancel: /api/subscribes/${sellerId}`);
    return res;
}

export const getSubscribeList = async(consumerId: string | undefined)=>{
    const res = await get(`/api/subscribes?userId=${consumerId}`);
    return res;
}


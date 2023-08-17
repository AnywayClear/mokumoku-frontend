import { pageInfo } from "./page"
import { Produce } from "./produce"
import { userData } from "./user"

export type Deal = {
    dealId:number,
    endPrice:number,
    produce:Produce,
    consumer: userData,
    seller: userData,
    paid:boolean,
    reviewed:boolean
}
export type DealList ={
    data: Deal[],
    pageInfo: pageInfo,
}

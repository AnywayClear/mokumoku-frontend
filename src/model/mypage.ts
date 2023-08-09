import { Dayjs } from "dayjs";

export type searchType={
    title: string|null,
    auctionState: number|null,
    dateState:number|null,
    startDate: string|null,
    endDate : string|null,
    orderBy : string
}

export type subscribeUserType = {
    img: string;
    nickname: string;
};
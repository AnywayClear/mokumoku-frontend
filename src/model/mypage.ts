export type searchType={
    title: string|null,
    auctionState: number[],
    dateState:number|null,
    startDateStr: string|null,
    endDateStr : string|null,
    orderBy : string
}
type subscribeResponse = {
    userId: string,
    nickName: string,
    image: string
}
export type subscribeUserType = {
    subscribeResponseList: subscribeResponse[]
};
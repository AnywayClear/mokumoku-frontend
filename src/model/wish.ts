import { pageInfo } from "./page"

export type WishListType = {
    data: Wish[],
    pageInfo: pageInfo
}
  
export type Wish = {
    id: number,
    title: string,
    startPrice: number,
    image: string,
    sellerName: string,
    userId: string
}

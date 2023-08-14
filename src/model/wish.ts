export type WishListType = {
    data: Wish[],
    page:number,
    size: number,
    totalElements: number,
    totalPages: number
}
  
export type Wish = {
    id: number,
    title: string,
    startPrice: number,
    image: string,
    sellerName: string,
    userId: string
}

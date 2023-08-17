import { pageInfo } from "./page";

export type ProduceList = {
  // produceResponseList: Produce[];
  data: Produce[];
  pageInfo: pageInfo;
};

export type Produce = {
  id: number;
  name: string;
  seller: string;
  sellerId: string;
  description: string;
  image: string;
  startPrice: number;
  kg: number;
  ea: number;
  startDate: Date;
  endDate: Date;
  status: number;
  dibNum: number;
  auctionResponseList: Auction[];
  sellerImage: string;
};

export type PostProduce = {
  name: string;
  image: string;
  description: string;
  startPrice: number;
  kg: number;
  startDate: string;
  // endDate: string;
  ea: number;
};

export type Auction = {
  id: number;
  price: number;
  nickname: string;
  updatedAt: Date;
  status: number;
};

export type AuctionList = {
  auctionResponseList: Auction[];
};

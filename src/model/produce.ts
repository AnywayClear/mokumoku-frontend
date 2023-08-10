export type ProduceList = {
  produceResponseList: Produce[];
};

export type Produce = {
  id: number;
  name: string;
  seller: string;
  description: string;
  image: string;
  startPrice: number;
  kg: number;
  ea: number;
  startDate: Date;
  endDate: Date;
  status: number;
  dibNum: number;
  auctionResponseList: AuctionList[];
};

export type PostProduce = {
  name: string;
  image: string;
  description: string;
  startPrice: number;
  kg: number;
  startDate: string;
  endDate: string;
  ea: number;
};

export type AuctionList = {
  id: number;
  price: number;
};

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
  auctionResponseList: Array<{ id: number; price: number }>;
};

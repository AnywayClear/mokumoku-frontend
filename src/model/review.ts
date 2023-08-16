import { Deal } from "./deal";

export type Review = {
    id:number;
    comment: string;
    rate: number;
    img: string;
    title: string;
    unit: string;
    nickname: string;
    content: string;
    date: string;
};

export type ReviewList = {
    data: ReviewItem[];
    pageInfo: pageInfo;
}

export type ReviewItem = {
    comment: string;
    createdAt: string;
    deal: Deal;
    id: number;
    reviewerId: String;
    reviewerNickname:String
    score:number;
}

type pageInfo = {
    page:number;
    size:number;
    totalElements:number;
    totalPages:number;
}
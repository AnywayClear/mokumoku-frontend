import { Deal } from "./deal";
import { pageInfo } from "./page";

export type Review = {
    id:number;
    comment: string;
    score: number;
    image: string;
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
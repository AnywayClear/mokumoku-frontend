import { put } from "./http";

type Produce = {
    name: string;
    image: string;
    description: string;
    startPrice: number;
    kg: number;
    startDate: Date;
    endDate: Date;
    ea: number;
}

export const addProduces = async () => {
    await put("")
}
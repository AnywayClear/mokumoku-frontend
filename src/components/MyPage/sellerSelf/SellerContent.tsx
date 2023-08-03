"use client"
import {useState} from "react";
import SellerTab from "./SellerTap";
import SellerBox from "./SellerBox";

export default function SellerContent(){

    const [itemSelected, selectItem] = useState<number>(0);

    return(
        <div className="mx-36 mt-16">
            <SellerTab boxItemNum={itemSelected} setBoxItemNum={selectItem}></SellerTab>
            <SellerBox boxItemNum={itemSelected}></SellerBox>
        </div>
    );
}
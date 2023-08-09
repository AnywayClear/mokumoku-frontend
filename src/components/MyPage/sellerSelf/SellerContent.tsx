"use client"
import SellerTab from "./SellerTap";
import SellerBox from "./SellerBox";

export default function SellerContent(){

    return(
        <div className="mt-16">
            <SellerTab ></SellerTab>
            <SellerBox ></SellerBox>
        </div>
    );
}
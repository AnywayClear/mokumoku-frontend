"use client"
import {useState} from "react";
import CustomerTab from "./CustomerTap";
import CustomerBox from "./CustomerBox";

export default function CustomerContent(){

    const [itemSelected, selectItem] = useState<number>(0);

    return(
        <div className="mx-36 mt-16">
            <CustomerTab boxItemNum={itemSelected} setBoxItemNum={selectItem}></CustomerTab>
            
            <CustomerBox boxItemNum={itemSelected}></CustomerBox>

        </div>
    );
}
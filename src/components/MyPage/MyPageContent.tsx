"use client"
import {useState} from "react";
import MyPageTab from "./MyPageTap";
import MyPageBox from "./MyPageBox";

export default function MyPageContent(){

    const [itemSelected, selectItem] = useState<number>(0);

    return(
        <div className="mx-36 mt-16">
            <MyPageTab boxItemNum={itemSelected} setBoxItemNum={selectItem}></MyPageTab>
            
            <MyPageBox boxItemNum={itemSelected}></MyPageBox>

        </div>
    );
}
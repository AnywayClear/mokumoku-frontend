"use client"
import { useState } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';
import { useRecoilState, useResetRecoilState } from "recoil";
import { searchState, tapState } from "@/store/mypage";

const itemSelectedColor = {
    text:"text-black",
    circle:"text-green-600"
};

const itemNotSelectedColor = {
    text:"text-neutral-400",
    circle:"text-neutral-400"
}

const itemInfo = [
    { 
        id : 0,
        title : "경매 목록"
    },
    {
        id : 1,
        title : "경매 통계"
    },
    {
        id : 2,
        title : "리뷰 목록"
    },
];

export default function SelTab(){

    const [status, setStatus] = useRecoilState<number>(tapState);
    const [itemFocused, focusItem] = useState<number>(-1);
    const resetSearchTap = useResetRecoilState(searchState);

    function clickItem(clickedItem:number){
        setStatus(clickedItem);
    }
    

    return(
        <>
            <div className="flex ml-10 space-x-8 mb-7">
                {itemInfo.map((item)=>(
                    <div className="flex items-center space-x-2 cursor-pointer" 
                    key={`${item.id}`} 
                    onMouseOver={()=>focusItem(item.id)} 
                    onMouseLeave={()=>focusItem(-1)} 
                    onClick={()=>{
                        clickItem(item.id);
                        resetSearchTap();
                        }}>
                    <BsFillCircleFill className={item.id===status || item.id===itemFocused?itemSelectedColor.circle:itemNotSelectedColor.circle}/>
                        <p className={`font-bold text-3xl ${item.id===status || item.id===itemFocused?itemSelectedColor.text:itemNotSelectedColor.text}`}>{item.title}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
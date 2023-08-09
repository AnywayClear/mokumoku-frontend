"use client"
import { useState } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';
import { useRecoilState } from "recoil";
import { tapState } from "@/store/mypage";

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
        link : "#",
        title : "경매 목록"
    },
    {
        id : 1,
        link : "#",
        title : "경매 통계"
    },
    {
        id : 2,
        link : "#",
        title : "리뷰 목록"
    },
];

type Props={
    boxItemNum: number,
    setBoxItemNum: Function
}

export default function SelTab(){

    const [status, setStatus] = useRecoilState<number>(tapState);
    const [itemFocused, focusItem] = useState<number>(-1);

    function clickItem(clickedItem:number){
        setStatus(clickedItem);
    }
    

    return(
        <>
            <div className="flex ml-10 space-x-8 mb-7">

                {itemInfo.map((item,index)=>(
                    <a href={`${item.link}`}  key={`${item.id}`} onMouseOver={()=>focusItem(item.id)} onMouseLeave={()=>focusItem(-1)} onClick={()=>clickItem(item.id)}>
                        <div className="flex items-center space-x-2">
                        <BsFillCircleFill className={item.id===status || item.id===itemFocused?itemSelectedColor.circle:itemNotSelectedColor.circle}/>
                        <p className={`font-bold text-3xl ${item.id===status || item.id===itemFocused?itemSelectedColor.text:itemNotSelectedColor.text}`}>{item.title}</p>
                        </div>
                    </a>
                ))}

            </div>
        </>
    );
}
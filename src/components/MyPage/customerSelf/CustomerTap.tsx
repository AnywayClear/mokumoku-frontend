"use client"
import { tapState } from '@/store/mypage';
import { useState } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';

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
        title : "구매 목록"
    },
    {
        id : 1,
        link : "#",
        title : "찜 목록"
    },
    {
        id : 2,
        link : "#",
        title : "구독 목록"
    },
];

type Props={
    boxItemNum: number,
    setBoxItemNum: Function
}

export default function CustomerTab(){

    const [status, setStatus] = useRecoilState<number>(tapState);
    const [itemFocused, focusItem] = useState<number>(-1);


    function clickItem(clickedItem:number){
        setStatus(clickedItem);
    }
    

    return(
        <>
            <div className="flex ml-10 space-x-8 mb-4">
                {itemInfo.map((item,index)=>(
                    <div className="flex items-center space-x-2 cursor-pointer select-none" key={`${item.id}`} onMouseOver={()=>focusItem(item.id)} onMouseLeave={()=>focusItem(-1)} onClick={()=>clickItem(item.id)}>
                        <BsFillCircleFill className={item.id===status || item.id===itemFocused?itemSelectedColor.circle:itemNotSelectedColor.circle}/>
                        <p className={`font-bold text-3xl ${item.id===status || item.id===itemFocused?itemSelectedColor.text:itemNotSelectedColor.text}`}>{item.title}</p>
                    </div>       
                ))}
            </div>
        </>
    );
}
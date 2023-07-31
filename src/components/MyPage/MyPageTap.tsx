"use client"
import { useState } from 'react';
import { BsFillCircleFill } from 'react-icons/bs';

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

export default function MyPageTab({boxItemNum, setBoxItemNum}:Props){

    const [itemSelected,selectItem] = useState<number>(boxItemNum);
    const [itemFocused, focusItem] = useState<number>(boxItemNum);

    function clickItem(clickedItem:number){
        selectItem(clickedItem);
        focusItem(clickedItem);
        setBoxItemNum(clickedItem);
    }
    

    return(
        <>
            <div className="flex ml-10 space-x-8 mb-7">

                {itemInfo.map((item,index)=>(
                    <a href={`${item.link}`}  key={`${item.id}`} onMouseOver={()=>focusItem(item.id)} onMouseLeave={()=>focusItem(itemSelected)} onClick={()=>clickItem(item.id)}>
                        <div className="flex items-center space-x-2">
                        <BsFillCircleFill className={item.id===itemSelected || item.id===itemFocused?itemSelectedColor.circle:itemNotSelectedColor.circle}/>
                        <p className={`font-bold text-3xl ${item.id===itemSelected || item.id===itemFocused?itemSelectedColor.text:itemNotSelectedColor.text}`}>{item.title}</p>
                        </div>
                    </a>
                ))}

            </div>
        </>
    );
}
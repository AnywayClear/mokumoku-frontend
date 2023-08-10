"use client";
import * as React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import ReviewModal from './ReviewModal';
import SearchTab from '../searchTab';

type colType = { name:string , flex:string};
const cols : colType[]  = [
    {
        name : "상품이미지",
        flex : "w-2/12",
    },
    {
        name : "제목",
        flex : "w-6/12",
    },
    {
        name : "단위",
        flex : "w-1/12",
    },
    {
        name : "입찰가격",
        flex : "w-1/12",
    },
    {
        name : "낙찰일자",
        flex : "w-2/12",
    },
    {
        name : "배송상태",
        flex : "w-1/12",
    },
    {
        name : "후기작성",
        flex : "w-2/12",
    }
];

type rowType = {
    id:number,
    img:string,
    title:string,
    unit:string,
    price:number,
    date:string,
    deliv:string,
    review:boolean
};

type modalType = {
    id:number,
    title:string,
    img: string
    unit:string,
    price:number
}


export default function BoughtList() {
    
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState<modalType>({id:0, title:"", img:"", unit:"",price:0});
    const rows : rowType[] = [
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1689852484069-3e0fe82cc7c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
            title: "맛있는 감자입니다 저희는 무조건 맛있는 제품만 판매합니다eeeeeeeeeeeeeeeeeeeeeeeeeeee",
            unit : "1kg",
            price : 13000,
            date : "2023-07-28",
            deliv : "배송완료",
            review : true,        
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기",
            review : true,        
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기",
            review : false,        
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기",
            review : false,        
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기",
            review : false,        
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기",
            review : false,        
        },
        {
            id : 1,
            img : "https://images.unsplash.com/photo-1690375636915-29d19feae92f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1092&q=80",
            title : "싱싱 야채 세트 많아요",
            unit : "",
            price : 15000,
            date : "2023-07-28",
            deliv : "결제하기",
            review : false,        
        }
    ]



    function closeModal(){
        setShowModal(false);
    }
    function openModal(getModalInfo:rowType){
        let newModalInfo :modalType = {
            id:getModalInfo.id,
            title:getModalInfo.title,
            img:getModalInfo.img,
            unit:getModalInfo.unit,
            price:getModalInfo.price
        }
        setModalInfo(newModalInfo);
        setShowModal(true);
    }
    

    return (
        <div className='mb-20'>
            {showModal?<ReviewModal deadID={modalInfo.id} img={modalInfo.img} title={modalInfo.title} unit={modalInfo.unit} price={modalInfo.price} closeModal={closeModal} />:null}
            <SearchTab tabType={1}/>
            <div>
                <table className='table-fixed border-collapse border-y-2 w-full text-center border-neutral-300'>
                    <thead className='font-bold  text-xl'>
                        <tr className="border-y">
                            {cols.map((col, index) => (
                                    <td key={index} className={`${col.flex}` + " py-8"}>{col.name}</td>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row:rowType,index2)=>
                        (<tr key={index2} className="border-y text-lg">
                            <td>{row.img !== undefined ? <Image src={row.img} alt='상품이미지' width={300} height={300} className='h-32 w-80 object-cover' />:null}</td>
                            <td><a href="#"><p className='p-6 underline truncate hover:opacity-70'>{row.title}</p></a></td>
                            <td><p>{row.unit}</p></td>
                            <td><p>{row.price}</p></td>
                            <td><p>{row.date}</p></td>
                            <td><a href=''><u className='hover:opacity-70'>{row.deliv}</u></a></td>
                            <td>{row.review?<button className='rounded-md bg-black text-white py-1 px-2 hover:opacity-70' onClick={()=>{openModal(row)}}>후기작성</button>:<></>}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        </div>

    );
 }
"use client"

import { AuthContext } from "@/context/AuthContext";
import { tapState } from "@/store/mypage";
import Link from "next/link";
import { ReactNode, useContext } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { useRecoilState } from "recoil";

type buttonType = {
    icon:ReactNode,
    title:string,
    link:string
}
const buttonData:buttonType[] = [
    {
        icon: <FaCircleUser />, 
        title: '마이페이지', 
        link: '/login'
    },
    {
        icon: <FaCircleUser />, 
        title: '마이페이지', 
        link: '/mypage'
    },
]

export default function ToMyPageButton(){

    const {user} = useContext(AuthContext);
    const [status, setStatus] = useRecoilState<number>(tapState);
    
    return (
        <>
            {!user?.userId ? 
            //로그인 안 ㄷ
            ( <Link
              href={buttonData[0].link}
              className="flex items-center gap-2 text-sm"
            >
              {buttonData[0].icon}
              <p>{buttonData[0].title}</p>
            </Link> ) : 
            
              (<Link
                href={buttonData[1].link}
                className="flex items-center gap-2 text-sm"
                onClick={()=>{
                  setStatus(0);
                  console.log(status);
                }}
              >
                {buttonData[1].icon}
                <p>{buttonData[1].title}</p>
              </Link>)
            }
        </>
    );
}
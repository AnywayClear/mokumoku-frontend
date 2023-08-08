"use client"

import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { ReactNode, useContext } from "react";
import { FaCircleUser } from "react-icons/fa6";

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
        link: '/mypagec'
    },
    {
        icon: <FaCircleUser />, 
        title: '마이페이지', 
        link: '/mypages'
    },

    
]

export default function ToMyPageButton(){

    const {user} = useContext(AuthContext);

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
                (user?.role === 0 ? 
                    //구매자
                    (<Link
                      href={buttonData[1].link}
                      className="flex items-center gap-2 text-sm"
                    >
                      {buttonData[1].icon}
                      <p>{buttonData[1].title}</p>
                    </Link>):
                    //판매자
                    (<Link
                        href={buttonData[2].link}
                        className="flex items-center gap-2 text-sm"
                      >
                        {buttonData[2].icon}
                        <p>{buttonData[2].title}</p>
                      </Link>))
            }
        </>
    );
}
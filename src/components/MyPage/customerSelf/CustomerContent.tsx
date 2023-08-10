"use client"
import CustomerTab from "./CustomerTap";
import CustomerBox from "./CustomerBox";

export default function CustomerContent(){

    return(
        <div className="mt-16">
            <CustomerTab ></CustomerTab>
            <CustomerBox ></CustomerBox>
        </div>
    );
}
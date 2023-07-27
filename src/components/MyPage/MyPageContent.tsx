import MyPageTab from "./MyPageTap";
import MyPageBox from "./MyPageBox";

export default function MyPageContent(){
    return(
        <div className="mx-36 mt-16">
            <MyPageTab></MyPageTab>
            <MyPageBox></MyPageBox>
        </div>
    );
}
import BoughtList from "./customerSelf/MyPageBoughtList";
import SubscribeList from "./customerSelf/MyPageSubscribeList";

export default function MyPageBox(){


    return (
        <div className="border-y-4 border-neutral-500 my-4">
            {/* <BoughtList></BoughtList> */}
            <SubscribeList></SubscribeList>
        </div>
    );
}
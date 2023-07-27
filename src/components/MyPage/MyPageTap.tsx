import { BsFillCircleFill } from 'react-icons/bs';


export default function MyPageTab(){
    return(
        <>
            <div className="flex ml-10 space-x-8 mb-7">
                <a href="#">
                    <div className="flex items-center space-x-2">
                        <BsFillCircleFill className="text-green-600"/>
                        <p className="font-bold text-3xl text-black">항목1</p>
                    </div>
                </a>
                <a href="#">
                    <div className="flex items-center space-x-2">
                        <BsFillCircleFill className="text-neutral-400"/>
                        <p className="font-bold text-3xl text-neutral-400">항목2</p>
                    </div>
                </a>
                <a href="#">
                    <div className="flex items-center space-x-2">
                        <BsFillCircleFill className="text-neutral-400"/>
                        <p className="font-bold text-3xl text-neutral-400">항목3</p>
                    </div>
                </a>
            </div>
        </>
    );
}
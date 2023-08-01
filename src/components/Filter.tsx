import { AiOutlineCheckSquare, AiFillCheckSquare } from 'react-icons/ai';

export default function Filter() {
  return (
    <div className="w-44 border-t-4 border-t-black m-6">
      <div className="flex justify-between items-center mt-4 mb-10">
        <p className="font-bold text-xl">필터</p>
        <p className="text-gray-300 text-lg">초기화</p>
      </div>
      <div className="flex justify-between items-center my-4">
        <AiFillCheckSquare className="text-xl" />
        <p className="text-sm">경매 대기</p>
        <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
      </div>
      <div className="flex justify-between items-center my-4">
        <AiOutlineCheckSquare className="text-xl" />
        <p className="text-sm">경매중</p>
        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
      </div>
      <div className="flex justify-between items-center my-4">
        <AiOutlineCheckSquare className="text-xl" />
        <p className="text-sm">경매 종료</p>
        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
}

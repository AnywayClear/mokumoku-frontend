import Image from 'next/image';
import tempImage from '../../public/images/mokumokuLogo.svg';
import { FiHeart } from 'react-icons/fi';

type Props = {
  status: number;
};

export default function ProductCard({ status }: Props) {
  return (
    <div className="w-72 shadow-md m-4">
      <Image alt="temp" src={tempImage} />
      <div className="">
        <div className="flex justify-between items-center m-2 mb-0">
          <p className="font-bold underline decoration-solid">상호명</p>
          <div
            className={`w-4 h-4 rounded-full ${
              status === 0
                ? 'bg-yellow-400'
                : status === 1
                ? 'bg-green-500'
                : 'bg-red-500'
            }`}
          ></div>
        </div>
        <div className="flex justify-between m-2 mt-0">
          <p>종합 야채 세트</p>
          <p className="font-medium">5kg X 3</p>
        </div>

        {status === 0 ? (
          <div className="flex justify-between m-2">
            <p className="font-bold">50,000원</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between m-2 text-gray-300">
              <p className="font-bold">50,000원</p>
            </div>
            <div
              className={`flex justify-between m-2 ${
                status === 1 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              <p className="font-bold">57,000원</p>
            </div>
          </>
        )}

        <div className="flex justify-between m-2">
          <div className="flex gap-2 items-center">
            <FiHeart />
            <p className="text-sm">2,000</p>
          </div>
          <p className="text-sm">16 : 00</p>
        </div>
      </div>
    </div>
  );
}

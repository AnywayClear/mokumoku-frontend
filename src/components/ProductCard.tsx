import Image from 'next/image';
import tempImage from '../../public/images/mokumokuLogo.svg';
import { FiHeart } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { Produce } from '@/model/produce';

type Props = {
  produce: Produce;
};

export default function ProductCard({
  produce: {
    id,
    name,
    seller,
    description,
    image,
    startPrice,
    kg,
    ea,
    startDate,
    endDate,
    status,
    dibNum,
  },
}: Props) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLDivElement>, id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <div
      className="shadow-md m-4 w-64 cursor-pointer"
      onClick={(e) => handleClick(e, id)}
    >
      {/* <Image
        className="w-full"
        alt="temp"
        src={tempImage}
        // fill
        // width={300}
        // height={500}
      /> */}

      <div className="relative w-full aspect-square">
        <Image
          className="object-contain"
          src={image || tempImage}
          alt="temp"
          fill
          sizes="650px"
        />
      </div>

      <div className="">
        <div className="flex justify-between items-center m-2 mb-0">
          <p className="font-bold underline decoration-solid">{seller}</p>
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
          <p>{name}</p>
          <p className="font-medium">{`${kg}kg X ${ea}`}</p>
        </div>

        {status === 0 ? (
          <div className="flex justify-between m-2">
            <p className="font-bold">{`${startPrice}원`}</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between m-2 text-gray-300">
              <p className="font-bold">{`${startPrice}원`}</p>
            </div>
            <div
              className={`flex justify-between m-2 ${
                status === 1 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              <p className="font-bold">{`${startPrice}원`}</p>
            </div>
          </>
        )}

        <div className="flex justify-between m-2">
          <div className="flex gap-2 items-center">
            <FiHeart />
            <p className="text-sm">{dibNum}</p>
          </div>
          <p className="text-sm">{startDate.toString()}</p>
        </div>
      </div>
    </div>
  );
}

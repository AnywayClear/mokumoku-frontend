import { filterState } from '@/store/produce';
import { useRouter } from 'next/navigation';
import { useEffect, useState, MouseEvent } from 'react';
import { AiOutlineCheckSquare, AiFillCheckSquare } from 'react-icons/ai';
import { useRecoilState } from 'recoil';

export default function Filter() {
  const [status, setStatus] = useRecoilState<string>(filterState);
  const router = useRouter();

  const [filter, setFilter] = useState<boolean[]>([true, false, false]);
  const handleClick = (e: MouseEvent<HTMLDivElement>, index: number) => {
    setFilter((prev) => {
      const newFilter = structuredClone(prev);
      newFilter[index] = !prev[index];
      return newFilter;
    });
  };

  const handleClickReset = () => {
    setFilter([true, false, false]);
    router.push('/product');
  };

  useEffect(() => {
    const stat = filter
      .map((el, index) => (el ? index : ''))
      .filter((el) => el !== '')
      .join(',');
    setStatus(stat);
  }, [filter, setStatus]);

  return (
    <div className="basis-1/5">
      <div className="w-48 border-t-4 border-t-black m-6">
        <div className="flex justify-between items-center mt-4 mb-10">
          <p className="font-bold text-xl">필터</p>
          <p
            className="text-gray-300 text-lg cursor-pointer hover:text-black"
            onClick={handleClickReset}
          >
            초기화
          </p>
        </div>
        <div className="flex justify-between items-center my-4">
          <div onClick={(e) => handleClick(e, 0)}>
            {filter[0] ? (
              <AiFillCheckSquare className="text-xl" />
            ) : (
              <AiOutlineCheckSquare className="text-xl" />
            )}
          </div>
          <p className="text-sm">경매 대기</p>
          <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
        </div>
        <div className="flex justify-between items-center my-4">
          <div onClick={(e) => handleClick(e, 1)}>
            {filter[1] ? (
              <AiFillCheckSquare className="text-xl" />
            ) : (
              <AiOutlineCheckSquare className="text-xl" />
            )}
          </div>
          <p className="text-sm">경매중</p>
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex justify-between items-center my-4">
          <div onClick={(e) => handleClick(e, 2)}>
            {filter[2] ? (
              <AiFillCheckSquare className="text-xl" />
            ) : (
              <AiOutlineCheckSquare className="text-xl" />
            )}
          </div>
          <p className="text-sm">경매 종료</p>
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

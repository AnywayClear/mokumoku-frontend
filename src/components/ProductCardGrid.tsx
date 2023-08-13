import { UseQueryResult, useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';
import { get } from '@/service/api/http';
import { getProduceList } from '@/service/api/produce';
import { useRecoilState } from 'recoil';
import { filterState } from '@/store/produce';
import { ProduceList } from '@/model/produce';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

type Props = {
  status: string;
};

export default function ProductCardGrid() {
  const [status, setStatus] = useRecoilState<string>(filterState);
  const { user } = useContext(AuthContext);
  const { data: produceList }: UseQueryResult<ProduceList> = useQuery({
    queryKey: ['produceList', status],
    queryFn: () => getProduceList(status, user?.userId),
    enabled: !!user?.userId
  });

  return (
    // <div className="grid gap-24 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div className="flex gap-1 flex-wrap justify-center basis-4/5">
      {produceList?.data?.map((produce, index) => (
        <ProductCard key={index} produce={produce} />
      ))}
    </div>
  );
}

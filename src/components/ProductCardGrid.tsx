import { UseQueryResult, useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';
import { get } from '@/service/api/http';
import { getProduceList } from '@/service/api/produce';
import { useRecoilState } from 'recoil';
import { filterState } from '@/store/produce';
import { ProduceList } from '@/model/produce';

type Props = {
  status: string;
};

export default function ProductCardGrid() {
  const [status, setStatus] = useRecoilState<string>(filterState);
  const { data: produceList }: UseQueryResult<ProduceList> = useQuery({
    queryKey: ['produceList', status],
    queryFn: () => getProduceList(status),
  });

  return (
    // <div className="grid gap-24 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div className="flex gap-1 flex-wrap justify-center basis-4/5">
      {produceList?.produceResponseList?.map((produce, index) => (
        <ProductCard key={index} produce={produce} />
      ))}
    </div>
  );
}

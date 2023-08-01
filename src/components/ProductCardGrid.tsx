import { useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';
import { get } from '@/service/api/http';

const products = [
  {
    status: 0,
  },
  {
    status: 1,
  },
  {
    status: 2,
  },
];

type Props = {
  status: string;
};

type ProduceList = {
  produceResponseList: Produce[];
};

export type Produce = {
  name: string;
  description: string;
  image: string;
  startPrice: number;
  kg: number;
  ea: number;
  startDate: Date;
  endDate: Date;
  status: number;
  auctionResponseList: Array<{ id: number; price: number }>;
};

export default function ProductCardGrid({ status }: Props) {
  const { data: produceList }: { data: ProduceList | undefined } = useQuery({
    queryKey: ['produceList', status],
    queryFn: async () => {
      const url = `http://13.125.251.1:8080/api/produces?statusNoList=${status}`;
      const data = await get(url);
      return data;
    },
  });

  return (
    <div className='flex gap-6'>
      {produceList?.produceResponseList?.map((produce, index) => (
        <ProductCard key={index} produce={produce} />
      ))}
    </div>
  );
}

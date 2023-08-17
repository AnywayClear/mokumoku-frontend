import {
  UseQueryResult,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import ProductCard from './ProductCard';
import { getProduceList } from '@/service/api/produce';
import { useRecoilState } from 'recoil';
import { filterState } from '@/store/produce';
import { AuthContext } from '@/context/AuthContext';
import { useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';

type Props = {
  status: string;
};

export default function ProductCardGrid() {
  const [status, setStatus] = useRecoilState<string>(filterState);
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();

  const { user } = useContext(AuthContext);
  // const { data: produceList }: UseQueryResult<ProduceList> = useQuery({
  //   queryKey: ['produceList', status],
  //   queryFn: (data) => getProduceList(status, user?.userId),
  //   enabled: !!user?.userId,
  // });
  const {
    data: produceList,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['produceList', status],
    queryFn: ({ pageParam = 0 }) => {
      return getProduceList(status, pageParam, searchParams?.get('name') ?? '');
    },
    getNextPageParam: (lastPage) => lastPage?.nextPage || 0,
    enabled: !!user?.userId,
  });

  useEffect(() => {
    if (searchParams?.get('name')) {
      queryClient.setQueryData(['produceList', status], (data: any) => ({
        pages: data?.pages?.slice(0, 1) ?? [],
        pageParams: data?.pageParams?.slice(0, 1) ?? [],
      }));
    }
    refetch({ refetchPage: (page, index) => index === 0 });
  }, [searchParams, refetch, queryClient, status]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);
  return (
    <div>
      {produceList?.pages?.map((group, i) => (
        <div className="flex gap-1 flex-wrap justify-center basis-4/5" key={i}>
          {group?.data?.map((produce: any, index: any) => (
            <ProductCard key={index} produce={produce} />
          ))}
        </div>
      ))}
      <div className="flex justify-center">
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
        </button>
      </div>
      <div className="flex justify-center text-sm font-semibold leading-6 text-gray-900">
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
    </div>
  );
}

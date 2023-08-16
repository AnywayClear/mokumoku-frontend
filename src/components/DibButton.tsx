'use client';

import { del, get, post } from '@/service/api/http';
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';

type Props = {
  produceId: number;
};

export default function DibButton({ produceId }: Props) {
  const queryClient = useQueryClient();
  const { data: dibs }: UseQueryResult<{ dib: boolean }> = useQuery({
    queryKey: ['dib', produceId],
    queryFn: () => get(`/api/dibs/${produceId}/member`),
    enabled: !!produceId,
  });

  const mutation = useMutation({
    mutationFn: (data: { produceId: number }) => {
      if (dibs?.dib) {
        return del(`/api/dibs/${produceId}`);
      } else {
        return post(`/api/dibs/${produceId}/dib`);
      }
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['dib', variables.produceId] });
    },
  });

  const handleClick = () => {
    mutation.mutate({ produceId });
  };

  return (
    <div className="text-5xl cursor-pointer" onClick={handleClick}>
      {dibs?.dib ? <AiFillHeart /> : <AiOutlineHeart />}
    </div>
  );
}

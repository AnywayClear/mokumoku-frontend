import React from 'react';
import Image from 'next/image';
import { ImHeartBroken } from 'react-icons/im';
import { Produce } from '@/model/produce';
import { getProduce } from '@/service/api/produce';
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Wish } from '@/model/wish';
import Link from 'next/link';
import { dateToStringDot } from '@/service/myFunc';
import { cancelWishList } from '@/service/api/wish';

type Props = {
  wishItem: Wish;
};

export default function WishRow({ wishItem }: Props) {
  const queryClient = useQueryClient();

  const { data: produce }: UseQueryResult<Produce> = useQuery({
    queryKey: ['produce'],
    queryFn: () => getProduce(wishItem.id),
  });

  const cancel = useMutation(() => cancelWishList(wishItem.id), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishList'] });
    },
  });

  return (
    <>
      <tr className="border-y text-lg">
        <td>
          {wishItem?.image !== undefined ? (
            <Image
              src={wishItem?.image}
              alt="상품이미지"
              width={300}
              height={300}
              className="h-32 w-80 object-cover"
            />
          ) : null}
        </td>
        <td>
          <Link href={`/product/${wishItem.id}`}>
            <p className="px-6 underline truncate hover:opacity-70">
              {wishItem?.title}
            </p>
          </Link>
        </td>
        <td>
          <Link href={`otherpage/${wishItem?.userId}`}>
            <u className="hover:opacity-70">{wishItem?.sellerName}</u>
          </Link>
        </td>
        <td>
          <p>{produce?.ea}</p>
        </td>
        <td>
          <p>{produce ? dateToStringDot(produce.startDate) : null}</p>
        </td>
        <td>
          <p>{produce?.startPrice}</p>
        </td>
        <td>
          <a
            className="hover:opacity-30 p-6"
            href="#"
            onClick={() => cancel.mutate()}
          >
            <ImHeartBroken className="mx-auto" />
          </a>
        </td>
      </tr>
    </>
  );
}

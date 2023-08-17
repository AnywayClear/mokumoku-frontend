import { Popover } from '@mui/material';
import React, { useState, MouseEvent } from 'react';
import Image from 'next/image';
import ReviewPopover from './ReviewPopover';
import { Auction, Produce } from '@/model/produce';
import { dateToStringDot } from '@/service/myFunc';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Deal } from '@/model/deal';
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { Review } from '@/model/review';
import { getReview } from '@/service/api/review';
type Props = {
  produce: Produce;
  deal: Deal;
};

export default function SellerDealRow({ produce, deal }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const queryClient = useQueryClient();

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const { data: review }: UseQueryResult<Review> = useQuery({
    queryKey: [`review${deal?.dealId}`],
    queryFn: () => getReview(deal?.dealId || -1),
  });
  const open = Boolean(anchorEl);

  return (
    <tr className="border-y text-lg">
      <td>
        <Image
          src={
            produce.image
              ? produce.image
              : 'https://images.unsplash.com/photo-1690149347325-13435f400dd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80'
          }
          alt="상품이미지"
          width={300}
          height={300}
          className="h-32 w-80 object-cover"
        />
      </td>
      <td>
        <Link href={`/product/${produce.id}`}>
          <p className="p-6 underline truncate hover:opacity-70">
            {produce.name}
          </p>
        </Link>
      </td>
      <td>
        <p>{produce.kg}</p>
      </td>
      <td>
        <p>{deal?.endPrice}</p>
      </td>
      <td>
        <p>{deal ? dateToStringDot(deal.produce.endDate) : null}</p>
      </td>
      <td>
        <p>결제완료</p>
      </td>
      <td>
        {deal?.reviewed ? (
          <button
            className="rounded-md bg-black text-white py-1 px-2 hover:opacity-70"
            aria-owns={open ? `mouse-over-popover` : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
          >
            후기확인
          </button>
        ) : (
          <></>
        )}
      </td>
      <Popover
        id={`mouse-over-popover${deal?.dealId}`}
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        disableScrollLock={true}
      >
        <ReviewPopover id={deal?.dealId} review={review} />
      </Popover>
    </tr>
  );
}

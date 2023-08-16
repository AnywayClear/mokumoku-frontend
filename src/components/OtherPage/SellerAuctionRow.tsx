import { Popover } from '@mui/material';
import React, { useState, MouseEvent } from 'react';
import Image from 'next/image';
import ReviewPopover from './ReviewPopover';
import { Auction, Produce } from '@/model/produce';
import { dateToStringDot } from '@/myFunc';
type Props = {
  produce: Produce;
  auction: Auction;
};

const auctionStateArr = ['경매전', '경매중', '경매완료'];

export default function SellerAuctionRow({ produce, auction }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

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
        <a href="#">
          <p className="p-6 underline truncate hover:opacity-70">
            {produce.name}
          </p>
        </a>
      </td>
      <td>
        <p>{produce.kg}</p>
      </td>
      <td>
        <p>{auction.price}</p>
      </td>
      <td>
        <p>{dateToStringDot(auction.updatedAt)}</p>
      </td>
      <td>
        <p>{auctionStateArr[produce.status]}</p>
      </td>
      <td>
        {auction.status ? (
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
        id={`mouse-over-popover`}
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
        <ReviewPopover id={auction.id} />
      </Popover>
    </tr>
  );
}

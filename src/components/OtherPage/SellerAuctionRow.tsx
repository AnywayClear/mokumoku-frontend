import { Popover } from '@mui/material';
import React, { useState, MouseEvent } from 'react';
import Image from 'next/image';
import ReviewPopover from './ReviewPopover';

type Props={
    row:rowType;
}
type rowType = {
    id:number,
    img?:string,
    title:string,
    unit:string,
    price:number,
    date:string,
    state:number,
    review:boolean
};

const auctionStateArr = ["경매전","경매중","경매완료"]

export default function SellerAuctionRow({row}:Props) {

    const [anchorEl, setAnchorEl] = useState<HTMLElement|null>(null);

    const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);

  return (
    (<tr className="border-y text-lg">
            <td>{row.img !== undefined ? 
            <Image src={row.img} alt='상품이미지' width={300} height={300} className='h-32 w-80 object-cover' />:null}</td>
            <td><a href="#"><p className='p-6 underline truncate hover:opacity-70'>{row.title}</p></a></td>
            <td><p>{row.unit}</p></td>
            <td><p>{row.price}</p></td>
            <td><p>{row.date}</p></td>
            <td><p>{auctionStateArr[row.state]}</p></td>
            <td>{row.review?
                <button 
                    className='rounded-md bg-black text-white py-1 px-2 hover:opacity-70'
                    aria-owns={open ? `mouse-over-popover` : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    >후기확인</button>:
                <></>}
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
                disableScrollLock={ true }
          >
              <ReviewPopover id={row.id} />
            </Popover>
        </tr>)
  )
}

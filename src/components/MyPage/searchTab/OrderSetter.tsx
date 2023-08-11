import { searchType } from '@/model/mypage';
import { searchState } from '@/store/mypage';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';

const orderStateArr: string[] = ['시간순', '이름순', '가격순'];

export default function OrderSetter() {
  const [{ orderBy }, setStatus] = useRecoilState<searchType>(searchState);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus((current) => ({ ...current, orderBy: event.target.value }));
  };

  return (
    <>
      <FormControl size="small" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-select-small-label">정렬기준</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={orderBy}
          label="정렬기준"
          onChange={handleChange}
          inputProps={{ MenuProps: { disableScrollLock: true } }}
        >
          {orderStateArr.map((orderStateArrItem, index) => (
            <MenuItem value={index} key={index}>
              {orderStateArrItem}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

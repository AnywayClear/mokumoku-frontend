import { searchType } from '@/model/mypage';
import { searchState } from '@/store/mypage';
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function NameSetter() {
  const [{ title }, setStatus] = useRecoilState<searchType>(searchState);
  const [titleText, setTitleText] = useState<string>('');

  return (
    <>
      <TextField
        label="물품이름 검색"
        size="small"
        className="w-52 ml-2 mr-1"
        value={titleText}
        onChange={(event) => setTitleText(event.target.value)}
      />
      <button
        className="hover:opacity-70 bg-white text-neutral-800 text-lg font-semibold rounded-md px-4 p-[0.28rem] border-2 border-neutral-300"
        onClick={() => {
          setStatus((current) => ({ ...current, title: titleText }));
        }}
      >
        검색
      </button>
    </>
  );
}

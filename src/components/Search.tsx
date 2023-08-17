'use client';

import styled from '@emotion/styled';
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Searc = styled.form`
  color: black;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: 1;
  color: black;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid black;
`;

const Svg = styled(motion.svg)`
  z-index: 2;
`;

interface IForm {
  keyword: string;
}

export default function Search() {
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const { register, handleSubmit, reset } = useForm<IForm>();
  const router = useRouter();

  const onValid = (data: IForm) => {
    reset();
    setSearchOpen((prev) => !prev);
    router.push(`/product?name=${data.keyword}`);
  };
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
    }
    setSearchOpen((prev) => !prev);
  };
  return (
    <Col>
      <Searc onSubmit={handleSubmit(onValid)}>
        <Svg
          onClick={toggleSearch}
          animate={{ x: searchOpen ? -185 : 0 }}
          transition={{ type: 'linear' }}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/motion.svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </Svg>
        <Input
          {...register('keyword', { required: true, minLength: 2 })}
          transition={{ type: 'linear' }}
          animate={inputAnimation}
          initial={{ scaleX: 0 }}
          placeholder="Search for Produce..."
        />
      </Searc>
    </Col>
  );
}

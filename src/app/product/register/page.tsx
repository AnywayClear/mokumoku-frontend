'use client';

import ProductForm from '@/components/ProductForm';
import React, { useState } from 'react';
import AWS from 'aws-sdk';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';

export default function ProductRegisterPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc]: any = useState(null);

  const mutation = useMutation({});

  // 파일 업로드
  const onUpload = (e: any) => {
    const file = e.target.files[0];
    // const fileExt = file.name.split('.').pop();

    // 확장자 제한
    // if (!['jpeg', 'png', 'jpg', 'JPG', 'PNG', 'JPEG'].includes(fileExt)) {
    //   alert('jpg, png, jpg 파일만 업로드가 가능합니다.');
    //   return;
    // }

    // 파일 리더
    const reader = new FileReader();
    reader.readAsDataURL(file);

    // 파일 업로드
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        // 이미지 경로 선언
        setImageSrc(reader.result || null);
        // 이미지 파일 선언
        setImageFile(file);
        resolve();
      };
    });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center border-b-4 border-b-black w-4/12 pb-4 mb-8">
          물품 등록
        </h2>
        <ProductForm />
        {/* <div>hihihi</div>
        <div>
          <input
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => onUpload(e)}
          />

          <button
            type="button"
            onClick={() => {
              // if (!imageSrc) {
              //   alert('이미지를 등록해 주세요.');
              //   return;
              // }

              // const formData = new FormData();
              // formData.append('file', imageFile);
              // formData.append('name', imageFile.name);

              uploadS3(imageFile);
            }}
          >
            업로드!
          </button>
        </div>
        <Image
          alt="s3"
          src="https://mokumoku-image.s3.ap-northeast-2.amazonaws.com/upload/%EC%BA%A1%EC%B2%98.PNG"
        /> */}
      </div>
    </>
  );
}

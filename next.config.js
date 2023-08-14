/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'mokumoku-image.s3.ap-northeast-2.amazonaws.com',
      's3.ap-northeast-2.amazonaws.com',
      'k.kakaocdn.net',
      'i.ibb.co',
    ],
  },
};

module.exports = nextConfig;

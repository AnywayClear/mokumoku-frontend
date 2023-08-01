'use client';

import Filter from '@/components/Filter';
import ProductCard from '@/components/ProductCard';
import ProductCardGrid from '@/components/ProductCardGrid';
import { useState } from 'react';

export default function ProductPage() {
  const [status, setStatus] = useState<string>('0,1,2');
  return (
    <div>
      <ProductCardGrid status={status} />
      <Filter />
    </div>
  );
}

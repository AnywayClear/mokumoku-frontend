'use client';

import Filter from '@/components/Filter';
import ProductCard from '@/components/ProductCard';
import ProductCardGrid from '@/components/ProductCardGrid';

export default function ProductPage() {
  return (
    <div className="flex">
      <Filter />
      <ProductCardGrid />
    </div>
  );
}

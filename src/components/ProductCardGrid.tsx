import ProductCard from './ProductCard';

const products = [
  {
    status: 0,
  },
  {
    status: 1,
  },
  {
    status: 2,
  },
];

export default function ProductCardGrid() {
  return (
    <>
      {products.map(({ status }, index) => (
        <ProductCard key="index" status={status} />
      ))}
    </>
  );
}

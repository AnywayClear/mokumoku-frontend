import ProductForm from '@/components/ProductForm';

export default function ProductRegisterPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center border-b-4 border-b-black w-4/12 pb-4 mb-8">
          물품 등록
        </h2>
        <ProductForm />
      </div>
    </>
  );
}

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 border-t-[1px] border-gray-300 py-4">
      <div className="flex gap-2 items-center">
        <p className="text-base font-bold">MokuMoku 고객센터</p>
        <p className="text-sm font-bold text-green-500">010.1234.5678</p>
      </div>
      <div className="text-xs leading-6">
        <p>상호명 : 모꾸모꾸 | 소재지 : 서울특별시 강남구 테헤란로 212 802호</p>
        <p>소재지 : 서울특별시 강남구 테헤란로 212 802호</p>
      </div>
      <div className="flex text-xs gap-8">
        <p>개인정보처리방침</p>
        <p>이용약관</p>
      </div>
    </footer>
  );
}

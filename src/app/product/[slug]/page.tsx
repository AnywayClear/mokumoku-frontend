import Image from 'next/image';
import LogoImage from '../../../../public/images/mokumokuLogo.svg';

export default function page() {
  return (
    <>
      <section className="flex w-full">
        <div className="">
          <Image alt="logo" src={LogoImage} />
        </div>

        <div>
          <div className="py-4 border-t-4 border-b-2 border-t-black border-b-gray-200">
            <div className="flex my-2">
              <Image alt="logo" width={100} height={100} src={LogoImage} />
              <p className="font-bold">하니팜 스토어</p>
            </div>

            <div className="w-full">
              <p className="text-xl font-bold">종합 야채 세트 10kg</p>
              <div className="flex justify-between my-4 font-medium">
                <div className="flex gap-6">
                  <p>시작 가격</p>
                  <p>50,000원</p>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col items-end gap-4">
                    <p>수량</p>
                    <p>물품당 무게</p>
                  </div>
                  <div className="flex flex-col items-end gap-4">
                    <p>3</p>
                    <p>10kg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="font-bold my-6">배송정보</p>

            <div className="flex text-sm gap-4">
              <p className="w-20">배송비</p>
              <p className="leading-loose">
                해당 스토어 제품으로만 10000원 이상 구매시 무료배송 (미만시
                배송비 3000원 발생) <br /> 제주도를 포함한 도서/산간지역은
                추가배송비 3000원
              </p>
            </div>
            <div className="flex text-sm gap-4 my-6">
              <p className="w-20">배송예정</p>
              <p>1일 이내 출고(주말, 공휴일 제외)</p>
            </div>
          </div>

          <input
            type="button"
            value="진행중       |       2023.07.23 16:00"
            className="bg-green-500  border-2 border-black rounded-md py-2 px-10"
          />
          <input
            type="button"
            value="경매 종료       |       2023.07.23 16:00"
            className="bg-red-500  border-2 border-black rounded-md py-2 px-10"
          />
          <input
            type="button"
            value="경매 대기       |       2023.07.23 16:00"
            className="bg-yellow-300  border-2 border-black rounded-md py-2 px-10"
          />
        </div>
      </section>
      <section>
        <p>경매 목록</p>
        <table>
            <thead>
                <tr>
                   <th>남은 시간</th> 
                   <th>현재 입찰자</th> 
                   <th>현재 입찰가</th> 
                   <th>다음 입찰가</th> 
                   <th>입찰하기</th> 
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>23123</td>
                </tr>
            </tbody>
        </table>
      </section>
      <section>
        <p>상품 설명</p>
        <textarea>상품 설명</textarea>
      </section>
    </>
  );
}

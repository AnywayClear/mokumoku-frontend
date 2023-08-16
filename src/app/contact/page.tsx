import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center border-b-4 border-b-black w-4/12 pb-4 mb-8">
        고객센터
      </h2>
      <h2 className="text-xl font-bold my-3">문의사항을 보내주세요</h2>
      <ContactForm />
    </section>
  );
}

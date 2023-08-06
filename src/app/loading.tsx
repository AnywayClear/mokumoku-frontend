import { CSSProperties } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
};

export default function Loading() {
  return (
    <div className="flex h-[60vh] justify-center items-center">
      <div>
        <CircleLoader size={100} color="#36d7b7" cssOverride={override} />
      </div>
    </div>
  );
}

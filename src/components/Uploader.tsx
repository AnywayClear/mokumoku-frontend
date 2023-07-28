import { useEffect, useState, ChangeEvent } from 'react';
import './uploader.css';
import { Button } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';

const Uploader = () => {
  const [image, setImage] = useState({
    image_file: '' as File | string,
    preview_URL: '/images/user.png',
  });

  let inputRef: HTMLInputElement | null;

  const saveImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setImage({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      });
    }
  };

  useEffect(() => {
    // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
    return () => {
      URL.revokeObjectURL(image.preview_URL);
    };
  }, []);

  const sendImageToServer = async () => {
    if (image.image_file) {
      const formData = new FormData();
      formData.append('file', image.image_file);
      await axios.post('/api/image/upload', formData);
      alert('서버에 등록이 완료되었습니다!');
      setImage({
        image_file: '',
        preview_URL: '/images/user.png',
      });
    } else {
      alert('사진을 등록하세요!');
    }
  };

  return (
    <div className="uploader-wrapper">
      <input
        type="file"
        accept="image/*"
        onChange={saveImage}
        // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
        onClick={(e: React.MouseEvent<HTMLInputElement>) =>
          (e.currentTarget.value = '')
        }
        ref={(refParam) => (inputRef = refParam)}
        style={{ display: 'none' }}
      />
      <div className="img-wrapper">
        <Image
          alt={image.preview_URL}
          src={image.preview_URL}
          width={120}
          height={120}
        />
      </div>

      <div className="upload-button">
        <button onClick={() => inputRef?.click()}>프로필 설정하기</button>
        {/* <Button color="success" variant="contained" onClick={sendImageToServer}>
          Upload
      </Button>*/}
      </div>
    </div>
  );
};

export default Uploader;

'use client';
import Button from '@/components/Button';
import { useState, useEffect } from 'react';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';

export default function ConsumerRegister() {
  const [inputAddress, setInputAddressValue] = useState('');
  const [inputZipCodeValue, setInputZipCodeValue] = useState('');
  const [modalState, setModalState] = useState(false);
  const [image, setImage] = useState({
    image_file: '',
    preview_URL: 'img/default_image.png',
  });

  const Uploader = () => {
    const [image, setImage] = useState({
      image_file: '',
      preview_URL: 'img/default_image.png',
    });
  };

  const saveImage = (e: any) => {
    e.preventDefault();
    if (e.target.files[0]) {
      // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
      URL.revokeObjectURL(image.preview_URL);
      const preview_URL = URL.createObjectURL(e.target.files[0]);
      setImage(() => ({
        image_file: e.target.files[0],
        preview_URL: preview_URL,
      }));
    }
  };

  const deleteImage = () => {
    // createObjectURL()을 통해 생성한 기존 URL을 폐기
    URL.revokeObjectURL(image.preview_URL);
    setImage({
      image_file: '',
      preview_URL: 'img/default_image.png',
    });
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
        preview_URL: 'img/default_image.png',
      });
    } else {
      alert('사진을 등록하세요!');
    }
  };

  const modalToggle = () => {
    setModalState(!modalState);
  };
  const postCodeStyle = {
    width: '400px',
    height: '400px',
    display: modalState ? 'block' : 'none',
  }; // 스타일 정의 code

  const onCompletePost = (data: any) => {
    setInputAddressValue(data.address);
    setInputZipCodeValue(data.zonecode);
  }; // onCompletePost 함수

  return (
    <div>
      <h1>회원정보등록</h1>
      <button
        type="file"
        accept="image/*"
        onChange={saveImage}
        // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
        onClick={(e) => (e.target.value = null)}
        style={{ display: 'none' }}
      ></button>
      <div className="img-wrapper">
        <img src={image.preview_URL} />
      </div>

      <div className="upload-button">
        <button>Preview</button>
        <button color="error" onClick={deleteImage}>
          Delete
        </button>
        <button color="success" onClick={sendImageToServer}>
          Upload
        </button>
      </div>

      <input placeholder="닉네임"></input>
      <input placeholder="배송지 검색"></input>
      <Button onClick={modalToggle}>주소찾기</Button>
      <DaumPostcode
        style={postCodeStyle}
        onComplete={onCompletePost}
      ></DaumPostcode>
      <input
        value={inputZipCodeValue}
        placeholder="우편번호"
        type={'text'}
      ></input>
      <input value={inputAddress} placeholder="주소"></input>
      <input placeholder="상세주소를 입력해주세요"></input>
    </div>
  );
}

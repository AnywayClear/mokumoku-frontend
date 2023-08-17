import { Alarm } from "@/model/alarm";


export const getAlarmMessage = ({type, senderId, senderName} : Alarm) => {
    const data = {
        message: "",
        link: "",
    }

    // 시간 차이?
    switch (type) {
        case 0:
            data.message = `찜해둔 농산물의 경매가 시작되었습니다.`
            data.link = `/produce/${senderId}`;
            break;
        case 1:
            data.message = `구독한 판매자의 경매가 시작되었습니다.`;
            data.link = `/otherpage/${senderId}`;
            break;
        case 2:
            data.message = `${senderId}님이 ${senderName}을 낙찰받으셨습니다.`;
            break;
    }

    return data;
}
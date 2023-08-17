'use client';

import { getConfig, post } from '@/service/api/http';
import { useEffect, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { toast } from 'react-toastify';
import { getAlarmMessage } from '@/service/alarm';
import { Alarm } from '@/model/alarm';
import { useRouter } from 'next/navigation';

export default function SSE() {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState({ value: 0, target: 100 });
  const router = useRouter();

  useEffect(() => {
    //     let eventSource: EventSource | undefined = undefined;
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/subscribe`,
      {
        headers: {
          Authorization:
            localStorage && localStorage.getItem('accessToken')
              ? `Bearer ${localStorage.getItem('accessToken')}`
              : '',
        },
        withCredentials: true,
      },
    );

    const CloseButton = ({ closeToast }: any, link: string) => (
      <i
        className="material-icons"
        onClick={() => {
          closeToast();
          if (link) router.push(link);
        }}
      >
        이동
      </i>
    );

    eventSource.addEventListener('sse', function (event: any) {
      console.log(event.data);

      const data: Alarm = JSON.parse(event.data);
      // const data = event.data;
      // console.log(event);

      if (event.type !== 'connection') {
        const messageData = getAlarmMessage(data);
        toast.info(messageData.message, {
          autoClose: false,
          closeButton: (data) => CloseButton(data, messageData.link),
        });
      }
      // (async () => {
      //   // 브라우저 알림
      //   const showNotification = () => {
      //     const notification = new Notification('코드 봐줘', {
      //       body: data.content,
      //     });

      //     setTimeout(() => {
      //       notification.close();
      //     }, 10 * 1000);

      //     notification.addEventListener('click', () => {
      //       window.open(data.url, '_blank');
      //     });
      //   };

      //   // 브라우저 알림 허용 권한
      //   let granted = false;

      //   if (Notification.permission === 'granted') {
      //     granted = true;
      //   } else if (Notification.permission !== 'denied') {
      //     let permission = await Notification.requestPermission();
      //     granted = permission === 'granted';
      //   }

      //   // 알림 보여주기
      //   if (granted) {
      //     showNotification();
      //   }
      // })();
    });
  }, []);

  return <></>;
}

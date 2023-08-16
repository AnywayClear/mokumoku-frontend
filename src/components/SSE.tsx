'use client';

import { getConfig, post } from '@/service/api/http';
import { useEffect, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { toast } from 'react-toastify';

export default function SSE() {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState({ value: 0, target: 100 });

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

    eventSource.addEventListener('sse', function (event: any) {
      console.log(event.data);

      // const data = JSON.parse(event.data);
      const data = event.data;
      console.log(event);

      if (event.type !== 'connection') {
        toast.info(data, {
          autoClose: false,
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

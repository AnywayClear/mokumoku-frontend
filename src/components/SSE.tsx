'use client';

import { getConfig, post } from '@/service/api/http';
import { useEffect, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

export default function SSE() {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState({ value: 0, target: 100 });

  //   useEffect(() => {
  //     let eventSource: EventSource | undefined = undefined;
  //     const EventSource = EventSourcePolyfill || NativeEventSource;

  //     if (!listening) {
  //       // eventSource = new EventSource(`http://localhost:8080/time`);
  //       eventSource = new EventSource(
  //         `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/subscribe`,
  //         {
  //           headers: {
  //             Authorization:
  //               localStorage && localStorage.getItem('accessToken')
  //                 ? `Bearer ${localStorage.getItem('accessToken')}`
  //                 : '',
  //           },
  //           withCredentials: true,
  //         },
  //       );
  //         // eventSource = new EventSource(
  //         //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/alarms`,
  //         //   {
  //         //     headers: {
  //         //       Authorization:
  //         //         localStorage && localStorage.getItem('accessToken')
  //         //           ? `Bearer ${localStorage.getItem('accessToken')}`
  //         //           : '',
  //         //     },
  //         //     withCredentials: true,
  //         //   },
  //         // );

  //       eventSource?.addEventListener('Progress', (e) => {
  //         const result = JSON.parse(e.data);
  //         console.log('received:', result);
  //         // setData(result);
  //       });

  //       if (eventSource) {
  //         eventSource.onmessage = (event) => {
  //           console.log('result', event.data);
  //           // setData(old => [...old, event.data])
  //         };

  //         eventSource.onerror = (e) => {
  //           const event = e.target as EventSource;
  //           if (event.readyState === EventSource.CLOSED) {
  //             console.log('SSE closed (' + event.readyState + ')');
  //           }
  //           event.close();
  //         };

  //         eventSource.onopen = (e) => {
  //           console.log('connection opened');
  //         };
  //       }

  //       setListening(true);
  //     }

  //     return () => {
  //       eventSource?.close();
  //       console.log('event closed');
  //     };
  //   }, []);

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

    eventSource.addEventListener('sse', function (event:any) {
      console.log(event.data);

      const data = JSON.parse(event.data);

      (async () => {
        // 브라우저 알림
        const showNotification = () => {
          const notification = new Notification('코드 봐줘', {
            body: data.content,
          });

          setTimeout(() => {
            notification.close();
          }, 10 * 1000);

          notification.addEventListener('click', () => {
            window.open(data.url, '_blank');
          });
        };

        // 브라우저 알림 허용 권한
        let granted = false;

        if (Notification.permission === 'granted') {
          granted = true;
        } else if (Notification.permission !== 'denied') {
          let permission = await Notification.requestPermission();
          granted = permission === 'granted';
        }

        // 알림 보여주기
        if (granted) {
          showNotification();
        }
      })();
    });
  }, []);

  return (
    <div>
      SSE
      <button
        onClick={() => {
          post('/api/notifications/send-data');
        }}
      >
        신호
      </button>
    </div>
  );
}

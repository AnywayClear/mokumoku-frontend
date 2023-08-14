'use client';

import { getConfig, post } from '@/service/api/http';
import { useEffect, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

export default function SSE() {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState({ value: 0, target: 100 });

  useEffect(() => {
    let eventSource: EventSource | undefined = undefined;
    const EventSource = EventSourcePolyfill || NativeEventSource;

    if (!listening) {
      // eventSource = new EventSource(`http://localhost:8080/time`);
    //   eventSource = new EventSource(
    //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notifications/subscribe`,
    //     {
    //       headers: {
    //         Authorization:
    //           localStorage && localStorage.getItem('accessToken')
    //             ? `Bearer ${localStorage.getItem('accessToken')}`
    //             : '',
    //       },
    //       withCredentials: true,
    //     },
    //   );
        eventSource = new EventSource(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/alarms`,
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

      eventSource?.addEventListener('Progress', (e) => {
        const result = JSON.parse(e.data);
        console.log('received:', result);
        // setData(result);
      });

      if (eventSource) {
        eventSource.onmessage = (event) => {
          console.log('result', event.data);
          // setData(old => [...old, event.data])
        };

        eventSource.onerror = (e) => {
          const event = e.target as EventSource;
          if (event.readyState === EventSource.CLOSED) {
            console.log('SSE closed (' + event.readyState + ')');
          }
          event.close();
        };

        eventSource.onopen = (e) => {
          console.log('connection opened');
        };
      }

      setListening(true);
    }

    return () => {
      eventSource?.close();
      console.log('event closed');
    };
  }, []);

  return (
    <div>
      SSE
      <button
        onClick={async () => {
          const res = await post('/api/notifications/send-data');
          console.log(res);
        }}
      >
        신호
      </button>
    </div>
  );
}

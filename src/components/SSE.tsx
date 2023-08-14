'use client';

import { useEffect, useState } from 'react';

export default function SSE() {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState({ value: 0, target: 100 });

  useEffect(() => {
    let eventSource: EventSource | undefined = undefined;
    if (!listening) {
      eventSource = new EventSource(`${process.env.NEXT_PUBLIC_BACKEND_URL}/alarms/topic//subscribe`);
        
      eventSource.addEventListener('Progress', (e) => {
        const result = JSON.parse(e.data);
        console.log('received:', result);
        // setData(result);
      });

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

      setListening(true);
    }

    return () => {
      eventSource?.close();
      console.log("event losed")
    };
  }, [listening]);

  return <div>SSE</div>;
}

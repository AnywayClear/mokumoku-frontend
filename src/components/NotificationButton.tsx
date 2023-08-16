'use client';

import { AuthContext } from '@/context/AuthContext';
import { Alarm, Message } from '@/model/alarm';
import { getAlarmMessage } from '@/service/alarm';
import { get } from '@/service/api/http';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useContext, useState } from 'react';

// type : 0 - 농산물, 1 - 판매자, 2 - 낙찰

export default function NotificationButton() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const { data: produce }: UseQueryResult<Message[]> = useQuery({
    queryKey: ['alarm'],
    queryFn: async () => {
      const res: any = await get('/api/notifications/list');
      return res.map((el: Alarm) => getAlarmMessage(el));
    },
    enabled: !!user?.userId,
  });

  // const messageData = getAlarmMessage(data);
  //       toast.info(messageData.message, {
  //         autoClose: false,
  //       });

  return (
    <div className="flex justify-center">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="relative z-10 block rounded-md bg-white p-2 focus:outline-none"
        >
          <svg
            className="h-5 w-5 text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        </button>

        {dropdownOpen && (
          <div
            onClick={toggleDropdown}
            className="fixed inset-0 h-full w-full z-10"
          ></div>
        )}

        {dropdownOpen && (
          <div
            className="absolute right-0 mt-2 bg-white rounded-md shadow-lg overflow-hidden z-20"
            style={{ width: '20rem' }}
          >
            {!!produce?.length ? (
              produce?.map((el, index) => (
                <Link
                  key={index}
                  href={el.link}
                  className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2"
                >
                  <div>
                    <p className="text-gray-600 text-sm mx-2">{el.message}</p>
                    <p className="text-gray-600 text-sm mx-2">2m</p>
                  </div>
                </Link>
              ))
            ) : (
              <div className='py-6'>
                <p className="text-gray-600 text-sm mx-2">알림이 없습니다.</p>
              </div>
            )}

            {/* <a
              href="#"
              className="block bg-gray-800 text-white text-center font-bold py-2"
            >
              See all notifications
            </a> */}
          </div>
        )}
      </div>
    </div>
  );
}

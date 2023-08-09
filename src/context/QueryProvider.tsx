'use client';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function QueryProvider({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // suspense: true,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (typeof error === Error) {

            }
            console.log(error.response);
            // console.log(query);
            // const err: Error = new Error(error);
            // if (Object.keys(error).length !== 0) {
            //   if (error?.response?.data.httpStatus === 'UNAUTHORIZED') {
            //     toast.error(error?.response?.data.message);
            //     localStorage.removeItem('accessToken');
            //     redirect('/');
            //   }
            // }
            // console.log(error.response);
          },
        }),
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

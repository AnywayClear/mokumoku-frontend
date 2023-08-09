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
            staleTime: 1000 * 20,
          },
        },
        queryCache: new QueryCache({
          onError: (error, query) => {
            if (error instanceof CustomError) {
              if (error?.response?.data.httpStatus === 'UNAUTHORIZED') {
                toast.error(error?.response?.data.message);
                localStorage.removeItem('accessToken');
                redirect('/');
              }
            }
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
class CustomError extends Error {
  response?: {
    data: {
      httpStatus: string;
      message: string;
    };
  };
}

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
// Why is the function wrapped in an arrow function (() => {...})?
// This is to take advantage of the lazy initialization feature of useState. Without lazy initialization, the QueryClient would be created during every render, which is unnecessary and inefficient. Wrapping the creation logic in a function delays its execution until the first render when useState actually initializes the state.
const Providers = ({ children }) => {
  const [queryClient] = useState(
    () =>
      // QueryClient is a class, and new is required to create an instance.
      // An instance of QueryClient is necessary to manage caching, queries, and states.
       new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position='top-center' />
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from './components/Header';
import { PageContent } from './components/PageContent';
import { AppWrapper } from './App.styled.js';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <Header />
        <PageContent />
      </AppWrapper>
    </QueryClientProvider>
  );
};

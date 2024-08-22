import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={new QueryClient}>
    <App />
  </QueryClientProvider>,
);

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';

// Custom test wrapper with QueryClientProvider
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries to avoid errors during testing
      },
    },
  });

export const renderWithQueryClient = async (ui: Promise<React.ReactElement>) => {
  const testQueryClient = createTestQueryClient();
  const resolvedUi = await ui; // Wait for the async component to resolve

  return render(<QueryClientProvider client={testQueryClient}>{resolvedUi}</QueryClientProvider>);
};

import { QueryClient, QueryClientProvider } from "react-query";
import { ErrorBoundary } from "./components";
import Navigation from "./router";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Navigation />
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;

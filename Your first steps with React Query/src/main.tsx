// Import - components
import App from "./App.tsx";

// Import - css
import "./index.css";

// Import - node_modules
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

// Create an instance of query client
const queryClient = new QueryClient();

// Main
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);

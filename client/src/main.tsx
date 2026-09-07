import { ApolloProvider } from "@apollo/client/react";
import client from "./apolloClient.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CustomerProvider } from "./context/CustomerProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <CustomerProvider>
        <App />
      </CustomerProvider>
    </ApolloProvider>
  </StrictMode>,
);

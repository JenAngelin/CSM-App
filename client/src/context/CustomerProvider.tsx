import { useReducer, type ReactNode } from "react";
import { CustomerContext, customerReducer } from "./CustomerContext";

interface CustomerProviderProps {
  children: ReactNode;
}

export function CustomerProvider({ children }: CustomerProviderProps) {
  const [state, dispatch] = useReducer(customerReducer, {
    selectedCustomerId: null,
  });
  return (
    <CustomerContext.Provider value={{ state, dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
}

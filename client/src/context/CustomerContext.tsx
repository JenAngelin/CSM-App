import { createContext, type Dispatch } from "react";

export interface CustomerState {
  selectedCustomerId: string | null;
}

export type CustomerAction =
  | { type: "SELECT_CUSTOMER"; payload: string }
  | { type: "CLEAR_CUSTOMER" };

export function customerReducer(
  state: CustomerState,
  action: CustomerAction,
): CustomerState {
  switch (action.type) {
    case "SELECT_CUSTOMER":
      return {
        ...state,
        selectedCustomerId: action.payload,
      };
    case "CLEAR_CUSTOMER":
      return {
        ...state,
        selectedCustomerId: null,
      };
    default:
      return state;
  }
}
export interface CustomerContextType {
  state: CustomerState;
  dispatch: Dispatch<CustomerAction>;
}

export const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined,
);

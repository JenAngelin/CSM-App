import type { Customer, Subscription } from "./models";

export interface GetCustomersData {
  customers: Customer[];
}

export interface GetCustomerData {
  customer: Customer;
}

export interface GetSubscriptionsData {
  subscriptions: Subscription[];
}

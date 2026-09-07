export interface Customer {
  customerId: string;
  name: string;
  phoneNumber: string;
  accountStatus: "ACTIVE" | "SUSPENDED" | "CLOSED";
  subscriptions: string[];
}

export interface Subscription {
  id: string;
  name: string;
  type: string;
  status: "ACTIVE" | "INACTIVE";
  price: number;
}

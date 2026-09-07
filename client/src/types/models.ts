export interface Customer {
  customerId: string;
  name: string;
  email: string;
  phoneNumber: string;
  accountStatus: "ACTIVE" | "SUSPENDED" | "CLOSED";
  subscriptions: Subscription[];
}

export interface Subscription {
  id: string;
  name: string;
  type: string;
  status: "ACTIVE" | "INACTIVE";
  price: number;
}

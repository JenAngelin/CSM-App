export const subscriptions = [
  {
    id: "S001",
    name: "Sky Entertainment",
    type: "Entertainment",
    status: "ACTIVE",
    price: 25.99,
  },
  {
    id: "S002",
    name: "Sky Sports",
    type: "Sports",
    status: "ACTIVE",
    price: 35.99,
  },
  {
    id: "S003",
    name: "Sky Cinema",
    type: "Cinema",
    status: "ACTIVE",
    price: 18.99,
  },
  {
    id: "S004",
    name: "Sky Kids",
    type: "Kids",
    status: "ACTIVE",
    price: 8.99,
  },
];

export const customers = [
  {
    customerId: "C001",
    name: "Jayden Michael",
    email: "jaydenmichael@gmail.com",
    phoneNumber: "7788996543",
    accountStatus: "ACTIVE",
    subscriptions: ["S001", "S002"],
  },
  {
    customerId: "C002",
    name: "Joel Sherwin",
    email: "sherwinjoe@gmail.com",
    phoneNumber: "7878966543",
    accountStatus: "SUSPENDED",
    subscriptions: ["S003"],
  },
  {
    customerId: "C003",
    name: "Emily Taylor",
    email: "emily.taylor@gmail.com",
    phoneNumber: "9876234594",
    accountStatus: "ACTIVE",
    subscriptions: ["S001", "S004"],
  },
  {
    customerId: "C004",
    name: "Peter Parker",
    email: "peter.parker@gmail.com",
    phoneNumber: "7654286543",
    accountStatus: "CLOSED",
    subscriptions: [],
  },
  {
    customerId: "C005",
    name: "Sarah Williams",
    email: "sarah.williams@gmail.com",
    phoneNumber: "7689564536",
    accountStatus: "ACTIVE",
    subscriptions: ["S002", "S003"],
  },
];

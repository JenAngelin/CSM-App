import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query GetCustomers {
    customers {
      customerId
      name
      email
      phoneNumber
      accountStatus
    }
  }
`;

export const GET_CUSTOMER = gql`
  query GetCustomer($customerId: ID!) {
    customer(customerId: $customerId) {
      customerId
      name
      email
      phoneNumber
      accountStatus
      subscriptions {
        id
        name
        type
        status
        price
      }
    }
  }
`;

export const GET_SUBSCRIPTIONS = gql`
  query GetSubscriptions {
    subscriptions {
      id
      name
      type
      status
      price
    }
  }
`;

import { gql } from "@apollo/client";

export const ADD_SUBSCRIPTION = gql`
  mutation AddSubscription($customerId: ID!, $subscriptionId: ID!) {
    addSubscription(customerId: $customerId, subscriptionId: $subscriptionId) {
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

export const REMOVE_SUBSCRIPTION = gql`
  mutation RemoveSubscription($customerId: ID!, $subscriptionId: ID!) {
    removeSubscription(
      customerId: $customerId
      subscriptionId: $subscriptionId
    ) {
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

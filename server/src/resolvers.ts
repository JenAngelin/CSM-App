import { customers, subscriptions } from "./data";
import { Customer } from "./types";

const resolvers = {
  Query: {
    customers: () => customers,
    customer: (_parent: unknown, args: { customerId: string }) => {
      return customers.find(
        (customer) => customer.customerId === args.customerId,
      );
    },
    subscriptions: () => subscriptions,
  },

  Customer: {
    subscriptions: (customer: Customer) => {
      return customer.subscriptions.map((subscriptionId) => {
        const subscription = subscriptions.find(
          (subscription) => subscription.id === subscriptionId,
        );
        if (!subscription) {
          throw new Error(`Subscription ${subscriptionId} not found`);
        }
        return subscription;
      });
    },
  },

  Mutation: {
    addSubscription: (
      _parent: unknown,
      args: { customerId: string; subscriptionId: string },
    ) => {
      const customer = customers.find(
        (customer) => customer.customerId === args.customerId,
      );
      if (!customer) {
        throw new Error(`Customer ${args.customerId} not found`);
      }
      const subscription = subscriptions.find(
        (subscription) => subscription.id === args.subscriptionId,
      );
      if (!subscription) {
        throw new Error(`Subscription ${args.subscriptionId} not found`);
      }
      customer.subscriptions.push(args.subscriptionId);
      return customer;
    },

    removeSubscription: (
      _parent: unknown,
      args: { customerId: string; subscriptionId: string },
    ) => {
      const customer = customers.find(
        (customer) => customer.customerId === args.customerId,
      );
      if (!customer) {
        throw new Error(`Customer ${args.customerId} not found`);
      }
      const subscriptionIndex = customer.subscriptions.indexOf(
        args.subscriptionId,
      );
      if (subscriptionIndex === -1) {
        throw new Error(
          `Subscription ${args.subscriptionId} is not assigned to customer ${args.customerId}`,
        );
      }
      customer.subscriptions.splice(subscriptionIndex, 1);
      return customer;
    },
  },
};

export default resolvers;

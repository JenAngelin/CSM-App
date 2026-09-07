const typeDefs = `#graphql
    enum AccountStatus {
        ACTIVE
        SUSPENDED
        CLOSED
    }
    
    enum SubscriptionStatus {
        ACTIVE
        INACTIVE
    }

    type Customer {
        customerId: ID!
        name: String!
        email: String!
        phoneNumber: String!
        accountStatus: AccountStatus!
        subscriptions: [Subscription!]!
    }
    
    type Subscription {
        id: ID!
        name: String!
        type: String!
        status: SubscriptionStatus!
        price: Float!
    }

    type Query{
        customers: [Customer!]!
        customer(customerId: ID!): Customer
        subscriptions:[Subscription!]!
    }

    type Mutation{
        addSubscription(customerId: ID! subscriptionId: ID!): Customer
        removeSubscription(customerId: ID! subscriptionId:ID!): Customer
    }
`;

export default typeDefs;

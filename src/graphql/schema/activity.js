import { gql } from 'graphql-tag';

export const activityTypeDefs = gql`
  type Activity {
    name: String!
    score: Int!
    reason: String
  }

    type Query {
    getRankedActivities(city: String!): [Activity]
  }
`;

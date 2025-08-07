import { gql } from 'graphql-tag';

export const cityTypeDefs = gql`
  type City {
    id: ID!
    name: String!
    country: String!
  }
`;

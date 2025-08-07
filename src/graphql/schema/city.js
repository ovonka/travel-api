import { gql } from 'graphql-tag';

export const cityTypeDefs = gql`
  type City {
    name: String!
    latitude: Float!
    longitude: Float!
    country: String
  }

  type Query {
    suggestCities(query: String!): [City!]!
  }
`;

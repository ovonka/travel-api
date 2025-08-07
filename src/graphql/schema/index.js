import { gql } from 'graphql-tag';
import { cityTypeDefs } from './city.js';

export const typeDefs = [
  gql`
    type Query {
      cities: [City]
    }
  `,
  cityTypeDefs,
];

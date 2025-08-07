import { gql } from 'graphql-tag';

export const weatherTypeDefs = gql`
  type WeatherForecast {
    date: String
    temperature: Float
    windspeed: Float
    weatherCode: Int
  }

 type Query {
  getWeatherForecast(city: String!): [WeatherForecast]
}

`;

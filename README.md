# 🌍 Travel Planner GraphQL API

A Node.js backend for a travel planning app — built using Apollo Server and GraphQL.

> This project serves weather-driven activity recommendations and city suggestions for travel planning tools.

---

## ✨ Features

### 🏙️ City API

- Query a curated list of supported cities for travel.
- Schema:  
  ```graphql
  type Query {
    cities: [City]
  }

  type City {
    id: ID!
    name: String!
    country: String!
  }

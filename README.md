# 🌍 Travel Planner GraphQL API

A Node.js backend for a travel planning app, built using Apollo Server and GraphQL. This API provides weather-driven activity recommendations and dynamic city suggestions for travel planning applications.

## 🏗️ Architecture & Technical Choices

This project is built with a focus on clean architecture, separation of concerns, and maintainability.

**GraphQL API:** Implemented using Apollo Server, providing a robust and extensible interface for clients. The schema and resolvers are modularized to keep the code organized and easy to navigate.

**Service Layer:** All business logic and external API interactions are encapsulated within a dedicated services folder. This layer fetches data from Open-Meteo and processes it, keeping the GraphQL resolvers clean and focused on their primary role.

**Utility Functions:** Reusable logic, such as the activity criteria, is placed in a utility folder. This prevents code duplication and makes the criteria for activities easy to modify.

**Testing:** Unit tests are implemented using Jest and Nock to ensure the reliability of the service layer. Mocking external API calls with Nock allows for fast, isolated, and predictable testing. Integration tests cover GraphQL queries for city suggestions, weather forecasts, and activity rankings. There are also integration tests that verify the full API stack.

**Environment Management:** Environment variables are managed using a .env file and the dotenv library, ensuring that sensitive information and API endpoints are not hard-coded.

## 💡 Features

The API exposes three primary functionalities through a clear and extensible GraphQL schema:

### 🏙️ City Suggestions
**Endpoint:** `suggestCities(query: String!): [City!]!`

**Description:** Provides dynamic city suggestions based on a partial or complete user query. Uses the Open-Meteo Geocoding API to find cities and their coordinates.

### ☁️ Weather Forecasts
**Endpoint:** `getWeatherForecast(city: String!): [WeatherForecast]`

**Description:** Fetches a multi-day weather forecast for a selected city, including temperature (°C), wind speed, and weather codes. This data supports activity rankings.

### 📝 Activity Ranking
**Endpoint:** `getRankedActivities(city: String!): [Activity]`

**Description:** Ranks a predefined list of travel activities based on the weather forecast for a given city. The ranking is determined by a detailed scoring system evaluating criteria like temperature, wind speed, and weather code.

## 🚀 Getting Started

### Prerequisites
- **Node.js:** 18.16.0
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/travel-api.git
cd travel-api
npm install
```

2. Create a `.env` file in the root directory and add your Open-Meteo base URL (if different from default):
```env
OPEN_METEO_BASE_URL=https://geocoding-api.open-meteo.com/v1
```

3. Start the server:
```bash
cd src
npm start || npm run dev (with nodemon installed)
```

The API will be available at http://localhost:4000/.

## 🧪 Testing

Unit and integration tests are included under the `tests`(/tests/serviceTests [for isolated unit testing], tests/queryTests [integration testing]) directory. Tests use Jest and Nock for mocking external HTTP requests.

- **Run tests:** `npm run test` (Full API stack test)
- **Run test coverage report:** `npm run coverage`

## 📝 Omissions & Trade-offs

- **Authentication:** No authentication or authorization is implemented yet. This is important for production.
- **GraphQL Subscriptions:** Currently only supports queries; real-time updates could use subscriptions.
- **Simple Scoring:** Uses a static, weighted scoring algorithm for activities.
- **Error Handling:** Basic error handling is implemented; this could be enhanced for more robust client feedback.

## 🛠️ How to Improve or Extend the Project

### Implement a More Dynamic Scoring Algorithm
Allow clients to specify preferences, e.g., prioritize sunny days for outdoor activities or colder weather for skiing. This personalization makes recommendations tailored and more useful.

### Introduce Historical Data Analysis
Use Open-Meteo's historical weather data to provide average stats (e.g., average July temperature in Paris). This can improve recommendations' confidence by considering long-term trends.

### Containerize the Application with Docker
Dockerize the app for portability and easier deployment. Use orchestration tools like Amazon ECS or Kubernetes for scaling and management.

### Caching Layer
Add caching (Redis or in-memory) to reduce redundant calls to Open-Meteo, improving performance and rate limit handling.

### More Activities
Expand the activities utility with more diverse activities and more complex criteria for ranking.
# Serverfarm Home Assessment

This project is a full-stack application designed for a home assessment by Serverfarm. The application allows users to register, log in, and create posts.

## Objective

To develop a simple back-to-front web application using:

- **Node.js** for backend
- **React.js** for frontend
- **MySQL** and **MongoDB** for data storage
- **Kafka** for message brokering
- **Docker** and **Docker Compose** for containerization

## Prerequisites

- Docker
- Docker Compose

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/beam-154/serverfarm-post.git
cd serverfarm-post
```

### Build the Application

```bash
docker-compose build
```

### Run the Application

```bash
docker-compose up
```

## Technologies Used

### Backend

**Node.js & Express:**
- **Authentication:** JWT
- **Database Connection:** Sequelize for MySQL, Mongoose for MongoDB
- **Message Broker Connection:** KafkaJs for Kafka

### Frontend

**React.js:**
- **API Handling:** Axios, Tanstack React Query
- **Styles:** TailwindCSS
- **Routing:** React Router
- **Forms:** React Hook Form
- **Authentication:** JWT

### Databases

- **MySQL:** Structured data storage
- **MongoDB:** NoSQL data storage

### Message Broker

- **Kafka:** Handling message brokering

## Containerization

Using Docker and Docker Compose ensures that the application can run consistently across different environments.
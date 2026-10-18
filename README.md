# KramSetu — Smart Hospital Queue Management System

KramSetu is a hospital queue management system designed to streamline patient registration, appointment scheduling, and queue operations. It supports both appointment-based and walk-in patients, providing organized queue management, real-time status updates, and estimated waiting times.

## Overview

Hospital outpatient departments often experience long waiting times and inefficient queue management. KramSetu aims to address these challenges through a centralized digital platform that improves queue visibility, simplifies patient flow, and assists hospital staff in managing consultations efficiently.

## Key Features

- **Appointment Management:** Schedule and manage patient appointments.
- **Walk-in Registration:** Register patients without prior appointments.
- **Digital Token Generation:** Generate unique queue tokens for registered patients.
- **Queue Management:** Organize patients according to predefined queue rules.
- **Real-Time Queue Tracking:** Display queue status and the currently serving token.
- **Waiting Time Estimation:** Provide approximate waiting times based on queue information.
- **Staff Dashboard:** Support queue monitoring and patient call management.
- **Queue Status Updates:** Track patient progress through the consultation process.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | React.js, TypeScript |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Real-Time Communication | Socket.IO |
| Version Control | Git, GitHub |

## System Architecture

KramSetu follows a client-server architecture.

- **Frontend:** Provides the user interface for patients and hospital staff.
- **Backend:** Handles API requests, business logic, token generation, and queue operations.
- **Database:** Stores patient registration details, appointments, and queue records.
- **Real-Time Layer:** Uses Socket.IO to communicate queue updates to connected clients.

## Project Structure

```text
KramSetu/
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/
│   ├── src/
│   └── package.json
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB or a MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd KramSetu
```

### 2. Configure the Backend

```bash
cd backend
npm install
```

Create a `.env` file using the variables documented in `backend/.env.example`. Configure the MongoDB connection and other required environment variables.

### 3. Configure the Frontend

Open a separate terminal from the project root.

```bash
cd frontend
npm install
```

Configure any required frontend environment variables using `frontend/.env.example`, if provided.

### 4. Run the Application

Start the frontend and backend in separate terminals using the development scripts defined in their respective `package.json` files.

```bash
npm run dev
```

Run the command in each directory where the script is configured.

## Security

- Store credentials and sensitive configuration in environment variables.
- Do not commit `.env` files or secrets to version control.
- Validate incoming requests on the server.
- Apply appropriate authorization to staff operations.
- Protect patient information and database access.

## Project Status

Currently under development.

Features and implementation details may evolve throughout the development process.

---

*KramSetu — Smarter queues. Better patient flow.*

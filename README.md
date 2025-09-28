# Civic Connect - Jharkhand

This is a Next.js application for reporting and managing civic issues in Jharkhand, built with Firebase Studio.

## Getting Started

To get started with this project from GitHub, you'll need to clone the repository and then set up your local environment.

### 1. Clone the Repository

Open your terminal, navigate to the directory where you want to store the project, and run the following git command:

```bash
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
```
(Replace `your-username/your-repository-name` with the actual path to your GitHub repository).

### 2. Follow Local Setup Instructions

Once you have cloned the repository and navigated into the project directory, follow the steps below to run the application locally.

## Running Locally

To run this project on your local machine, follow these steps.

### 1. Environment Variables

Create a `.env` file in the root of the project and add the following environment variables. This file is for your secret keys and is not checked into version control.

```
# Your MongoDB connection string
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority"

# A long, random string for session encryption (at least 32 characters)
SESSION_PASSWORD="a_very_secure_and_long_random_string_for_sessions"

# Google Maps API Key for geocoding and map display
# This key needs Geocoding API and Maps JavaScript API enabled
GOOGLE_MAPS_API_KEY="YOUR_GOOGLE_MAPS_API_KEY"

# Google Gemini API Key for AI features
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

```

### 2. Install Dependencies

Open your terminal, navigate to the project directory, and run the following command to install all the necessary packages defined in `package.json`:

```bash
npm install
```

### 3. Run the Development Servers

This project requires two separate processes to run concurrently: the Next.js web application and the Genkit AI service.

Open two separate terminal windows or tabs.

**In the first terminal**, run the Next.js development server:
```bash
npm run dev
```
Your web application will be available at `http://localhost:9002`.

**In the second terminal**, run the Genkit development server:
```bash
npm run genkit:watch
```
This will start the Genkit flows required for the AI features of the application and watch for any changes you make to them.

### 4. Accessing the Application

Once both servers are running, you can access the application in your web browser at `http://localhost:9002`.

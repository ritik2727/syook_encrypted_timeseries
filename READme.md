
# Syook Encrypted Time Series

Encrypted Time Series is a Node.js application that demonstrates the collection and storage of time-series data with encryption and real-time updates using Socket.io.

## Problem Statement

Make a small backend application which can generate and emit an encrypted data stream over a socket, listens to incoming data stream on a socket, decrypts and decodes it, save to a time series db and then emit the saved data to a small frontend app. Backend services can be in any language (Node JS is preferred, but use Go or any other that you are comfortable with).


## Getting Started

Follow the instructions below to set up and run the project on your local machine.

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.
- MongoDB installed and running (or access to a remote MongoDB instance).

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ritik2727/syook_encrypted_timeseries.git
   ```

2. Navigate to the project directory:

   ```sh
   cd syook_encrypted_timeseries
   ```

3. Install project dependencies:
   ```sh
   cd backend > emitter
   npm install

   cd backend >listener
   ```

4. Create a `.env` file in the listener folder and add your configuration:

   ```env
   PORT=5000
   MONGODB_URI=your-mongodb-connection-string
   ```

5. Start the server:

   ```sh
   cd frontend
   npm start

   cd backend > emitter
   node index

   cd backend > listener
   node index
   ```

6. The application server will be running at `http://localhost:5000`.

## Usage

1. Send encrypted messages to the server using the provided emitter.
2. The server will decrypt and validate the messages, then store them in the database.
3. Real-time updates of stored data can be accessed via WebSocket at `http://localhost:5000/`.


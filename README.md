# Email Verified Login
### Visit it [here](https://email-verified-login.vercel.app/)
#### Backend hosted [here](https://emailverifiedlogin.onrender.com/)
##### Backend and database hosted on [Render](render.com)
##### Frontend hosted on vercel.com


# General Setup

## 1. Install Node.js
#### Download and install Node.js from [here](https://nodejs.org/en/download/).

## 2. Clone the Repository
#### Clone the repository from [here](https://github.com/ImaginedTime/EmailVerifiedLogin.git).

# For Backend Setup

## 1. Install PostgreSQL
#### Download and install PostgreSQL from [here](https://www.postgresql.org/download/).

## 2. Create a Database
#### Create a database in PostgreSQL.

## 3. Install Dependencies
#### Run the following command in the terminal to install the dependencies.
```bash
cd backend
npm install
```

## 4. Environment Variables:
#### Create a `.env` file in the root of the backend folder and add the following environment variables.

####   - `PORT`: The port to run the server on.
####   - `Password`: The postgres database password.
####   - `Database`: The postgres database name.
####   - `email`: The email to send verification links with.
####   - `emailpassword`: The password for the email account.
####   - `secretKey`: The jwt secret Key.


## 5. Run the Server
#### Run the following command in the terminal to start the server.
```bash
npm start
```

## 8. Server is running
#### The server is running on `http://localhost:8080`. or the port you have set in the `.env` file.


# For Frontend Setup

## 1. Install Dependencies
#### Run the following command in the terminal to install the dependencies.
```bash
cd frontend
npm install
```

## 5. Run the Server
#### Run the following command in the terminal to start the server.
```bash
npm run dev
```

## 8. Server is running
#### The server is running on `http://localhost:5173`.
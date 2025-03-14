# Skyrockit - Job Application Tracker

## Overview
The **Job Application Tracker** is a web application that helps users manage their job applications efficiently. Users can sign up, log in, and track their applications in an organized manner. The app is built with **Node.js, Express, MongoDB, and EJS**.

![Job Tracker Screenshot](public/jobtracker.png)

## Features
- **User Authentication**: Sign up and log in functionality using sessions.
- **Application Management**: Users can **add, view, update, and delete** job applications.
- **Session Management**: User sessions are handled securely with `express-session`.
- **Middleware for Security & Functionality**: Custom middleware ensures users are signed in before accessing application-related routes.
- **Logging & Debugging**: (Optional) Uses `morgan` for logging requests.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: Sessions
- **Templating**: EJS
- **Middleware**: Express-session, Method-override, Morgan

## Installation
### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Setup
1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd job-application-tracker
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Create a `.env` file** in the root directory and add:
   ```env
   PORT=3000
   MONGODB_URI=<your-mongodb-uri>
   SESSION_SECRET=<your-secret-key>
   ```
4. **Start the server:**
   ```sh
   npm start
   ```
   The application should now be running on `http://localhost:3000`

## Project Structure
```
job-application-tracker/
│── controllers/
│   ├── auth.js            # Handles authentication (signup, login)
│   ├── applications.js    # Manages job applications CRUD
│
│── middleware/
│   ├── is-signed-in.js    # Middleware to check if user is signed in
│   ├── pass-user-to-view.js # Passes user data to views
│
│── models/
│   ├── Application.js     # Mongoose schema for job applications
│   ├── User.js            # Mongoose schema for users
│
│── views/
│   ├── index.ejs          # Homepage
│   ├── applications/      # Views for applications
│
│── public/
│   ├── css/               # Stylesheets
│   ├── js/                # Client-side scripts
│
│── server.js              # Main server file
│── .env                   # Environment variables
│── package.json           # Dependencies and scripts
```

## API Routes
### Authentication
| Method | Route           | Description |
|--------|----------------|-------------|
| GET    | `/auth/signup`  | Show signup form |
| POST   | `/auth/signup`  | Create a new user |
| GET    | `/auth/login`   | Show login form |
| POST   | `/auth/login`   | Authenticate user |
| GET    | `/auth/logout`  | Log out user |

### Applications (Authenticated Users Only)
| Method | Route | Description |
|--------|----------------------------|-------------------------|
| GET    | `/users/:userId/applications` | List all applications |
| GET    | `/users/:userId/applications/new` | Show new application form |
| POST   | `/users/:userId/applications` | Create a new application |
| GET    | `/users/:userId/applications/:id` | View details of an application |
| GET    | `/users/:userId/applications/:id/edit` | Show edit form |
| PUT    | `/users/:userId/applications/:id` | Update an application |
| DELETE | `/users/:userId/applications/:id` | Delete an application |

## Future Improvements
- Add **OAuth authentication** (Google, GitHub, etc.)
- Implement **email notifications** for application updates
- Enhance **UI with a frontend framework** like React or Vue.js

## License
This project is open-source under the MIT License.


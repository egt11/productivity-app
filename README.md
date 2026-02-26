# 🚀 FlowState Planner

### Overview
FlowState is a personal planner app for users to easily take notes and have a to-do list. This web app can help users stay organized and boost productivity.

### Tech Stack
I used the **MERN stack** in this project:
* **Frontend**: React, TailwindCSS, Axios (for making HTTP requests)
* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose
* **Auth & Utils**: JWT (JSON Web Tokens), Bcrypt for hashing, Resend for emails

### Features
* **Notes & Tasks**: Full CRUD system for both.
* **Auth + Verification**: Secure login and signup flow, including email verification so only real users get in.
* **Responsive Design**: Looks and works great on all screen sizes.

### Context
I learn a lot by doing the work myself. So instead of watching tutorials and taking notes, I built this project to practice **Full-Stack Development** with modern tech.

---

### Setup Instructions

**1. Clone the repo**
```bash
git clone https://github.com/egt11/productivity-app.git
```

**2. Install dependencies**
```bash
npm install && cd frontend && npm install && cd ../backend && npm install
```

**4. Create account in MongoDB**
* Create an account in mongodb atlas
* Create a project
* Create a cluster
* Click connect and copy your mongodb connection string

**4. Create .env file in backend folder**
* PORT=your_port
* CONNECTION_STRING=your_mongodb_connection_string
* JWT_SECRET=your_jwt_secret
* EMAIL_API_KEY=your_api_key_resend

**5. Run the app**
```bash
cd .. && npm run dev
```

# 🎉 Bellcorp Event Management Application

A full-stack Event Discovery and Registration Platform built using the MERN stack.
This application allows users to explore events, register securely, and manage their event history through a personalized dashboard.

The platform focuses on scalable backend architecture, secure authentication, dynamic filtering, and seamless user experience.

---

## 🚀 Live Demo

Frontend: (Add Vercel Link Here)
Backend API: (Add Render/Railway Link Here)

---

## 🛠 Tech Stack

### Frontend

* React.js (Functional Components + Hooks)
* React Router
* Context API (Global Authentication State)
* Axios
* Tailwind CSS / CSS Modules

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* bcryptjs (Password Hashing)
* dotenv
* CORS

### Tools & Deployment

* Git & GitHub
* Postman (API Testing)
* Vercel (Frontend Hosting)
* Render / Railway (Backend Hosting)

---

## 📌 Core Features

### 🔐 Authentication

* Secure user signup with hashed passwords
* Login with JWT-based authentication
* Protected routes using middleware
* Token-based authorization for event registration

### 🔎 Event Discovery

* Dynamic search using regex
* Filter by category and location
* Real-time API updates on filter change
* Responsive event grid layout

### 🎟 Event Registration

* Prevents duplicate registrations
* Enforces event capacity limit
* Backend validation before confirmation
* Registration linked via User ↔ Event relationship

### 📊 User Dashboard

* Displays only logged-in user registrations
* Categorized into:

  * Upcoming Events (date > today)
  * Past Events (date < today)

---

## 🏗 System Architecture

This application follows a clean separation of concerns:

Frontend → Handles UI, routing, and user interaction
Backend → Handles authentication, validation, and business logic
Database → Stores Users, Events, and Registrations

### Database Relationship

User 1 --- N Registration N --- 1 Event

* A user can register for multiple events
* An event can have multiple registered users
* Registration acts as a linking model

---

## 📂 Project Structure

```
root/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Registration.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── eventRoutes.js
│   ├── middleware/
│   │   └── protect.js
│   ├── config/
│   ├── .env
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup (Local Development)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/bellcorp-event-app.git
cd bellcorp-event-app
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

Ensure frontend base URL points to backend server.

---

## 🔐 Authentication Flow

1. User registers
2. Password hashed using bcrypt
3. JWT token generated on login
4. Token sent in Authorization header
5. Middleware verifies token before protected actions

---

## 🔍 Event Filtering Logic

Backend dynamically builds query object:

* Text search using `$regex`
* Category filtering
* Location filtering

Ensures scalable search functionality even with large collections.

---

## 🧪 API Testing

All APIs tested using Postman:

* Proper status codes
* Duplicate prevention
* Capacity validation
* Token verification
* Error handling

---

## 🧠 Key Learning Outcomes

* RESTful API design
* JWT authentication architecture
* Role-based route protection
* MongoDB schema modeling & relations
* Scalable filtering techniques
* Production-ready folder structuring
* Deployment workflow

---

## 🚀 Future Enhancements

* Payment Integration
* Email Confirmation after Registration
* Admin Panel for Event Management
* Pagination & Sorting
* Cloudinary Image Upload
* Redis Caching for faster event loading

---

## 👨‍💻 Author

**Vasanthakumar Durairaj**
Full Stack Developer (MERN Stack)
Passionate about building scalable and secure web applications.

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.
Contributions and feedback are always welcome.

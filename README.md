# 🔍 TraceBack — Citizen Crime & Missing Persons Portal

> **Built in 24 hours** · Full-stack Node.js web app for reporting and tracking missing persons & crimes in real-time.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

## 🚨 The Problem

Every year, thousands of missing person and crime reports get lost in bureaucratic delays. Citizens have no easy way to file complaints, track case status, or get real-time updates. Police officers struggle to manage and update cases efficiently.

**TraceBack** bridges this gap — a unified portal where citizens can report, and officers can act, all in real time.

---

## ✨ Features

### 🧑‍💼 For Citizens (Reporters)
- File reports for **missing persons, mobile theft, chain snatching, vehicle theft, cybercrime, robbery, burglary, assault** and more
- Upload a **photo** along with detailed case info
- Track your own case status live
- Get **instant notifications** when your case is updated

### 👮 For Police Officers
- Dedicated **Police Dashboard** with all active cases in one table
- Update case status: `Missing → Investigating → Found / Closed / Recovered`
- Role-based access — only police can update/delete cases
- Live refresh — no page reload needed

### 📊 Analytics Dashboard
- 📈 Monthly trend **line chart**
- 🍩 Age group **doughnut chart**
- 📊 Top locations **bar chart**
- Live counters: Total cases · Missing · Found · Filed today

### 🔔 Real-time Notifications (Socket.io)
- New report filed → instant popup to **all connected users**
- Status updated → **live card refresh** on the home page
- Zero polling, zero refresh

---

## 🗂 Project Structure

```
traceback/
├── server.js              ← Express + Socket.io entry point
├── seed.js                ← Load sample data into MongoDB
├── package.json
├── .env                   ← MongoDB URI + JWT secret
├── middleware/
│   └── auth.js            ← JWT protect + policeOnly guard
├── models/
│   ├── Case.js            ← Full case schema (10 crime types)
│   └── User.js            ← User auth schema (bcrypt hashed)
├── routes/
│   ├── auth.js            ← Register / Login / Me
│   └── cases.js           ← CRUD + stats API
└── public/
    └── index.html         ← Complete frontend (Vanilla JS, dark UI)
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/your-username/traceback.git
cd traceback
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root:
```env
MONGO_URI=mongodb://127.0.0.1:27017/traceback
JWT_SECRET=your_secret_key_here
PORT=3000
```

### 4. Seed sample data (optional)
```bash
node seed.js
```

### 5. Start the server
```bash
node server.js
# or for development with auto-reload:
npm run dev
```

### 6. Open in browser
```
http://localhost:3000
```

---

## 🌐 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Get JWT token |
| GET | `/api/auth/me` | Bearer | Get own profile |
| GET | `/api/cases` | — | List all cases |
| GET | `/api/cases/stats` | — | Analytics data |
| POST | `/api/cases` | — | File new report |
| PATCH | `/api/cases/:id/status` | 🚔 Police | Update case status |
| DELETE | `/api/cases/:id` | 🚔 Police | Delete a case |

---

## 🔐 User Roles

| Role | Access |
|------|--------|
| **Reporter** | File reports, view & track own cases |
| **Police Officer** | All reporter access + update/delete any case + Police Dashboard |

> Register on the app and select your role during sign-up.

---

## 📋 Supported Case Types

| Type | Description |
|------|-------------|
| 🧍 Missing Person | Full physical description, last seen details |
| 📱 Mobile Theft | IMEI, device model, estimated value |
| 💍 Chain Snatching | Incident details, suspect description |
| 🚗 Vehicle Theft | Vehicle number, type, model |
| 🔒 Robbery / Burglary | Location, items stolen |
| 💻 Cybercrime | Incident description, digital evidence |
| ⚠️ Assault | Victim & suspect details |
| ✅ Found Person | Close/resolve a missing person case |
| 🗂 Other | General complaint |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Real-time | Socket.io |
| Frontend | Vanilla JS, HTML5, CSS3 |
| UI Design | Material Icons, Syne + DM Sans fonts |
| Dev Tools | nodemon, dotenv |

---

## 🏗 Built At

> **24-Hour Hackathon** — Built from scratch in one night.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)

---

<p align="center">Made with ☕ and zero sleep · TraceBack Team</p>

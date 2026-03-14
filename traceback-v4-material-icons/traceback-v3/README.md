# 🔍 TraceBack v2.0 — Full Stack Setup Guide

## 📁 Project Structure

```
traceback-backend/
├── server.js              ← Express + Socket.io server
├── seed.js                ← Load sample data
├── package.json
├── .env                   ← MongoDB + JWT config
├── middleware/
│   └── auth.js            ← JWT protect + policeOnly
├── models/
│   ├── Case.js            ← Missing person schema
│   └── User.js            ← User auth schema (bcrypt)
├── routes/
│   ├── auth.js            ← Register / Login / Me
│   └── cases.js           ← CRUD + stats API
└── public/
    └── index.html         ← Full frontend
```

---

## ⚙️ Setup — 5 Steps

### 1. Install dependencies
```bash
cd traceback-backend
npm install
```

### 2. Start MongoDB Compass
- Connect to: `mongodb://127.0.0.1:27017`

### 3. Seed sample data
```bash
node seed.js
```

### 4. Start the server
```bash
node server.js
```

### 5. Open browser
```
http://localhost:3000
```

---

## ✨ New Features in v2.0

### 🔐 Login System
- **Reporter** — File reports, track own cases
- **Police Officer** — Update case status (missing → found)
- JWT tokens stored in localStorage
- bcrypt password hashing

### 📊 Analytics Dashboard
- Monthly trend line chart
- Age group doughnut chart  
- Top locations bar chart
- Live stats (total, missing, found, today)

### 🔔 Real-time Notifications (Socket.io)
- New case filed → Instant popup to ALL connected users
- Status updated → Live update on home page cards
- No refresh needed!

### 👮 Police Dashboard
- See ALL cases in one table
- Update status via dropdown
- Live refresh button

---

## 🌐 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Get JWT token |
| GET | `/api/auth/me` | Bearer | Get profile |
| GET | `/api/cases` | — | List all cases |
| GET | `/api/cases/stats` | — | Analytics data |
| POST | `/api/cases` | — | File new report |
| PATCH | `/api/cases/:id/status` | Police | Update status |
| DELETE | `/api/cases/:id` | Police | Delete case |

---

## 🔐 Test Accounts (create via Register page)

| Role | Steps |
|------|-------|
| Reporter | Register → Role: Reporter |
| Police | Register → Role: Police Officer → Dashboard unlocks |

---

## 📡 Share with Friends (same Wi-Fi)
```
http://172.18.23.231:3000
```

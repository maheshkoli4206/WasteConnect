# ♻️ WasteConnect

> **Tagline:** Request. Track. Collect.

WasteConnect is a modern, full-stack MERN hackathon MVP designed to simplify responsible waste disposal for residents while providing collection management teams with smart priority scoring, request tracking, and operational analytics.

---

## 🌟 Key Features

### For Residents (USER Role)
- **Waste Category Guidance**: Instant, clear responsible disposal and preparation instructions for E-Waste, Plastic, Paper, Glass, Organic, Metal, Hazardous, and Other materials.
- **Schedule Pickup Requests**: Select waste category, pickup address location, date, and preferred time slot.
- **Smart Collection Priority**: Automated priority rating (LOW, MEDIUM, HIGH) generated upon request submission.
- **Visual Progress Timeline**: Track request lifecycle in real-time (`SUBMITTED` ➔ `REVIEWED` ➔ `SCHEDULED` ➔ `ASSIGNED` ➔ `COLLECTED` ➔ `COMPLETED`).
- **Pickup History**: Manage active and historical pickup requests with status filtering.

### For Operations (ADMIN Role)
- **Real-Time Analytics Dashboard**: Monitor total requests, pending reviews, scheduled pickups, completed collections, and high-priority alerts backed by MongoDB aggregations.
- **Search & Filter Request Queue**: Filter by Category, Status, or Priority, or search by Request ID and address.
- **Smart Priority Sorting**: Automatically prioritize high-risk, hazardous, or urgent pickups.
- **Status & Crew Dispatch Updates**: Update pickup statuses and append crew notes directly.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router v6, Bootstrap 5, Bootstrap Icons, Custom Environmental CSS Design System.
- **Backend**: Node.js, Express.js, JWT Authentication, bcryptjs.
- **Database**: MongoDB & Mongoose (with seamless automatic `mongodb-memory-server` fallback for zero-config local execution).
- **Deployment**: Multi-stage Docker containerization ready for Google Cloud Run.

---

## 🚀 Quick Start Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 1. Install Dependencies
Run from the project root:
```bash
npm run install:all
```
*(Or install manually in `server/` and `client/` directories)*

### 2. Configure Environment Variables
Copy `.env.example` to `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/wasteconnect
JWT_SECRET=wasteconnect_super_secret_jwt_key_2026_hackathon
```
*Note: If local MongoDB is not running, the application will automatically initialize an In-Memory MongoDB server for instant out-of-the-box demoing.*

### 3. Seed Demo Data
To seed initial waste categories, demo users, and sample pickup requests:
```bash
npm run seed
```

### 4. Run Development Servers
Start both backend (Port 5000) and frontend (Port 3000) concurrently:
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🔑 Demo Account Credentials

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Resident (User)** | `user@wasteconnect.org` | `User123!` | User Dashboard, Pickup Creation, Tracking |
| **Operations (Admin)** | `admin@wasteconnect.org` | `Admin123!` | Admin Dashboard, Operations Queue, Status Updates |

*(Quick autofill demo buttons are provided on the Login page for 1-click testing!)*

---

## 📡 REST API Documentation

### Authentication
- `POST /api/auth/register` - Register new user/admin
- `POST /api/auth/login` - Authenticate & obtain JWT
- `GET /api/auth/me` - Fetch current user profile

### Waste Categories
- `GET /api/categories` - Fetch waste categories & disposal guidance

### Resident Requests
- `POST /api/requests` - Create a pickup request
- `GET /api/requests/my` - Get logged-in user's requests
- `GET /api/requests/:id` - Get details & status timeline of specific request
- `PATCH /api/requests/:id/cancel` - Cancel a submitted request

### Admin Operations
- `GET /api/admin/statistics` - Aggregate collection statistics
- `GET /api/admin/requests` - Queue of all requests with search & filters
- `GET /api/admin/requests/:id` - Admin request details
- `PATCH /api/admin/requests/:id/status` - Update request status, priority & crew notes

---

## 🐳 Containerization & Deployment (Google Cloud Run)

To build and run locally with Docker:
```bash
docker build -t wasteconnect .
docker run -p 8080:8080 -e MONGODB_URI="your_mongodb_atlas_uri" wasteconnect
```

Deploying to Google Cloud Run:
```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/wasteconnect
gcloud run deploy wasteconnect --image gcr.io/YOUR_PROJECT_ID/wasteconnect --platform managed --allow-unauthenticated
```

---

## 📄 License
MIT License. Built for WasteConnect Hackathon.

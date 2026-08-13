# Student Homework Tracker

A simple, public homework activity tracker for two students (Nafis and Tamim), built with the MERN stack.

- **Public visitors** can browse recorded dates and view each student's status and the instructor's note — no login required, no calendar UI, only dates that have actual records.
- **The instructor (single administrator)** logs in to create, update, and delete daily records.

## Tech Stack

- **Frontend:** React + Vite, Tailwind CSS v4, React Router
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcryptjs (single hardcoded admin account, no registration)

## Project Structure

```
nafis-tamim/
├── server/     Express API, MongoDB models, JWT auth, admin seed script
└── client/     React (Vite) frontend
```

See `server/` and `client/` for their internal folder layout (controllers/models/routes, and components/pages/services respectively).

## Design Summary

**Data model** — one MongoDB collection, `homeworkRecords`, one document per date (`date` is unique, `YYYY-MM-DD`):
```js
{ date, nafisCompleted, tamimCompleted, note, createdAt, updatedAt }
```

**REST API**

| Method | Route | Access |
|---|---|---|
| GET | `/api/homework` | Public — all records, newest first |
| GET | `/api/homework/:date` | Public — one record |
| POST | `/api/homework` | Admin only (JWT) |
| PUT | `/api/homework/:date` | Admin only (JWT) |
| DELETE | `/api/homework/:date` | Admin only (JWT) |
| POST | `/api/auth/login` | Public — returns JWT |

Write routes are protected server-side by an Express JWT middleware (`server/middleware/authMiddleware.js`) — the API rejects unauthenticated writes with `401` regardless of what the frontend does.

**Auth flow** — admin logs in with email/password → backend verifies against a bcrypt hash → issues a JWT (7-day expiry) → React stores it in `localStorage` and attaches it as `Authorization: Bearer <token>` on every request → a `401` response anywhere clears the session and bounces the admin back to `/admin/login`.

**Frontend routes**

| Route | Access |
|---|---|
| `/` | Public list of recorded dates |
| `/record/:date` | Public detail view |
| `/admin/login` | Admin login |
| `/admin` | Admin dashboard (protected, redirects to login if not authenticated) |

## Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

Create the (single) admin account:

```bash
npm run seed-admin
```

Start the API:

```bash
npm run dev    # nodemon, for development
# or
npm start      # plain node
```

The API runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env
```

`client/.env` just needs to point at the API (defaults already match the backend above):

```
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```




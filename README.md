# Student Homework Tracker

**Live:** https://nafis-tamim.vercel.app/

## Background

I tutor two students, Nafis and Tamim, and their homework completion was inconsistent — some days done, some days skipped — with no easy way to keep their parents in the loop. Calling or messaging each parent individually after every single session wasn't realistic to keep up day after day, and even when I tried, it often didn't work out — the parents aren't always home or reachable at the time, so a missed call just meant another day where they had no idea whether homework actually got done.

So I built this site to close that gap. After each session I log that day's record — whether each student completed their homework, plus a short note — and the site automatically emails both parents right away, so they're informed the same day without me having to reach them individually. On top of that, every past record lives in one public page that's available any time, so parents (or the students) can check the full history whenever they want instead of depending on updates that might get missed.

- **Public visitors** can browse recorded dates and view each student's status and the instructor's note — no login required, no calendar UI, only dates that have actual records.
- **The instructor (single administrator)** logs in to create, update, and delete daily records.
- **Parents are notified automatically** — creating a new record sends an email (with the date, each student's status and note) to everyone listed in `PARENT_EMAILS`, so nothing depends on the instructor remembering to message them separately.

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
FRONTEND_URL=https://your-deployed-frontend.example.com
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_APP_PASSWORD=your_16_char_app_password
PARENT_EMAILS=parent1@example.com,parent2@example.com
```

`EMAIL_USER`/`EMAIL_APP_PASSWORD`/`PARENT_EMAILS` are optional — if any is missing, the app just skips sending notifications. When set, every time the admin creates a new homework record, an email is sent to all `PARENT_EMAILS` with the date, each student's completion status and note, and a prompt to visit the site for the full picture. `EMAIL_APP_PASSWORD` must be a [Gmail App Password](https://myaccount.google.com/apppasswords), not your regular Gmail password (requires 2-Step Verification enabled on the Google account).

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




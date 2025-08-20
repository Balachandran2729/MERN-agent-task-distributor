# MERN Distributor Backend

Express + MongoDB backend for Admin login, Agent management, and CSV/XLS/XLSX upload with fair 5-way distribution.

## Requirements
- Node 18+
- MongoDB 6+
- Frontend running at `http://localhost:3000`

## Setup

```bash
npm install
cp .env.example .env
# edit .env (MONGO_URI, JWT_SECRET, CLIENT_ORIGIN, and admin seed values)
npm run dev

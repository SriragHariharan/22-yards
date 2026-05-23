# 22 Yards

Multi-vendor e-commerce platform for cricket goods — buyer storefront and seller dashboard.

## Tech Stack

- **Frontend:** React, Vite, Redux Toolkit, React Router, Bootstrap/MDB
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Payments:** Razorpay
- **Images:** Cloudinary

## Project Structure

- `frontend/` — buyer and seller React app
- `backend/` — Express API (`app.js`, `server.js`, `config/`, `services/`, `routes/`, `controllers/`, `models/`)

## Setup

### Backend

Copy `backend/.env.example` to `backend/.env` and fill in your credentials. See `.env.example` for all required variables (MongoDB, JWT, Razorpay, Nodemailer, Cloudinary).

```bash
cd backend
npm install
npm run dev
```

Server runs at `http://localhost:4000`.

### Frontend

Create `frontend/.env`:

```env
VITE_SERVER='http://localhost:4000/api/'
VITE_SERVER_IMG='https://res.cloudinary.com/<cloud_name>/image/upload'
VITE_RZP_SECRET_KEY=<razorpay_key_id>
```

```bash
cd frontend
npm install
npm run dev
```

## Contact

Questions? Reach out at sriraghariharan108@gmail.com

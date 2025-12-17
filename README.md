# GrowthTrack - Business Growth Tracking System

GrowthTrack is a web-based system that helps businesses track, measure, and optimize company growth. The system allows users to manage leads, clients, deals, revenue, and partnerships while generating actionable insights.

## Features

- **Lead & Client Management**: Capture and store leads, convert them to clients, and track all interactions
- **Revenue Tracking**: Monitor revenue at multiple levels with auto-rollup functionality
- **Partnership Tracking**: Track business partnerships and their contributions
- **Visual Dashboard**: KPIs, charts, and graphs for quick insights
- **Automated Reports**: Weekly/monthly PDF reports with KPIs and activity summaries
- **Kanban Pipeline**: Visual deal pipeline with stage-based color coding

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Vite

### Backend
- Node.js (Express)
- PostgreSQL
- Prisma ORM

### Authentication & Hosting
- Supabase Auth (RBAC)
- Vercel (Frontend)

## Getting Started

### Prerequisites
- Node.js >= 16.x
- PostgreSQL database
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

4. Set up environment variables (see `.env.example` files)

5. Run the development servers:

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
npm run dev
```

## Deployment

### Frontend
Deploy to Vercel using the Vercel CLI or connect your GitHub repository to Vercel.

### Backend
Can be deployed to any Node.js hosting platform (e.g., Render, Heroku, AWS, etc.)

## Project Structure

```
growth-track/
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   └── ...
│   └── ...
├── backend/            # Node.js backend
│   ├── controllers/    # Request handlers
│   ├── routes/        # API routes
│   ├── prisma/        # Database schema
│   └── ...
└── README.md
```

## License

This project is licensed under the MIT License.
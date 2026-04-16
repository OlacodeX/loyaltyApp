# Loyalty App Frontend

React + Vite frontend for:
- users listing
- simulate purchase action
- user achievements dashboard

## Requirements

- Node.js 18+ (recommended: latest LTS)
- npm
- A running backend API

## Setup on a New Machine

1. Clone the repository.
```bash
git clone <your-repo-url>
```
2. Check out the frontend branch:

```bash
git checkout frontend
```

3. Install dependencies:

```bash
npm install
```

4. Create env file from example:

```bash
cp .env.example .env
```

5. Set backend API base URL in `.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Run Locally

Start development server:

```bash
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`).

## Main Routes

- `/users` - users list with pagination
- `/users/:userId/achievements` - achievements dashboard for a user

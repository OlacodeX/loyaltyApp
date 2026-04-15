# Loyalty App (Laravel 13)

Simple loyalty API for users, achievements, and badges.

## Requirements

- PHP `8.3+`
- Composer `2+`
- MySQL or MariaDB

## Setup on a new machine

### 1) Clone and checkout the backend branch

```bash
git clone <your-repo-url>
cd loyalty-app
git checkout backend
```

### 2) Install dependencies

```bash
composer install
```

### 3) Create env file and app key

Linux/macOS/Git Bash:

```bash
cp .env.example .env
php artisan key:generate
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
php artisan key:generate
```

### 4) Configure database

Default `.env` values:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=loyalty_app
DB_USERNAME=root
DB_PASSWORD=
```

Create the DB:

```sql
CREATE DATABASE loyalty_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5) Run migrations and seeders

```bash
php artisan migrate --seed
```

Seeded data includes:
- achievements
- badges
- 5 users (`UserSeeder` + `UserFactory`)

### 6) Start the app

```bash
php artisan serve
```

API base URL: `http://127.0.0.1:8000/api`

## API endpoints

- `GET /api/users`  
  Paginated users (`10` per page), wrapped in Laravel resource response.

- `POST /api/users/{user}/purchase`  
  Request body:
  ```json
  { "amount": 1500 }
  ```
  Response: `201` with `{"data":[]}`.

- `GET /api/users/{user}/achievements`  
  Response includes:
  - `unlocked_achievements`
  - `next_available_achievements`
  - `current_badge`
  - `next_badge`
  - `remaining_to_unlock_next_badge`

## Quick smoke test

```bash
curl -s http://127.0.0.1:8000/api/users
```

Use a user id from the response:

```bash
curl -s -X POST http://127.0.0.1:8000/api/users/1/purchase \
  -H "Content-Type: application/json" \
  -d "{\"amount\":1500}"
```

```bash
curl -s http://127.0.0.1:8000/api/users/1/achievements
```

## Useful commands

- Reset DB and reseed:
  ```bash
  php artisan migrate:fresh --seed
  ```

## Troubleshooting

- `Unknown database loyalty_app`  
  Create the database and confirm `.env` credentials.

- Env changes not reflected  
  ```bash
  php artisan config:clear
  ```

## License

MIT.

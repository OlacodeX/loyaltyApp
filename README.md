# Loyalty App

Laravel 13 API for a simple loyalty program: users accumulate **total orders** and **total spent** (Naira), unlock **achievements** and **badges** from seeded catalog rules, and expose progress over HTTP.

## Requirements

- **PHP** 8.3 or newer
- **Composer** 2.x
- **Database**: MySQL/MariaDB or SQLite

## 1. Clone and install PHP dependencies

```bash
cd loyalty-app
composer install
```

## 2. Environment file

Copy the example env and generate an application key:

```bash
cp .env.example .env
php artisan key:generate
```

Edit **`.env`** and set at least:

| Variable | Purpose |
|----------|---------|
| `APP_URL` | Base URL of the app (e.g. `http://localhost:8000`) |
| `DB_*` | Database connection (see below) |

### Database (MySQL, matches XAMPP defaults)

Example from `.env.example`:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=loyalty_app
DB_USERNAME=root
DB_PASSWORD=
```

## 3. Migrate and seed

Runs migrations and loads **achievements**, **badges**, and a demo user:

```bash
php artisan migrate --seed
```

Demo user from the seeder (adjust in `DatabaseSeeder` if you change it):

- Email: `test@example.com`
- Password: `password`

## 4. Run the application

### API only (typical)

```bash
php artisan serve
```

The app is available at **`http://127.0.0.1:8000`** (or the host/port shown in the terminal).

## 5. Loyalty API

All routes below are prefixed with **`/api`** (Laravel’s API routes).

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/users/{user}/purchase` | Record one purchase: increments `total_orders` by 1, adds `amount` to `total_spent`, dispatches `PurchaseCompleted` (listeners unlock achievements/badges). |
| `GET` | `/api/users/{user}/achievements` | Returns unlocked / next achievements and badge progress JSON. |

`{user}` must be the numeric **user id**.

### Example: record a purchase

Body JSON: **`amount`** — integer, whole Naira for this purchase (≥ 0).

```bash
curl -s -X POST http://127.0.0.1:8000/api/users/2/purchase \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d "{\"amount\":1500}"
```

Expected: HTTP **201** with `{"ok":true}`.

### Example: fetch loyalty summary

```bash
curl -s http://127.0.0.1:8000/api/users/2/achievements \
  -H "Accept: application/json"
```

## License

This project inherits the [MIT license](https://opensource.org/licenses/MIT) from the Laravel framework.

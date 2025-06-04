# Product Management (Technical Assessment)

**Output for the technical assessment at FYB Technologies**  
**Developed by:** _Johcel Gene T. Bitara_

---

## 🛠 Tech Stack

- **Shadcn UI**
- **PHP Laravel 10**
- **Node.js**
- **Laravel + Inertia.js (React)**
- **Typescript**
- **Tailwind CSS**
- **SQLite**

---

## ✅ Accomplished Features

| #   | Feature Description                                                   |
| --- | --------------------------------------------------------------------- |
| 1   | JWT Authentication                                                    |
| 2   | `POST /auth/register` — Register a new user                           |
| 3   | `POST /auth/login` — Login and return JWT                             |
| 4   | `GET /users/me` — Fetch authenticated user data                       |
| 5   | User redirect logic based on authentication state                     |
| 6   | `POST /products` — Store a new product                                |
| 7   | `GET /products` — List all products (with pagination)                 |
| 8   | `GET /products/:id` — Retrieve a single product                       |
| 9   | `PUT /products/:id` — Update a product                                |
| 10  | `DELETE /products/:id` — Delete a product                             |
| 11  | JWT-based frontend authentication with protected routes               |
| 12  | Product listing table with sorting, pagination, and filtering         |
| 13  | Product form UI for create/edit (non-functional API integration only) |
| 14  | Product delete button UI (non-functional API integration only)        |

---

## ⚙️ How to Run the Project

#### Prerequisites:

```bash
# Install PHP dependencies
composer install

# Generate JWT secret
php artisan key:generate
php artisan jwt:secret

# Install JS dependencies
npm install

copy .env.example .env

# Run database migrations
php artisan migrate
```

#### Running the Application Localy

```bash
# Start the Laravel backend server
php artisan serve

# Start the Vite dev server
npm run dev
```

## 🌱 Seeding

Run the following command to populate the products table.

```bash
php artisan db:seed
```

## 🐋 Running with Docker

```bash
# Make sure to have the .env already copied to the working dir.
# copy .env.example .env
docker build -t product-mgt-exam:latest .
```

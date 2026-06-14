# portfolio2.0

React/Vite portfolio frontend with MongoDB-backed contact APIs.

## Frontend

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Vercel API With MongoDB Atlas

The default contact form endpoint is `/api/contact`, implemented as a Vercel Node serverless function with the official MongoDB driver.

Set these values in `.env` locally and in the Vercel project environment variables:

```bash
APP_KEY="use-a-long-random-secret"
VITE_CONTACT_API_URL="/api/contact"
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-host>/<database>?retryWrites=true&w=majority&appName=<app-name>"
MONGODB_DATABASE="portfolio"
MONGODB_CONTACT_COLLECTION="messages"
CORS_ALLOWED_ORIGINS="https://your-frontend-domain.example"
```

API endpoints:

- `POST /api/contact` stores a validated contact message.
- `GET /api/test-mongodb` verifies that MongoDB is reachable.

Local Vercel-style development:

```bash
npm install
npx vercel dev
```

## Optional PHP Backend With MongoDB Atlas

The PHP backend stores contact form submissions in MongoDB Atlas through the official Composer package `mongodb/mongodb`.

Required runtime pieces:

- PHP 8.2 or newer
- Composer
- MongoDB PHP extension `ext-mongodb`
- Composer package install via `composer install`

Local setup:

```bash
cp .env.example .env
composer install
```

If you deploy the PHP backend separately, set `VITE_CONTACT_API_URL` to that backend endpoint and use the same MongoDB environment values:

```bash
VITE_CONTACT_API_URL="https://your-php-backend.example/forms/contact.php"
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-host>/<database>?retryWrites=true&w=majority&appName=<app-name>"
MONGODB_DATABASE="myDatabase"
MONGODB_CONTACT_COLLECTION="messages"
CORS_ALLOWED_ORIGINS="https://your-frontend-domain.example"
```

Do not commit `.env` or real MongoDB credentials.

Backend endpoints:

- `POST /forms/contact.php` stores a validated contact message.
- `GET /forms/test-mongodb.php` verifies that MongoDB is reachable.

## Deployment Notes

For Vercel, use the `/api/contact` serverless function and add the MongoDB variables in Project Settings -> Environment Variables before redeploying.

If using the PHP backend instead, deploy it to a PHP-capable host such as Render, Railway, Fly.io, a VPS, or shared hosting with Composer and `ext-mongodb` support. Set `VITE_CONTACT_API_URL` in the Vercel frontend project to the deployed PHP endpoint URL.

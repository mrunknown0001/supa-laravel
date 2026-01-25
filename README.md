# Laravel 12 + Inertia.js + React + Supabase

A modern web application built with Laravel 12, Inertia.js, React, and Supabase for authentication and database management.

## Tech Stack

- **Backend**: Laravel 12 (PHP Framework)
- **Frontend**: React 19 with Inertia.js
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Vite

## Features

- User authentication with Supabase
- Role-based access control (User/Admin)
- Dashboard with user management
- Admin panel for application management
- Responsive design with Tailwind CSS
- Modern React components

## Setup Instructions

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd supa-laravel
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```

   Update your `.env` file with:
   - Database credentials (Supabase)
   - Supabase URL and API keys
   - Application key: `php artisan key:generate`

5. **Database Setup**
   ```bash
   php artisan migrate
   ```

6. **Build Assets**
   ```bash
   npm run build
   ```

### Development

Start the development servers:

```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite dev server
npm run dev
```

Or use the convenience script:
```bash
composer run dev
```

### Production Deployment

1. Build assets for production:
   ```bash
   npm run build
   ```

2. Configure your web server to serve the Laravel application
3. Set up environment variables for production
4. Run database migrations on production server

## Project Structure

```
├── app/                    # Laravel application code
│   ├── Http/Controllers/   # Controllers
│   ├── Models/            # Eloquent models
│   └── Services/          # Business logic services
├── resources/
│   ├── js/                # React components and pages
│   │   ├── Components/    # Reusable React components
│   │   ├── Layouts/       # Layout components
│   │   ├── Pages/         # Inertia.js pages
│   │   └── app.jsx        # Main React app
│   └── css/               # Stylesheets
├── routes/                # Route definitions
└── config/                # Configuration files
```

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run build` - Build assets for production
- `composer run dev` - Start all development servers concurrently
- `php artisan serve` - Start Laravel development server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
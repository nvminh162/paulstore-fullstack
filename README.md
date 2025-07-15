# PaulStore - Full Stack E-commerce Application

A modern full-stack e-commerce application built with Node.js, Express, TypeScript, Prisma, and MySQL. This application provides both admin management capabilities and client-facing shopping features.

## Features

### 🛍️ Customer Features
- User registration and authentication
- Product browsing and search
- Shopping cart management
- Order placement and tracking
- User profile management

### 🔧 Admin Features
- Dashboard with analytics
- Product management (CRUD operations)
- User management
- Order management and status updates
- File upload for product images

### 🏗️ Technical Features
- **Backend**: Node.js with Express and TypeScript
- **Database**: MySQL with Prisma ORM
- **Authentication**: Passport.js with local strategy
- **Session Management**: Express sessions with Prisma store
- **File Upload**: Multer for handling image uploads
- **Validation**: Zod for schema validation
- **Security**: Bcrypt for password hashing

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MySQL** (v8.0 or higher)
- **Git**

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd paulstore-fullstack
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory by copying from the example:

```bash
cp .env.example .env
```

Configure your environment variables in `.env`:

```env
PORT=8080
NODE_ENV=development

# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/paulstore"
```

**Note**: Replace `username`, `password`, and `paulstore` with your MySQL credentials and desired database name.

### 4. Database Setup

#### Create Database
First, create a MySQL database:

```sql
CREATE DATABASE paulstore;
```

#### Generate Prisma Client
```bash
npx prisma generate
```

#### Run Database Migrations
```bash
npx prisma migrate dev --name init-dbs
```

This command will:
- Create all necessary tables
- Seed the database with initial data (admin user, roles, sample products)

#### View Database (Optional)
To explore your database with Prisma Studio:

```bash
npx prisma studio
```

### 5. Start the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:8080`

## Default Accounts

After running migrations, the following default accounts are available:

### Admin Account
- **Email**: `admin@gmail.com`
- **Password**: `nvminh162`
- **Role**: Administrator

### User Account
- **Email**: `nvminh162@gmail.com`
- **Password**: `nvminh162`
- **Role**: Regular User

## Project Structure

```
├── src/
│   ├── app.ts                 # Application entry point
│   ├── config/               # Configuration files
│   │   ├── client.ts         # Prisma client setup
│   │   ├── constants.ts      # Application constants
│   │   ├── db.ts            # Database configuration
│   │   └── seed.ts          # Database seeding
│   ├── controllers/         # Route controllers
│   │   ├── admin/           # Admin panel controllers
│   │   └── client/          # Client-side controllers
│   ├── middleware/          # Custom middleware
│   ├── routes/              # Route definitions
│   ├── services/            # Business logic
│   ├── validation/          # Input validation schemas
│   └── views/               # EJS templates
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── public/                  # Static assets
│   ├── admin/              # Admin panel assets
│   ├── client/             # Client-side assets
│   └── images/             # Uploaded images
└── package.json
```

## API Documentation

The project includes a Postman collection for API testing:
- Location: `src/routes/nodejs-pro.postman_collection.json`
- Import this file into Postman to test API endpoints

### Key API Endpoints

- **Authentication**: `/api/auth/*`
- **Users**: `/api/users/*`
- **Products**: `/api/products/*`
- **Orders**: `/api/orders/*`
- **Cart**: `/api/cart/*`

## Database Schema

The application uses the following main entities:

- **Users**: Customer and admin accounts
- **Roles**: User permissions (ADMIN, USER)
- **Products**: E-commerce products
- **Cart**: Shopping cart functionality
- **Orders**: Order management
- **Sessions**: User session storage

## Available Scripts

```bash
# Development
npm run dev              # Start development server with hot reload

# Production
npm start               # Build and start production server

# Database
npx prisma generate     # Generate Prisma client
npx prisma migrate dev  # Run database migrations
npx prisma studio      # Open database admin interface
npx prisma db seed     # Seed database with initial data

# Debug
npm run start:debug    # Start with debugging enabled
```

## File Upload

The application supports file uploads for:
- User avatars
- Product images

Uploaded files are stored in the `public/images/` directory.

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- CSRF protection
- Input validation with Zod
- Secure file upload handling

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Verify DATABASE_URL in `.env` file
   - Check database credentials

2. **Migration Errors**
   - Ensure database exists
   - Check Prisma schema syntax
   - Try `npx prisma migrate reset` for development

3. **Port Already in Use**
   - Change PORT in `.env` file
   - Kill process using the port: `npx kill-port 8080`

## License

This project is licensed under the ISC License.

## Author

[@nvminh162](https://www.facebook.com/nvminh162)

For questions or support, please contact the development team.
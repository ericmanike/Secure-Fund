# Secure Fund - Student Loan Application Website

A Next.js application for managing student loan applications in Ghana.

## Features

- **Public Pages**: Home, About, Apply, Login, Register
- **Student Dashboard**: View loan applications and status
- **Admin Dashboard**: Manage and approve/reject loan applications
- **Paystack Integration**: Secure payment processing for loan repayment
- **Responsive Design**: Mobile-friendly interface
- **Form Validation**: Formik and Yup for form validation
- **MongoDB Database**: Scalable database storage

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- MongoDB with Mongoose
- Formik & Yup for form validation
- Paystack Payment Gateway
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- MongoDB database (local or MongoDB Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up MongoDB:
   - Create a MongoDB database (use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for free cloud database or install MongoDB locally)
   - Get your MongoDB connection string

3. Create a `.env.local` file in the root directory:
```env
JWT_SECRET=your-secret-key-here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/securefund?retryWrites=true&w=majority
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=your-paystack-public-key
PAYSTACK_SECRET_KEY=your-paystack-secret-key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```
Note: 
- Replace the MongoDB URI with your actual connection string
- For local development, `NEXT_PUBLIC_SITE_URL` defaults to `https://securefund.gh`. Set it to `http://localhost:3000` for local development if needed.

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Default Admin Account

To create an admin account, run:
```bash
node scripts/create-admin.js
```

Make sure your `.env.local` file has the `MONGODB_URI` set before running this script.

## Project Structure

```
├── app/
│   ├── about/          # About page
│   ├── admin/          # Admin dashboard
│   ├── apply/          # Loan application form
│   ├── dashboard/      # Student dashboard
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── repay/          # Loan repayment page
│   ├── api/            # API routes
│   └── layout.tsx      # Root layout
├── components/         # Reusable components
│   ├── Navbar.tsx      # Navigation bar
│   └── Footer.tsx      # Footer component
├── lib/                # Utility functions
│   ├── models/         # MongoDB models (User, Loan)
│   ├── mongodb.ts      # MongoDB connection
│   ├── auth.ts         # Authentication utilities
│   ├── data.ts         # Data access layer
│   └── middleware.ts   # Route protection
└── scripts/            # Utility scripts (create-admin.js)
```

## Environment Variables

- `JWT_SECRET`: Secret key for JWT token signing
- `MONGODB_URI`: MongoDB connection string (required)
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`: Paystack public key
- `PAYSTACK_SECRET_KEY`: Paystack secret key
- `NEXT_PUBLIC_SITE_URL`: Your site URL (defaults to `https://securefund.gh`, use `http://localhost:3000` for local development)

## Notes

- Data is stored in MongoDB database
- Make sure MongoDB is running and accessible before starting the application
- Replace Paystack keys with your actual keys from [Paystack Dashboard](https://dashboard.paystack.com)
- For MongoDB Atlas (cloud), ensure your IP address is whitelisted in the network access settings



# ERP Software System

A comprehensive ERP (Enterprise Resource Planning) software built with React, TypeScript, and Supabase. This system provides complete business management functionality with separate frontend and backend architecture for scalable deployment.

## Features

### Core Modules
- **Dashboard** - Business analytics and key metrics overview
- **Invoice Management** - Create, manage, and track invoices with PDF generation
- **Order Management** - Handle sales orders with complete workflow tracking
- **Delivery Challans** - Manage delivery notes and shipping documentation
- **Proforma Invoices** - Generate quotations and convert to invoices
- **Customer Management** - Maintain customer database with contact information
- **Product/Inventory** - Track products and stock levels
- **User Authentication** - Secure login system with role-based access

### Technical Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Real-time Updates** - Live data synchronization across all modules
- **Professional UI/UX** - Clean, modern interface designed for business users
- **Print-ready Documents** - Professional invoice and report layouts
- **Role-based Access Control** - Admin, Manager, and User permission levels
- **Multi-company Support** - Handle multiple business entities

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Recharts** for analytics visualization
- **Lucide React** for icons
- **jsPDF** for document generation

### Backend & Database
- **Supabase** for backend services
- **PostgreSQL** database with Row Level Security
- **Real-time subscriptions** for live data updates
- **Built-in authentication** with email/password

## Quick Start

### Prerequisites
- Node.js 18+ 
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd erp-software
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Copy your project URL and anon key
   - Create `.env` file from `.env.example`
   ```bash
   cp .env.example .env
   ```
   - Update the environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   Run the following SQL in your Supabase SQL editor:

   ```sql
   -- Create companies table
   CREATE TABLE IF NOT EXISTS companies (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     name text NOT NULL,
     address text NOT NULL,
     phone text NOT NULL,
     email text NOT NULL,
     gstin text,
     logo_url text,
     created_at timestamptz DEFAULT now()
   );

   -- Create users table
   CREATE TABLE IF NOT EXISTS users (
     id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
     email text UNIQUE NOT NULL,
     full_name text NOT NULL,
     role text NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user')),
     company_id uuid REFERENCES companies(id),
     created_at timestamptz DEFAULT now()
   );

   -- Create customers table
   CREATE TABLE IF NOT EXISTS customers (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
     name text NOT NULL,
     email text,
     phone text,
     address text NOT NULL,
     gstin text,
     created_at timestamptz DEFAULT now()
   );

   -- Create products table
   CREATE TABLE IF NOT EXISTS products (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     company_id uuid NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
     name text NOT NULL,
     description text,
     sku text NOT NULL,
     price decimal(10,2) NOT NULL DEFAULT 0,
     stock_quantity integer NOT NULL DEFAULT 0,
     unit text NOT NULL DEFAULT 'pcs',
     created_at timestamptz DEFAULT now(),
     UNIQUE(company_id, sku)
   );

   -- Enable RLS
   ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
   ALTER TABLE products ENABLE ROW LEVEL SECURITY;

   -- Create RLS policies
   CREATE POLICY "Users can read own data" ON users
     FOR SELECT TO authenticated
     USING (auth.uid() = id);

   CREATE POLICY "Companies can be read by their users" ON companies
     FOR SELECT TO authenticated
     USING (id IN (SELECT company_id FROM users WHERE id = auth.uid()));

   CREATE POLICY "Customers can be managed by company users" ON customers
     FOR ALL TO authenticated
     USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

   CREATE POLICY "Products can be managed by company users" ON products
     FOR ALL TO authenticated
     USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open http://localhost:5173 in your browser
   - Create an account or sign in
   - Start managing your business!

## Deployment

### Frontend Deployment
The frontend can be deployed to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Connect your Git repository
- **AWS S3 + CloudFront**: Upload the build files

### Backend Setup
The backend uses Supabase, which is already cloud-hosted. No additional deployment needed for the backend services.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   └── Layout/         # Layout components (Sidebar, Header)
├── contexts/           # React Context providers
├── lib/               # Utility libraries and configurations
├── pages/             # Main application pages/views
├── types/             # TypeScript type definitions
└── App.tsx           # Main application component
```

## Key Features Explanation

### Dashboard
- Real-time business metrics and KPIs
- Sales charts and analytics
- Recent activity feed
- Quick action buttons

### Invoice Management
- Professional invoice templates
- PDF generation and download
- Email integration for sending invoices
- Payment status tracking
- Tax calculations (GST/VAT ready)

### Order Management
- Complete order lifecycle tracking
- Customer order history
- Inventory integration
- Delivery scheduling

### Authentication & Security
- Secure email/password authentication
- Role-based access control (RBAC)
- Row Level Security (RLS) at database level
- Company-based data isolation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## License

This project is licensed under the MIT License - see the LICENSE file for details.
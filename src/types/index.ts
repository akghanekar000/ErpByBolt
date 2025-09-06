export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'manager' | 'user';
  company_id: string;
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  gstin?: string;
  logo_url?: string;
  created_at: string;
}

export interface Customer {
  id: string;
  company_id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  gstin?: string;
  created_at: string;
}

export interface Product {
  id: string;
  company_id: string;
  name: string;
  description?: string;
  sku: string;
  price: number;
  stock_quantity: number;
  unit: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  company_id: string;
  customer_id: string;
  invoice_number: string;
  invoice_date: string;
  due_date: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  notes?: string;
  created_at: string;
  customer?: Customer;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product?: Product;
}

export interface Order {
  id: string;
  company_id: string;
  customer_id: string;
  order_number: string;
  order_date: string;
  expected_delivery: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  notes?: string;
  created_at: string;
  customer?: Customer;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product?: Product;
}

export interface Challan {
  id: string;
  company_id: string;
  customer_id: string;
  order_id?: string;
  challan_number: string;
  challan_date: string;
  status: 'pending' | 'in_transit' | 'delivered';
  notes?: string;
  created_at: string;
  customer?: Customer;
  items: ChallanItem[];
}

export interface ChallanItem {
  id: string;
  challan_id: string;
  product_id: string;
  quantity: number;
  product?: Product;
}
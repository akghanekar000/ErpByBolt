import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { AuthForm } from './components/Auth/AuthForm';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Invoices } from './pages/Invoices';
import { Orders } from './pages/Orders';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/challans" element={<div className="p-8 text-center text-gray-500">Challans page - Coming soon</div>} />
        <Route path="/proforma" element={<div className="p-8 text-center text-gray-500">Proforma page - Coming soon</div>} />
        <Route path="/customers" element={<div className="p-8 text-center text-gray-500">Customers page - Coming soon</div>} />
        <Route path="/products" element={<div className="p-8 text-center text-gray-500">Products page - Coming soon</div>} />
        <Route path="/company" element={<div className="p-8 text-center text-gray-500">Company page - Coming soon</div>} />
        <Route path="/settings" element={<div className="p-8 text-center text-gray-500">Settings page - Coming soon</div>} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
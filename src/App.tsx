import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Customer from "./pages/Customer";
import ThankYou from "./pages/ThankYou";
import About from "./pages/About";
import Login from "./pages/Login";
import CustomerLogin from "./pages/CustomerLogin";
import MyRecords from "./pages/MyRecords";
import Dashboard from "./pages/admin/Dashboard";
import Customers from "./pages/admin/Customers";
import AddCustomer from "./pages/admin/AddCustomer";
import ConsultationRequests from "./pages/admin/ConsultationRequests";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import CustomerProtectedRoute from "./components/CustomerProtectedRoute";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer-login" element={<CustomerLogin />} />
          <Route path="/my-records" element={<CustomerProtectedRoute><MyRecords /></CustomerProtectedRoute>} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />
          <Route path="/admin/customers" element={<AdminProtectedRoute><Customers /></AdminProtectedRoute>} />
          <Route path="/admin/add-customer" element={<AdminProtectedRoute><AddCustomer /></AdminProtectedRoute>} />
          <Route path="/admin/consultation-requests" element={<AdminProtectedRoute><ConsultationRequests /></AdminProtectedRoute>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Track from "./pages/Track";
import ViewShipment from "./pages/ViewShipment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import EditUserForm from "./components/EditUserForm";
import CookieConsent from "./components/CookieConsent";
import Create_shipment from "./components/CreateShipment";
import CreateEvent from "./components/CreateEvent";
import EditEvent from "./components/EditEvent";
import ViewShipmentEvents from "./components/ViewShipmentEvent";
import EditShipment from "./components/EditShipment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services" element={<Services />} />
              <Route path="calculate" element={<Pricing />} />
              <Route path="track" element={<Track />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route element={<CookieConsent />} />

              <Route
                path="/admin/user/edit/:userId"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <EditUserForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create/shipment/:userId"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <Create_shipment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/:userId/shipment/edit/:shipmentId"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <EditShipment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/view/event/:shipmentId"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <ViewShipmentEvents />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create/event/:shipmentId"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit/event/:eventId"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <EditEvent />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/view/user/:user_id/shipment/:tracking_code"
                element={
                  <ProtectedRoute requiredRoles={["admin", "customer"]}>
                    <ViewShipment />
                  </ProtectedRoute>
                }
              />

              <Route
                path="login"
                element={
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                }
              />
              <Route
                path="register"
                element={
                  <GuestRoute>
                    <Register />
                  </GuestRoute>
                }
              />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute requiredRoles={["customer", "admin"]}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/:user_id/dashboard"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin"
                element={
                  <ProtectedRoute requiredRoles={["admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

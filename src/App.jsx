import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./Pages/Homepage";
import AboutPage from "./Pages/About";
import ContactPage from "./Pages/Contact";
import MyProfilePage from "./Pages/MyProfile";
import LoginPage from "./Pages/auth/Login";
import RegisterPage from "./Pages/auth/Register";
import Doctors from "./Pages/Doctors";
import AppointmentPage from "./Pages/Appointment";
import MyAppointment from './Pages/MyAppointment'
import Navbar from "./Components/layout/Navbar";
import Footer from "./Components/layout/Footer";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ForgotPasswordPage from "./Pages/auth/ForgotPasswordPage";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
  <Route path="/">
    {/* Auth Routes */}
    <Route path="auth">
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
    </Route>

    {/* Public Routes */}
    <Route index element={<HomePage />} />
    <Route path="doctors/:speciality?" element={<Doctors />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="contact" element={<ContactPage />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="profile" element={<MyProfilePage />} />
      <Route path="my-appointment" element={<MyAppointment />} />
      <Route path="appointment/:docId" element={<AppointmentPage />} />
    </Route>
  </Route>
</Routes>


      <Footer/>
    </>
  );
};

export default App;

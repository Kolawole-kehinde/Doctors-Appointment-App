import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./Pages/Homepage";
import AboutPage from "./Pages/About";
import ContactPage from "./Pages/Contact";
import MyProfilePage from "./Pages/MyProfile";
import Footer from "./Componets/layout/Footer";
import Navbar from "./Componets/layout/Navbar";
import LoginPage from "./Pages/auth/Login";
import RegisterPage from "./Pages/auth/Register";
import Doctors from "./Pages/Doctors";
import AppointmentPage from "./Pages/Appointment";
import MyAppointment from './Pages/MyAppointment'
import ProtectedRoute from "./Componets/ProtectedRoute/ProtectedRoute";

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


      <Footer />
    </>
  );
};

export default App;

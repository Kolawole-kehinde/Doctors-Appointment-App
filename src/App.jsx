import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./Pages/Homepage";
import AboutPage from "./Pages/About";
import ContactPage from "./Pages/Contact";
import MyProfilePage from "./Pages/MyProfile";
import MyAppointment from "./Pages/MyAppointment";
import Footer from "./Componets/layout/Footer";
import Navbar from "./Componets/layout/Navbar";
import LoginPage from "./Pages/auth/Login";
import RegisterPage from "./Pages/auth/Register";
import Doctors from "./Pages/Doctors";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route path="auth">
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route index element={<HomePage />} />
          <Route path="doctors/:speciality?" element={<Doctors />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="profile" element={<MyProfilePage />} />
          <Route path="my-appointment" element={<MyAppointment />} />
          <Route path="appointment/:docId" element={<MyAppointment />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
};

export default App;

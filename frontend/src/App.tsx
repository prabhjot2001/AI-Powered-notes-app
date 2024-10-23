import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/custom/Layout";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotePage from "./pages/NotePage";
import AddNotePage from "./pages/AddNotePage";
import UpdateNotePage from "./pages/UpdateNotePage";
import TermsConditions from "./pages/Terms&Conditions";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoutes from "./components/protectedRoutes";
import LandingPage from "./pages/LandingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy-policy" element={<TermsConditions />} />
        <Route path="/demo" element={<LandingPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes/:id" element={<NotePage />} />
          <Route path="/add-note" element={<AddNotePage />} />
          <Route path="/update-note/:id" element={<UpdateNotePage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

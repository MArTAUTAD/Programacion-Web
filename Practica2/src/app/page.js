"use client";
import { useState, useEffect } from "react";
import LoginUser from "./user/onBoarding/login/page";
import Register from "./user/onBoarding/register/page";
import Validation from "./user/onBoarding/validation/page";
import TokenService from "@/utils/TokenService";


import PageLayout from "./pagesInfo/layout";
import Clients from "./pagesInfo/clients/page";
import "@/styles/home.css";

export default function Home() {
  const [view, setView] = useState("login");

  useEffect(() => {
    const token = TokenService.getToken();
    if (token) {
      setView("pages"); 
    }
  }, []);

  const handleLogin = (newToken) => {
    TokenService.setToken(newToken); 
    setView("pages");
  };

  const handleLogout = () => {
    TokenService.clearToken(); 
    setView("login");
  };

  return (
    <div className="home-container">
      <div className="view-container">
        {view === "login" && (
          <LoginUser
            onLogin={handleLogin}
            onRegisterClick={() => setView("register")}
          />
        )}

        {view === "register" && (
          <Register
            onRegister={() => setView("verification")}
            onLoginClick={() => setView("login")}
          />
        )}

        {view === "verification" && (
          <Validation onValidation={() => setView("pages")} />
        )}

        {view === "pages" && (
          <PageLayout onLogout={handleLogout}>
            <Clients />
          </PageLayout>
        )}
      </div>
    </div>
  );
}

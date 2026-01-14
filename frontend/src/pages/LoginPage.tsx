import React from "react";
import { LoginForm } from "../components/LoginForm";

export const LoginPage: React.FC = () => {
  return (
    <div className="page">
      <LoginForm onLoggedIn={() => {}} />
    </div>
  );
};

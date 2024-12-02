import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const isInAuthPage = location.pathname.includes("/auth/login") || location.pathname.includes("/auth/register");
  const isInAdminPage = location.pathname.includes("/admin");
  const isInShopPage = location.pathname.includes("/shop");

  // Redirect unauthenticated users to login/register page, unless they are already there
  if (!isAuthenticated && !isInAuthPage) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect authenticated users to their appropriate dashboard or home
  if (isAuthenticated) {
    if (isInAuthPage) {
      return user?.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/shop/home" />;
    }

    // Block unauthorized access to admin pages
    if (isInAdminPage && user?.role !== "admin") {
      return <Navigate to="/unauth-page" replace />;
    }

    // Redirect admin to dashboard if trying to access shop pages
    if (isInShopPage && user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  // If no redirects are required, render children (protected route content)
  return <>{children}</>;
};

export default CheckAuth;

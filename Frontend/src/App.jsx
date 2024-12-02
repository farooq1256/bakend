import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping/layout";
import PageNotFound from "./pages/not-found/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnAuthPage from "./components/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";

// Constants for route paths
const ROUTES = {
  AUTH: "/auth",
  ADMIN: "/admin",
  SHOP: "/shop",
  UNAUTH_PAGE: "/unauth-page",
  PAGE_NOT_FOUND: "*",
};

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])
  
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path={ROUTES.AUTH}
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path={ROUTES.ADMIN}
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route
          path={ROUTES.SHOP}
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        <Route path={ROUTES.UNAUTH_PAGE} element={<UnAuthPage />} />
        <Route path={ROUTES.PAGE_NOT_FOUND} element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

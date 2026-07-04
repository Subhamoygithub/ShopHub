import {
  Routes,
  Route,
} from "react-router-dom";

import Register from "./Components/Register";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import AdminUsers from "./Components/AdminDashboard";
import ProductPage from "./Components/Product";
import ProductDetails from "./Components/ProductDetails";
import Navbar from "./Components/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Orders from "./Components/Order";
import ProtectedRoute from "./Components/ProtectedRouter";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminUsers />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer />
    </>
  );
};

export default App;
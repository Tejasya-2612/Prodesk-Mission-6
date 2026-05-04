import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import ProtectedRoute from "./ProtectedRoute";
import {
  HomePage,
  ShopPage,
  ProductPage,
  CartPage,
  LoginPage,
  CheckoutPage,
  ContactPage,
} from "./pages";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;
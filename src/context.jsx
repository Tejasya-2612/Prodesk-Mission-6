import { createContext, useContext, useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// CART CONTEXT
// ─────────────────────────────────────────────────────────────

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Load cart from localStorage on initial render
const [cartItems, setCartItems] = useState(() => {
    try {
    const saved = localStorage.getItem("shopzone_cart");
    return saved ? JSON.parse(saved) : [];
    } catch {
    return [];
    }
});

  // Persist cart to localStorage whenever it changes
useEffect(() => {
    localStorage.setItem("shopzone_cart", JSON.stringify(cartItems));
}, [cartItems]);

  // Add a product to the cart (increment qty if already present)
function addToCart(product) {
    setCartItems((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    if (existing) {
        return prev.map((item) =>
        item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
    }
    return [...prev, { ...product, quantity: 1 }];
    });
}

  // Remove a product completely from the cart
function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
}

  // Set the quantity for a specific cart item (removes if qty <= 0)
function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
    removeFromCart(productId);
    return;
    }
    setCartItems((prev) =>
    prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
    )
    );
}

  // Calculate total price across all cart items
const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
);

return (
    <CartContext.Provider
    value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalPrice }}
    >
    {children}
    </CartContext.Provider>
);
}

// Convenience hook for consuming CartContext
export function useCart() {
return useContext(CartContext);
}

// ─────────────────────────────────────────────────────────────
// AUTH CONTEXT
// ─────────────────────────────────────────────────────────────

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Persist login state across page refreshes
const [user, setUser] = useState(() => {
    return localStorage.getItem("shopzone_auth") === "true";
});

  // Set user as logged in (guest login)
function login() {
    setUser(true);
    localStorage.setItem("shopzone_auth", "true");
}

  // Log the user out
function logout() {
    setUser(false);
    localStorage.removeItem("shopzone_auth");
}

return (
    <AuthContext.Provider value={{ user, login, logout }}>
    {children}
    </AuthContext.Provider>
);
}

// Convenience hook for consuming AuthContext
export function useAuth() {
return useContext(AuthContext);
}
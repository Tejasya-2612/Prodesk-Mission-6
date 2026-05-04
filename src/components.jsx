import { Link, useNavigate } from "react-router-dom";
import { useCart, useAuth } from "./context";

// ─────────────────────────────────────────────────────────────
// NAVBAR — visible on every page
// ─────────────────────────────────────────────────────────────
export function Navbar() {
const { cartItems } = useCart();
const { user, logout } = useAuth();
const navigate = useNavigate();

const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

function handleLogout() {
    logout();
    navigate("/");
}

return (
    <nav style={styles.nav}>
    <Link to="/" style={styles.brand}>🛍️ ShopZone</Link>

    <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/shop" style={styles.link}>Shop</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>

        {/* Cart icon with item count badge */}
        <Link to="/cart" style={styles.cartLink}>
        🛒 Cart
        {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
        </Link>

        {user ? (
        <>
            <Link to="/checkout" style={styles.link}>Checkout</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </>
        ) : (
        <Link to="/login" style={styles.link}>Login</Link>
        )}
    </div>
    </nav>
);
}

// ─────────────────────────────────────────────────────────────
// PRODUCT CARD — used in ShopPage grid
// ─────────────────────────────────────────────────────────────
export function ProductCard({ product, onClick }) {
return (
    <div style={styles.card} onClick={onClick}>
    <div style={styles.imageWrapper}>
        <img src={product.thumbnail} alt={product.title} style={styles.image} />
    </div>
    <div style={styles.cardBody}>
        <h3 style={styles.cardTitle}>{product.title}</h3>
        <p style={styles.cardCategory}>{product.category}</p>
        <p style={styles.cardPrice}>${product.price.toFixed(2)}</p>
        <div style={styles.ratingRow}>
        <span style={styles.stars}>{"★".repeat(Math.round(product.rating))}</span>
        <span style={styles.ratingNum}>({product.rating})</span>
        </div>
    </div>
    </div>
);
}

// ─────────────────────────────────────────────────────────────
// LOADING SPINNER
// ─────────────────────────────────────────────────────────────
export function Spinner() {
return (
    <div style={styles.spinnerWrapper}>
    <div style={styles.spinner} />
    </div>
);
}

// ─────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────
const styles = {
nav: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 2rem", height: "64px", background: "#1e1b4b",
    boxShadow: "0 2px 12px rgba(0,0,0,0.18)", position: "sticky", top: 0, zIndex: 100,
},
brand: { color: "#fff", fontSize: "1.4rem", fontWeight: 700, textDecoration: "none" },
links: { display: "flex", alignItems: "center", gap: "1.5rem" },
link: { color: "#c7d2fe", textDecoration: "none", fontWeight: 500, fontSize: "0.95rem" },
cartLink: {
    color: "#c7d2fe", textDecoration: "none", fontWeight: 500, fontSize: "0.95rem",
    position: "relative", display: "flex", alignItems: "center", gap: "4px",
},
badge: {
    background: "#f43f5e", color: "#fff", borderRadius: "999px",
    fontSize: "0.7rem", fontWeight: 700, padding: "1px 6px", minWidth: "18px",
    textAlign: "center", lineHeight: "1.4",
},
logoutBtn: {
    background: "transparent", border: "1px solid #818cf8", color: "#c7d2fe",
    borderRadius: "6px", padding: "4px 12px", cursor: "pointer", fontSize: "0.9rem", fontWeight: 500,
},
card: {
    background: "#fff", borderRadius: "12px", overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)", cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s", display: "flex", flexDirection: "column",
},
imageWrapper: {
    background: "#f8fafc", display: "flex", alignItems: "center",
    justifyContent: "center", height: "200px", overflow: "hidden",
},
image: { width: "100%", height: "100%", objectFit: "contain", padding: "12px", transition: "transform 0.3s" },
cardBody: { padding: "14px 16px 16px", flex: 1, display: "flex", flexDirection: "column", gap: "4px" },
cardTitle: {
    margin: 0, fontSize: "0.95rem", fontWeight: 600, color: "#1e293b", lineHeight: 1.3,
    display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
},
cardCategory: { margin: 0, fontSize: "0.78rem", color: "#94a3b8", textTransform: "capitalize" },
cardPrice: { margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#4f46e5" },
ratingRow: { display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" },
stars: { color: "#fbbf24", fontSize: "0.85rem" },
ratingNum: { fontSize: "0.78rem", color: "#94a3b8" },
spinnerWrapper: { display: "flex", justifyContent: "center", alignItems: "center", padding: "4rem" },
spinner: {
    width: "48px", height: "48px", border: "4px solid #e0e7ff",
    borderTop: "4px solid #4f46e5", borderRadius: "50%", animation: "spin 0.8s linear infinite",
},
};

// Inject keyframes for spinner + hover effects
const styleTag = document.createElement("style");
styleTag.textContent = `
@keyframes spin { to { transform: rotate(360deg); } }
a:hover { color: #fff !important; }
.card-hover:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.14) !important; }
.card-hover:hover img { transform: scale(1.05); }
`;
document.head.appendChild(styleTag)
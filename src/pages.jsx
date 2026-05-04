import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useCart, useAuth } from "./context";
import { ProductCard, Spinner } from "./components";

// ── HOME PAGE ("/") ───────────────────────────────────────────
export function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={pg.page}>
      <section style={pg.hero}>
        <div style={pg.heroContent}>
          <span style={pg.heroBadge}>New Arrivals 2025</span>
          <h1 style={pg.heroTitle}>Shop the Best.<br />Love Every Purchase.</h1>
          <p style={pg.heroSub}>Discover thousands of products at unbeatable prices.</p>
          <div style={pg.heroActions}>
            <button style={pg.heroCta} onClick={() => navigate("/shop")}>Browse Products →</button>
            <button style={pg.heroSecondary} onClick={() => navigate("/contact")}>Contact Us</button>
          </div>
        </div>
        <div style={pg.heroIllustration}>🛒</div>
      </section>
      <section style={pg.features}>
        {[
          { icon: "🚀", title: "Fast Shipping", desc: "Orders delivered within 2-3 business days." },
          { icon: "🔒", title: "Secure Checkout", desc: "Your payment info is always protected." },
          { icon: "💰", title: "Best Prices", desc: "We price-match any competitor guarantee." },
          { icon: "🔄", title: "Easy Returns", desc: "30-day hassle-free return policy." },
        ].map((f) => (
          <div key={f.title} style={pg.featureCard}>
            <span style={pg.featureIcon}>{f.icon}</span>
            <h3 style={pg.featureTitle}>{f.title}</h3>
            <p style={pg.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

// ── SHOP PAGE ("/shop") ───────────────────────────────────────
export function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((r) => r.json())
      .then((data) => setProducts(data.products))
      .catch(() => setError("Failed to load products. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={pg.page}>
      <div style={pg.shopHeader}>
        <h1 style={pg.pageTitle}>All Products</h1>
        <input style={pg.searchInput} type="text" placeholder="Search products..."
          value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {loading && <Spinner />}
      {error && <p style={pg.error}>{error}</p>}
      {!loading && !error && filtered.length === 0 && <p style={pg.empty}>No products match your search.</p>}
      <div style={pg.grid}>
        {filtered.map((product) => (
          <div key={product.id} className="card-hover" style={{ borderRadius: 12 }}>
            <ProductCard product={product} onClick={() => navigate(`/product/${product.id}`)} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PRODUCT PAGE ("/product/:id") ─────────────────────────────
export function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((r) => { if (!r.ok) throw new Error("Product not found"); return r.json(); })
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) return <Spinner />;
  if (error) return <div style={pg.page}><p style={pg.error}>{error}</p></div>;
  if (!product) return null;

  return (
    <div style={pg.page}>
      <Link to="/shop" style={pg.backLink}>← Back to Shop</Link>
      <div style={pg.productDetail}>
        <div style={pg.productImages}>
          <img src={product.thumbnail} alt={product.title} style={pg.productMainImage} />
          <div style={pg.thumbnails}>
            {(product.images || []).slice(0, 4).map((img, i) => (
              <img key={i} src={img} alt={`view ${i + 1}`} style={pg.thumbnail} />
            ))}
          </div>
        </div>
        <div style={pg.productInfo}>
          <span style={pg.productCategory}>{product.category}</span>
          <h1 style={pg.productTitle}>{product.title}</h1>
          <div style={pg.productMeta}>
            <span style={pg.stars}>{"★".repeat(Math.round(product.rating))}</span>
            <span style={pg.ratingText}>{product.rating} / 5</span>
            <span style={pg.stock}>{product.stock > 0 ? `✓ ${product.stock} in stock` : "Out of stock"}</span>
          </div>
          <p style={pg.productPrice}>${product.price.toFixed(2)}</p>
          {product.discountPercentage > 0 && (
            <span style={pg.discount}>-{product.discountPercentage.toFixed(0)}% OFF</span>
          )}
          <p style={pg.productDesc}>{product.description}</p>
          <button style={added ? pg.addedBtn : pg.addBtn} onClick={handleAddToCart} disabled={product.stock === 0}>
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>
          <div style={pg.productExtras}>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>SKU:</strong> {product.sku}</p>
            <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
            <p><strong>Shipping:</strong> {product.shippingInformation}</p>
            <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
          </div>
        </div>
      </div>
      {product.reviews?.length > 0 && (
        <div style={pg.reviews}>
          <h2 style={pg.reviewsTitle}>Customer Reviews</h2>
          <div style={pg.reviewsGrid}>
            {product.reviews.map((r, i) => (
              <div key={i} style={pg.reviewCard}>
                <div style={pg.reviewHeader}>
                  <strong>{r.reviewerName}</strong>
                  <span style={pg.reviewStars}>{"★".repeat(r.rating)}</span>
                </div>
                <p style={pg.reviewBody}>{r.comment}</p>
                <small style={pg.reviewDate}>{new Date(r.date).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── CART PAGE ("/cart") ───────────────────────────────────────
export function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) return (
    <div style={{ ...pg.page, textAlign: "center", paddingTop: "4rem" }}>
      <span style={{ fontSize: "4rem" }}>🛒</span>
      <h2 style={{ color: "#1e293b", marginTop: "1rem" }}>Your cart is empty</h2>
      <p style={{ color: "#64748b" }}>Start shopping to add items here.</p>
      <button style={pg.addBtn} onClick={() => navigate("/shop")}>Browse Products</button>
    </div>
  );

  return (
    <div style={pg.page}>
      <h1 style={pg.pageTitle}>Your Cart</h1>
      <div style={pg.cartLayout}>
        <div style={pg.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} style={pg.cartRow}>
              <img src={item.thumbnail} alt={item.title} style={pg.cartImage} />
              <div style={pg.cartInfo}>
                <p style={pg.cartItemTitle}>{item.title}</p>
                <p style={pg.cartItemPrice}>${item.price.toFixed(2)} each</p>
              </div>
              <div style={pg.qtyControls}>
                <button style={pg.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                <span style={pg.qtyNum}>{item.quantity}</span>
                <button style={pg.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <p style={pg.cartRowTotal}>${(item.price * item.quantity).toFixed(2)}</p>
              <button style={pg.removeBtn} onClick={() => removeFromCart(item.id)}>✕</button>
            </div>
          ))}
        </div>
        <div style={pg.orderSummary}>
          <h2 style={pg.summaryTitle}>Order Summary</h2>
          <div style={pg.summaryRow}><span>Items ({cartItems.reduce((s, i) => s + i.quantity, 0)})</span><span>${totalPrice.toFixed(2)}</span></div>
          <div style={pg.summaryRow}><span>Shipping</span><span style={{ color: "#22c55e" }}>Free</span></div>
          <div style={pg.divider} />
          <div style={{ ...pg.summaryRow, fontWeight: 700, fontSize: "1.15rem" }}><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>
          <button style={pg.checkoutBtn} onClick={() => navigate("/checkout")}>Proceed to Checkout</button>
          <button style={pg.continueBtn} onClick={() => navigate("/shop")}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}

// ── LOGIN PAGE ("/login") ─────────────────────────────────────
export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate("/"); }, [user, navigate]);

  function handleGuestLogin() { login(); navigate("/checkout"); }

  return (
    <div style={pg.authPage}>
      <div style={pg.authCard}>
        <span style={{ fontSize: "2.5rem" }}>🛍️</span>
        <h1 style={pg.authTitle}>Welcome to ShopZone</h1>
        <p style={pg.authSub}>Sign in to access your cart and checkout.</p>
        <button style={pg.guestBtn} onClick={handleGuestLogin}>Login as Guest</button>
        <p style={pg.authFooter}>No account needed — enjoy shopping!</p>
      </div>
    </div>
  );
}

// ── CHECKOUT PAGE ("/checkout") — PROTECTED ───────────────────
export function CheckoutPage() {
  const { cartItems, totalPrice, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);

  function handlePlaceOrder() {
    setPlaced(true);
    cartItems.forEach((item) => removeFromCart(item.id));  // clear cart
    setTimeout(() => navigate("/"), 3000);
  }

  if (placed) return (
    <div style={pg.authPage}>
      <div style={{ ...pg.authCard, maxWidth: 420 }}>
        <span style={{ fontSize: "3rem" }}>🎉</span>
        <h2 style={pg.authTitle}>Order Placed!</h2>
        <p style={pg.authSub}>Thank you for shopping at ShopZone. Redirecting…</p>
      </div>
    </div>
  );

  return (
    <div style={pg.page}>
      <h1 style={pg.pageTitle}>Checkout</h1>
      <div style={pg.cartLayout}>
        <div style={pg.cartItems}>
          <h2 style={{ margin: "0 0 1rem", color: "#1e293b" }}>Order Summary</h2>
          {cartItems.length === 0
            ? <p style={{ color: "#64748b" }}>Your cart is empty.</p>
            : cartItems.map((item) => (
              <div key={item.id} style={pg.cartRow}>
                <img src={item.thumbnail} alt={item.title} style={pg.cartImage} />
                <div style={pg.cartInfo}>
                  <p style={pg.cartItemTitle}>{item.title}</p>
                  <p style={pg.cartItemPrice}>Qty: {item.quantity}</p>
                </div>
                <p style={pg.cartRowTotal}>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
        </div>
        <div style={pg.orderSummary}>
          <h2 style={pg.summaryTitle}>Payment</h2>
          <div style={pg.summaryRow}><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
          <div style={pg.summaryRow}><span>Shipping</span><span style={{ color: "#22c55e" }}>Free</span></div>
          <div style={pg.summaryRow}><span>Tax (8%)</span><span>${(totalPrice * 0.08).toFixed(2)}</span></div>
          <div style={pg.divider} />
          <div style={{ ...pg.summaryRow, fontWeight: 700, fontSize: "1.15rem" }}>
            <span>Total</span><span>${(totalPrice * 1.08).toFixed(2)}</span>
          </div>
          <input style={pg.field} placeholder="Cardholder Name" />
          <input style={pg.field} placeholder="Card Number" />
          <div style={{ display: "flex", gap: "8px" }}>
            <input style={{ ...pg.field, flex: 1 }} placeholder="MM/YY" />
            <input style={{ ...pg.field, flex: 1 }} placeholder="CVV" />
          </div>
          <button style={pg.checkoutBtn} onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

// ── CONTACT PAGE ("/contact") ─────────────────────────────────
export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) { setForm({ ...form, [e.target.name]: e.target.value }); }
  function handleSubmit(e) { e.preventDefault(); setSent(true); setForm({ name: "", email: "", message: "" }); }

  return (
    <div style={pg.page}>
      <div style={pg.contactLayout}>
        <div style={pg.contactInfo}>
          <h1 style={pg.pageTitle}>Get in Touch</h1>
          <p style={{ color: "#64748b", lineHeight: 1.7 }}>
            Have a question or feedback? We respond within 24 hours.
          </p>
          {[
            { icon: "📧", text: "support@shopzone.com" },
            { icon: "📞", text: "+1 (555) 123-4567" },
            { icon: "🏢", text: "123 Commerce St, San Francisco, CA 94105" },
          ].map((c) => (
            <div key={c.text} style={pg.contactItem}>
              <span style={{ fontSize: "1.3rem" }}>{c.icon}</span>
              <span style={{ color: "#475569" }}>{c.text}</span>
            </div>
          ))}
        </div>
        <form style={pg.contactForm} onSubmit={handleSubmit}>
          {sent && <div style={pg.successBanner}>✅ Message sent! We'll get back to you soon.</div>}
          <label style={pg.label}>Your Name</label>
          <input style={pg.field} name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" required />
          <label style={pg.label}>Email Address</label>
          <input style={pg.field} name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" required />
          <label style={pg.label}>Message</label>
          <textarea style={{ ...pg.field, height: "130px", resize: "vertical" }}
            name="message" value={form.message} onChange={handleChange} placeholder="How can we help you?" required />
          <button type="submit" style={pg.addBtn}>Send Message</button>
        </form>
      </div>
    </div>
  );
}

// ── SHARED STYLES (pg object) ─────────────────────────────────
const panel = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.07)",
};

const buttonBase = {
  border: 0,
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 700,
};

const pg = {
  page: {
    width: "min(1180px, calc(100% - 32px))",
    margin: "0 auto",
    padding: "32px 0 56px",
  },
  hero: {
    minHeight: "calc(100vh - 112px)",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.05fr) minmax(260px, 0.95fr)",
    alignItems: "center",
    gap: "40px",
    padding: "48px 0 36px",
  },
  heroContent: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "18px" },
  heroBadge: {
    background: "#eef2ff",
    color: "#4338ca",
    border: "1px solid #c7d2fe",
    borderRadius: "999px",
    padding: "7px 13px",
    fontSize: "0.85rem",
    fontWeight: 800,
  },
  heroTitle: {
    margin: 0,
    color: "#0f172a",
    fontSize: "clamp(2.6rem, 6vw, 5rem)",
    lineHeight: 0.98,
    letterSpacing: 0,
  },
  heroSub: { margin: 0, maxWidth: "560px", color: "#475569", fontSize: "1.15rem", lineHeight: 1.7 },
  heroActions: { display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "6px" },
  heroCta: {
    ...buttonBase,
    background: "#4f46e5",
    color: "#fff",
    padding: "13px 20px",
    boxShadow: "0 12px 22px rgba(79, 70, 229, 0.24)",
  },
  heroSecondary: {
    ...buttonBase,
    background: "#fff",
    color: "#312e81",
    border: "1px solid #c7d2fe",
    padding: "13px 18px",
  },
  heroIllustration: {
    minHeight: "360px",
    display: "grid",
    placeItems: "center",
    borderRadius: "28px",
    background: "linear-gradient(135deg, #312e81 0%, #4f46e5 48%, #14b8a6 100%)",
    color: "#fff",
    fontSize: "clamp(7rem, 16vw, 13rem)",
    boxShadow: "0 28px 70px rgba(49, 46, 129, 0.28)",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    marginTop: "10px",
  },
  featureCard: { ...panel, padding: "22px" },
  featureIcon: { display: "block", fontSize: "2rem", marginBottom: "14px" },
  featureTitle: { margin: "0 0 8px", color: "#172033", fontSize: "1.05rem" },
  featureDesc: { margin: 0, color: "#64748b", lineHeight: 1.6 },
  shopHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "16px",
    marginBottom: "24px",
  },
  pageTitle: { margin: 0, color: "#0f172a", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05 },
  searchInput: {
    width: "min(100%, 360px)",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    background: "#fff",
    padding: "12px 14px",
    color: "#172033",
    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.05)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "22px",
  },
  error: {
    ...panel,
    padding: "16px",
    color: "#be123c",
    background: "#fff1f2",
    borderColor: "#fecdd3",
  },
  empty: { ...panel, padding: "24px", color: "#64748b", textAlign: "center" },
  backLink: {
    display: "inline-flex",
    marginBottom: "22px",
    color: "#4f46e5",
    fontWeight: 800,
    textDecoration: "none",
  },
  productDetail: {
    display: "grid",
    gridTemplateColumns: "minmax(280px, 0.9fr) minmax(320px, 1.1fr)",
    gap: "34px",
    alignItems: "start",
  },
  productImages: { ...panel, padding: "18px" },
  productMainImage: {
    width: "100%",
    height: "430px",
    objectFit: "contain",
    background: "#f8fafc",
    borderRadius: "10px",
  },
  thumbnails: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginTop: "12px" },
  thumbnail: {
    width: "100%",
    aspectRatio: "1",
    objectFit: "contain",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    padding: "6px",
  },
  productInfo: { ...panel, padding: "28px" },
  productCategory: {
    display: "inline-block",
    color: "#4f46e5",
    background: "#eef2ff",
    borderRadius: "999px",
    padding: "6px 12px",
    fontSize: "0.82rem",
    fontWeight: 800,
    textTransform: "capitalize",
  },
  productTitle: { margin: "16px 0 10px", color: "#0f172a", fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.08 },
  productMeta: { display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", color: "#64748b" },
  stars: { color: "#f59e0b", letterSpacing: 0 },
  ratingText: { color: "#64748b", fontWeight: 700 },
  stock: { color: "#15803d", fontWeight: 800 },
  productPrice: { margin: "22px 0 8px", color: "#312e81", fontSize: "2rem", fontWeight: 900 },
  discount: {
    display: "inline-block",
    color: "#be123c",
    background: "#ffe4e6",
    borderRadius: "8px",
    padding: "5px 9px",
    fontWeight: 900,
    fontSize: "0.85rem",
  },
  productDesc: { color: "#475569", lineHeight: 1.75, fontSize: "1rem" },
  addBtn: {
    ...buttonBase,
    background: "#4f46e5",
    color: "#fff",
    padding: "12px 18px",
    boxShadow: "0 10px 20px rgba(79, 70, 229, 0.2)",
  },
  addedBtn: {
    ...buttonBase,
    background: "#16a34a",
    color: "#fff",
    padding: "12px 18px",
  },
  productExtras: {
    marginTop: "24px",
    paddingTop: "18px",
    borderTop: "1px solid #e2e8f0",
    color: "#475569",
    lineHeight: 1.55,
  },
  reviews: { marginTop: "36px" },
  reviewsTitle: { color: "#0f172a", margin: "0 0 16px" },
  reviewsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" },
  reviewCard: { ...panel, padding: "18px" },
  reviewHeader: { display: "flex", justifyContent: "space-between", gap: "12px", color: "#172033" },
  reviewStars: { color: "#f59e0b", whiteSpace: "nowrap" },
  reviewBody: { color: "#475569", lineHeight: 1.6 },
  reviewDate: { color: "#94a3b8" },
  cartLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 360px)",
    gap: "24px",
    alignItems: "start",
    marginTop: "24px",
  },
  cartItems: { ...panel, padding: "18px" },
  cartRow: {
    display: "grid",
    gridTemplateColumns: "76px minmax(0, 1fr) auto auto auto",
    alignItems: "center",
    gap: "14px",
    padding: "14px 0",
    borderBottom: "1px solid #e2e8f0",
  },
  cartImage: { width: "76px", height: "76px", objectFit: "contain", background: "#f8fafc", borderRadius: "8px" },
  cartInfo: { minWidth: 0 },
  cartItemTitle: { margin: "0 0 4px", color: "#172033", fontWeight: 800 },
  cartItemPrice: { margin: 0, color: "#64748b" },
  qtyControls: {
    display: "grid",
    gridTemplateColumns: "32px 34px 32px",
    alignItems: "center",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    overflow: "hidden",
  },
  qtyBtn: { border: 0, background: "#f8fafc", color: "#172033", width: "32px", height: "32px", cursor: "pointer" },
  qtyNum: { textAlign: "center", fontWeight: 800, color: "#172033" },
  cartRowTotal: { margin: 0, color: "#172033", fontWeight: 900, whiteSpace: "nowrap" },
  removeBtn: {
    border: 0,
    borderRadius: "8px",
    background: "#fee2e2",
    color: "#b91c1c",
    width: "34px",
    height: "34px",
    cursor: "pointer",
  },
  orderSummary: { ...panel, padding: "22px", position: "sticky", top: "88px" },
  summaryTitle: { margin: "0 0 16px", color: "#0f172a" },
  summaryRow: { display: "flex", justifyContent: "space-between", gap: "12px", color: "#475569", marginBottom: "12px" },
  divider: { height: "1px", background: "#e2e8f0", margin: "16px 0" },
  checkoutBtn: {
    ...buttonBase,
    width: "100%",
    background: "#4f46e5",
    color: "#fff",
    padding: "12px 16px",
    marginTop: "12px",
  },
  continueBtn: {
    ...buttonBase,
    width: "100%",
    background: "#fff",
    color: "#4f46e5",
    border: "1px solid #c7d2fe",
    padding: "12px 16px",
    marginTop: "10px",
  },
  authPage: {
    minHeight: "calc(100vh - 64px)",
    display: "grid",
    placeItems: "center",
    padding: "32px 16px",
  },
  authCard: { ...panel, width: "min(100%, 440px)", padding: "32px", textAlign: "center" },
  authTitle: { margin: "12px 0 10px", color: "#0f172a", fontSize: "2rem", lineHeight: 1.1 },
  authSub: { margin: "0 0 22px", color: "#64748b", lineHeight: 1.6 },
  guestBtn: {
    ...buttonBase,
    width: "100%",
    background: "#4f46e5",
    color: "#fff",
    padding: "13px 18px",
  },
  authFooter: { margin: "18px 0 0", color: "#94a3b8", fontSize: "0.9rem" },
  field: {
    width: "100%",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    background: "#fff",
    padding: "11px 12px",
    color: "#172033",
    marginBottom: "10px",
  },
  contactLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(260px, 0.85fr) minmax(300px, 1fr)",
    gap: "28px",
    alignItems: "start",
  },
  contactInfo: { padding: "12px 0" },
  contactItem: { display: "flex", alignItems: "center", gap: "12px", marginTop: "16px" },
  contactForm: { ...panel, padding: "24px" },
  successBanner: {
    marginBottom: "16px",
    padding: "12px",
    color: "#166534",
    background: "#dcfce7",
    border: "1px solid #bbf7d0",
    borderRadius: "8px",
  },
  label: { display: "block", color: "#334155", fontWeight: 800, marginBottom: "6px" },
};

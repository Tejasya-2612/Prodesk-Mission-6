**ShopZone (Prodesk Mission 6)**

A modern React-based e-commerce web application built using Vite, featuring product browsing, cart management, protected routes, and user authentication flow.

**Overview**

ShopZone is a frontend-focused project that simulates a real-world online shopping platform. It demonstrates:

Component-based architecture
State management using Context API
Client-side routing with protected pages
Clean UI with responsive layout
✨ Features
🛒 Browse products
➕ Add to cart functionality
🔐 Authentication system (Context-based)
🚫 Protected routes (only logged-in users)
⚡ Fast performance with Vite
🔄 Dynamic navigation using React Router
🛠️ Tech Stack
Frontend
React.js (Hooks + Context API)
React Router DOM
Vite
Styling
CSS (custom styles)
Tooling
ESLint
Vite Dev Server
📂 Project Structure
ShopZone/
│
├── public/                # Static assets
├── src/
│   ├── App.jsx            # Main app routing
│   ├── main.jsx           # Entry point
│   ├── pages.jsx          # All pages (Home, Shop, etc.)
│   ├── components.jsx     # Reusable components
│   ├── context.jsx        # Auth & Cart Context
│   ├── ProtectedRoute.jsx # Route protection logic
│   ├── assets/            # Images/icons
│   └── index.css          # Global styles
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/Prodesk-Mission-6.git
cd Prodesk-Mission-6
2️⃣ Install Dependencies
npm install
3️⃣ Run the App
npm run dev

App will run on:

http://localhost:5173
🔐 Authentication Flow
User login state is managed using React Context
Protected routes restrict access to certain pages
Unauthorized users are redirected automatically
🛒 Cart System
Add/remove items from cart
Global cart state using Context API
Real-time updates across components
📸 Screens (Add these)

Add screenshots here for:

Home Page
Shop Page
Cart Page
Login Page
🚀 Deployment
Deploy using Vercel
Push code to GitHub
Go to Vercel
Import repository
Click Deploy
📌 Key Learnings
React Context API for global state
Protected routing in React
Component reusability
Structuring scalable frontend apps
🔮 Future Improvements
Backend integration (Node.js / Firebase)
Payment gateway integration
Product filtering & search
User profile & order history
🤝 Contributing

Feel free to fork this project and submit improvements.

👨‍💻 Author

Your Name
GitHub: https://github.com/your-username

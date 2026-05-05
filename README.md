#  ShopZone (Prodesk Mission 6)

A modern **React-based e-commerce web application** built using Vite, featuring product browsing, cart management, protected routes, and user authentication flow.

---

##  Overview

ShopZone is a frontend-focused project that simulates a real-world online shopping platform. It demonstrates:

* Component-based architecture
* State management using Context API
* Client-side routing with protected pages
* Clean UI with responsive layout

---
##  Vercel
https://prodesk-mission-6.vercel.app/

(The cart is currently managed using React Context (in-memory state).
When the page refreshes, the state is lost because it is not persisted anywhere.
In local development (VS Code), it may appear consistent due to hot reload behavior, but in production it resets.)

##  Features

*  Browse products
*  Add to cart functionality
*  Authentication system (Context-based)
*  Protected routes (only logged-in users)
*  Fast performance with Vite
*  Dynamic navigation using React Router

---

##  Tech Stack

### Frontend

* React.js (Hooks + Context API)
* React Router DOM
* Vite

### Styling

* CSS (custom styles)

### Tooling

* ESLint
* Vite Dev Server

---

##  Project Structure

```
ShopZone/
│
├── public/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── pages.jsx
│   ├── components.jsx
│   ├── context.jsx
│   ├── ProtectedRoute.jsx
│   ├── assets/
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

##  Cart System

* Add/remove items from cart
* Global cart state using Context API
* Real-time updates across components

---

## Screenshots
<img width="2501" height="1253" alt="image" src="https://github.com/user-attachments/assets/9fdd50f0-e776-4bc5-ab07-6388fa74ccff" />
<img width="2516" height="1274" alt="image" src="https://github.com/user-attachments/assets/7fc430ee-919b-470d-ab6a-69f49e00e0b8" />
<img width="2537" height="545" alt="image" src="https://github.com/user-attachments/assets/b72f9540-de14-49af-af99-dfc092083015" />
<img width="2517" height="836" alt="image" src="https://github.com/user-attachments/assets/a8d4c7fe-88ec-44c1-8a7e-4728960d0166" />

---

##  Key Learnings

* React Context API for global state
* Protected routing in React
* Component reusability
* Structuring scalable frontend apps

---

##  Author
A TEJASYA
P/IL/26/NOIDA/M1299
KLH UNIVERSITY  


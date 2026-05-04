# ShopZone – AI Prompts

This file documents the prompts I used while building the ShopZone project. The goal was to use AI as a development assistant, not just to generate code, but to structure the project and solve problems step by step.

---

## 1. Building the Full Application

I started by asking the AI to act like a senior React developer and generate a complete e-commerce frontend.

The app needed:

* React with functional components
* React Router for navigation
* Context API for global state
* LocalStorage for persistence

I also specified that it should behave like a real app, with multiple pages and proper routing (for example, navigating from `/shop` to `/product/:id`).

---

## 2. Keeping the Project Structure Simple

To avoid overcomplicating things, I asked the AI to limit the project to just six files:

* main.jsx
* App.jsx
* context.jsx
* pages.jsx
* components.jsx
* ProtectedRoute.jsx

This forced the solution to stay organized while still being easy to manage.

---

## 3. Fetching and Displaying Products

I used the dummyjson API as the data source.

The prompt focused on:

* Fetching product data
* Displaying it in a grid
* Showing basic details like image, title, and price
* Adding a search feature

I also made sure to include loading and error handling.

---

## 4. Handling Dynamic Routes

One important part was making the app feel real by using dynamic routing.

The idea was:

* Clicking a product takes you to `/product/:id`
* The page uses `useParams()` to get the ID
* Then it fetches and displays that specific product

---

## 5. Building the Cart System

I asked the AI to create a global cart using Context API.

The cart supports:

* Adding items
* Removing items
* Updating quantity
* Calculating total price

The goal was to avoid prop drilling and keep state accessible across all pages.

---

## 6. Persisting Data

To make the app more realistic, I added persistence using localStorage.

The cart:

* Loads from localStorage on startup
* Updates localStorage whenever changes are made

This ensures the cart doesn’t reset on refresh.

---

## 7. Adding Basic Authentication

Instead of a full backend, I implemented a simple login system.

The prompt included:

* A login page
* A “Login as Guest” button
* Storing login state globally

This was enough to simulate user flow.

---

## 8. Protecting Routes

I added a protected route for checkout.

The logic:

* If the user is not logged in → redirect to login
* If logged in → allow access

This was implemented using a custom ProtectedRoute component.

---

## 9. UI and Layout

The focus was on keeping the UI clean and usable:

* Responsive layout
* Simple product cards
* Clear navigation
* Basic hover effects

Nothing overly complex, just something functional and neat.

---

## 10. Error Handling

I made sure the app handles common issues:

* API failures
* Empty results
* Loading states

This helps make the app feel more complete.

---

## Final Note

This project was less about just generating code and more about guiding the process.

Each prompt focused on a specific part of the system, and together they helped build a complete React application with:

* Routing
* Global state management
* Authentication flow
* Data persistence

It also reflects how AI can be used as a structured development tool rather than just a code generator.

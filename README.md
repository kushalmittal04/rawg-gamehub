# 🎮 GameHub using RAWG API & Clerk

## 📌 Project Overview

This is a front-end web application built using **React**, designed to fetch and display game data from the [RAWG Video Games Database API](https://rawg.io/apidocs). It demonstrates the ability to build a **responsive**, **feature-rich**, and **user-authenticated** application using modern technologies.

### 🔧 Tech Stack
- React
- Redux Toolkit (for state management)
- Clerk Auth (for authentication)
- React-Bootstrap & Bootstrap
- Vanilla CSS

---

## 🚀 Features & Implementation

### 1. 🏠 Main Page Layout
- **Header**  
  - Site logo  
  - Real-time search bar  
  - "Library / Bookmarks" (for saved games, visible only to logged-in users)  
- **Sidebar (Left Panel)**  
  - Filters by category, tags, year, and popularity  
- **Game Grid**  
  - Game cards with image, title, ratings, tags, etc.

---

### 2. 🧮 Filtering System
Users can filter game results by:
- Categories
- Tags
- Release Year
- Popularity (rating)

---

### 3. 🔍 Real-Time Search
- Dynamic search bar to find games by name.
- Updates results live as the user types.

---

### 4. 📄 Pagination
- Efficient pagination to browse large game datasets.
- User-friendly navigation between pages.

---

### 5. 🎯 Game Detail Page
Clicking on a game opens a detail page showing:
- Game title
- Full description
- Screenshots
- Ratings
- System requirements
- Price info (if available)

---

### 6. 🔐 Authentication (Clerk)
- Integrated [Clerk Auth](https://clerk.dev/) for:
  - Sign-up
  - Login
  - Logout
- Bookmark/Library page is **only** accessible to signed-in users.

---

### 7. 🧠 State Management (Redux)
- Game listings, filters, and bookmarks are managed using Redux.
- Bookmarked games are persisted via `localStorage`.

---

## 📱 Responsive Design
- Mobile-first and fully responsive across all device sizes.
- Clean and creative layout with dark mode styling.

---

## ✅ Best Practices Followed
- React functional components and Hooks
- Organized component hierarchy
- Clean code, reusable logic, and readable structure
- Secure handling of API keys via `.env`

---

## 💡 Author

**Kushal Mittal**  
📧 Email: kushalmittal2022@gmail.com  
💼 LinkedIn: [linkedin.com/in/kushalmittal04](https://www.linkedin.com/in/kushalmittal04)  
🧑‍💻 GitHub: [@kushalmittal04](https://github.com/kushalmittal04)

---

## 🔗 Live Deployment

🌐 Live Demo:  
- [Link 1 (main deployment)](https://rawg-gamehub-mwjs.vercel.app/)
- [Link 2 (branch deployment)](https://rawg-gamehub-mwjs-git-main-kushal-mittals-projects.vercel.app/)  

---
## 📂 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/kushalmittal04/rawg-gamehub
cd rawg-gamehub

# Install dependencies
npm install

# Additionally install essential packages
npm install react-router-dom react-redux bootstrap @reduxjs/toolkit @clerk/themes @clerk/clerk-react react-bootstrap react-icons

# Add your own API keys in a .env file at the root:
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
VITE_RAWG_API_KEY=your_rawg_api_key_here

# Run the application locally
npm run dev

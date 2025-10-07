# Next.js + Express Todo App

A full-stack Todo application built with **Next.js (App Router)** for frontend and **Express + MongoDB** for backend. Styled with **Tailwind CSS** and uses **React Toastify** for notifications.

---

## Features

- Add, delete todos
- Fetch todos from backend API
- Dark mode styling with Tailwind
- React Toastify notifications
- Fully responsive layout
- Easy to extend with edit/toggle functionality

---

## Tech Stack

- Frontend: Next.js, React, Tailwind CSS, React Toastify
- Backend: Express.js, MongoDB, Mongoose
- Deployment Ready

---

## Folder Structure

frontend/
┣ app/
┃ ┣ layout.js
┃ ┣ page.js # Home page
┃ ┗ todos/page.js # Todos page
┣ globals.css
┣ package.json
┗ node_modules/

backend/
┣ models/todo.js
┣ routes/todoRoutes.js
┣ server.js
┣ package.json
┗ node_modules/
---

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev    # or node server.js

cd frontend/client
npm install
npm run dev
Frontend runs on http://localhost:3000

Backend runs on http://localhost:5000 (default)


Notes

Make sure MongoDB is running locally or provide a connection string in .env

Node modules are excluded from GitHub

Extendable for toggling, editing, drag & drop features


---

## **Step 7: Optional — Create GitHub Tags/Release**

```bash
git tag v1.0.0
git push origin v1.0.0
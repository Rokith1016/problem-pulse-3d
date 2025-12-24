# 🌍 Problem Pulse 3D

Problem Pulse 3D is a full-stack civic technology platform that allows citizens to report public issues using a modern 3D map-based interface.  
The platform aims to improve transparency, citizen participation, and efficient communication between the public and authorities.

---

## 🧩 Problem Statement

In many cities, public issues such as potholes, broken streetlights, waste accumulation, and drainage problems are reported through inefficient or outdated systems.  
This leads to delayed responses, lack of visibility, and poor accountability.

---

## 💡 Solution Overview

Problem Pulse 3D provides a digital solution where:
- Citizens can register and securely log in
- Report problems with location and images
- Visualize issues on an interactive 3D map
- Understand civic responsibilities through an information page
- Interact with a chatbot for guidance

---

## ✨ Key Features

- 🔐 Secure authentication (JWT-based)
- 🧭 Civic Information Page (Government & citizen awareness)
- 📍 Location-based problem reporting
- 🗺️ Interactive 3D map visualization
- 📷 Image upload support
- 🤖 Integrated chatbot assistant
- 🪟 Glassmorphism & modern UI
- 🌍 Globe-style background for login/register

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- MapLibre GL
- Axios
- CSS (Glassmorphism design)

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- Multer (Image upload)

---

## 🏗️ System Architecture

### Frontend
- Login & Register pages with globe background
- Civic Information page
- Dashboard & 3D Map view
- Report Problem form
- Floating chatbot

### Backend
- Authentication APIs
- Problem reporting APIs
- Protected routes using middleware
- MongoDB for data storage

---

## ▶️ How to Run the Project

### Backend
```bash
cd backend
npm install
node index.js

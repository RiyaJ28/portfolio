<h1 align="center">✨ MERN Portfolio with Live Admin Panel ✨</h1>

<p align="center">
  <i>A fully customizable portfolio website built with the MERN stack — update your skills, projects, and personal info instantly from a secure admin panel!</i>
</p>

<p align="center">
  <a href="https://portfolio-6298.onrender.com/"><img src="https://img.shields.io/badge/Live%20Demo-Click%20Here-brightgreen?style=for-the-badge" alt="Live Demo"></a>
  <a href="https://github.com/RiyaJ28/portfolio"><img src="https://img.shields.io/badge/Source%20Code-GitHub-blue?style=for-the-badge" alt="GitHub Repo"></a>
</p>

---

## 📸 Preview
<p align="center">
  <img src="assets/preview-home.png" alt="Portfolio Home Preview" width="80%">
</p>

---

## 🚀 Features

- **🛠 Admin Panel**
  - Secure login with JWT authentication.
  - Add, edit, or delete:
    - 🖋 About section & name
    - 🧠 Skills
    - 💼 Projects (with images & links)
  - Instant updates on the live site (no redeployment!).

- **💻 Frontend**
  - Built with **React.js** + modern UI styling.
  - Responsive design for all devices.
  - Smooth animations & user-friendly navigation.

- **⚙️ Backend**
  - **Node.js** + **Express.js** for REST API.
  - **MongoDB** (Mongoose) for data storage.
  - Multer integration for image uploads.

---

## 🛠 Tech Stack

| Category      | Technologies |
|---------------|--------------|
| **Frontend**  | React.js, React Router, CSS/Tailwind |
| **Backend**   | Node.js, Express.js |
| **Database**  | MongoDB (Mongoose) |
| **Auth**      | JWT |
| **Hosting**   | Render.com |

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/RiyaJ28/portfolio.git
cd portfolio

# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install

---

## ⚙️ Environment Variables

In `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=optional_if_using
---
```
##  ▶️ Running the App
```
# Start the backend server
cd backend
npm run dev

# Start the frontend (in a new terminal)
cd frontend
npm start

```
Once both servers are running:

🌐 Frontend: http://localhost:3000

🔑 Admin Panel: http://localhost:3000/admin
---
🔑 Admin Panel Usage
Login with your admin credentials.
Use the interface to add, edit, or delete:
<ul>
  <li>🧠 Skills</li>
  <li>💼 Projects</li>
  <li>🖋 About section</li>
  <li>🙋‍♂️ Name or personal info</li>
</ul>
Instant updates — changes appear on the live website without redeployment.

## 🌟 Live Demo
# Live Portfolio Website
https://portfolio-6298.onrender.com/

# GitHub Repository
https://github.com/RiyaJ28/portfolio
---
## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

<p align="center"> <b>💡 Pro Tip:</b> Fork this project and make it your own dynamic portfolio in minutes! </p> <p align="center"> Made with ❤️ using MERN Stack </p> 


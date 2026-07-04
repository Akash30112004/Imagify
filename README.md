# 🎨 Imagify

> An AI-powered image generation platform built with the MERN stack, allowing users to transform text prompts into high-quality images using the Clipdrop AI API. The application features secure authentication, a credit-based generation system, and Razorpay payment integration.

---

# 📸 Project Screenshots

Explore the key features and user experience of **Imagify**, an AI-powered text-to-image generation platform.

---

## 🏠 Home Page

A modern landing page introducing Imagify with an elegant interface, AI-powered image generation, and responsive design.

![Home Page](assets/home-page.png)

---

## 🔐 Secure Authentication

Secure Login and Signup using JWT Authentication with protected routes and user session management.

![Login Page](assets/login-page.png)

---

## 🎨 AI Image Generation

Generate stunning AI-powered images by simply entering a text prompt. Images are created using the Clipdrop Text-to-Image API.

![Image Generation](assets/image-generation.png)

---

## 🖼 Generated Image

Preview and download high-quality AI-generated images directly from the application.

![Generated Image](assets/generated-image.png)

---

## 💳 Credit Purchase

Purchase additional image generation credits securely through Razorpay payment integration.

![Buy Credits](assets/buy-credits.png)

---

# ✨ Features

## 🎨 AI Image Generation

- Generate images from text prompts
- High-quality AI-generated images
- Download generated images
- Fast AI response using Clipdrop API

---

## 🔐 Authentication

- Secure Login & Signup
- JWT Authentication
- Protected Routes
- User Profile Management

---

## 💳 Credit System

- Credit-based image generation
- Razorpay payment integration
- Credit balance management
- Secure online payments

---

## 🎨 User Experience

- Modern responsive interface
- Smooth page transitions
- Clean and intuitive design
- Mobile-friendly layout

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router

## Backend

- Node.js
- Express.js
- JWT Authentication

## Database

- MongoDB Atlas
- Mongoose

## APIs & Services

- Clipdrop Text-to-Image API
- Razorpay Payment Gateway

---

# 🏗 Architecture

```text
                    User
                      │
                      ▼
            React + Vite Frontend
                      │
             REST API (Express.js)
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
   MongoDB Atlas          Clipdrop AI API
          │
          ▼
 Razorpay Payment Gateway
```

---

# 📂 Folder Structure

```text
Imagify
│
├── client
│   ├── src
│   ├── components
│   ├── pages
│   ├── context
│   ├── assets
│   └── utils
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── utils
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Akash30112004/Imagify.git
```

---

## Backend Setup

```bash
cd server
npm install
npm start
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** directory.

```env
MONGODB_URI=

JWT_SECRET=

CLIPDROP_API_KEY=

RAZORPAY_KEY_ID=

RAZORPAY_KEY_SECRET=
```

Create a `.env` file inside the **client** directory.

```env
VITE_BACKEND_URL=
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/user/register` | Register User |
| POST | `/user/login` | Login User |
| GET | `/user/credits` | Fetch User Credits |
| POST | `/image/generate-image` | Generate AI Image |

---

# 🤖 AI Workflow

```text
User Prompt
      │
      ▼
React Frontend
      │
      ▼
Express Backend
      │
      ▼
Clipdrop AI API
      │
      ▼
Generated Image
      │
      ▼
Download Image
```

---

# 🚀 Performance Highlights

- AI-powered text-to-image generation
- Secure JWT Authentication
- Credit-based usage system
- Razorpay payment integration
- Responsive UI across devices
- Optimized API communication
- Fast image generation workflow

---

# 🧠 Challenges Faced

- Integrating the Clipdrop AI API.
- Managing secure credit deduction.
- Handling asynchronous image generation requests.
- Implementing secure authentication using JWT.
- Integrating Razorpay payment flow.

---

# 📚 What I Learned

- Working with AI-powered APIs.
- Building scalable MERN applications.
- Managing authentication using JWT.
- Secure payment gateway integration.
- MongoDB data modeling.
- REST API development with Express.

---

# 🗺 Roadmap

- [ ] Image Generation History
- [ ] AI Image Variations
- [ ] Image Upscaling
- [ ] Prompt Templates
- [ ] Favorite Images
- [ ] Download History
- [ ] Dark Mode
- [ ] AI Style Presets

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Akash Singh**

- GitHub: https://github.com/Akash30112004
- LinkedIn: *(Add your LinkedIn Profile)*

---

⭐ If you found this project helpful, consider giving it a star.

# 🚀 Project Setup Guide

This project is a Next.js application powered by Clerk authentication, MongoDB, Inngest, and Cloudinary.

---

## 🧩 Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```
NEXT_PUBLIC_CURRENCY=$
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
MONGODB_URI=
INNGEST_SIGNING_KEY=
INNGEST_EVENT_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 4. Run the Development Server

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

---

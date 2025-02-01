# Landmarker: Property Listing App 🏠

A modern, full-stack property listing application built with **Next.js**, **TypeScript**, **Prisma**, **Supabase**, **React Hook Form**, **Zod**, and **Kinde**. This app allows users to browse, list, and manage properties easily.

## Screenshots 🖼️ 

 ### 1. Home Page:
   
 <kbd>![Home Page](https://github.com/user-attachments/assets/99b7fb1b-7b23-4fbf-9d5d-33221a01536e)</kbd>

 ### 2. Property Details Page:

 <kbd>![Property Details Page](https://github.com/user-attachments/assets/ddcb3bda-bc7d-4f80-a195-7c0c998ab6d8)<kbd>

 ###  3. User Profile Page:

 <kbd>![User Profile Page](https://github.com/user-attachments/assets/c5c37611-f124-47d6-b1f8-901e6ffdebbd)<kbd>

 ###  4. Property Listing Page:

<kbd>![Property Listing Page](https://github.com/user-attachments/assets/9a893a59-a5d1-478c-a781-2c69d321578b)<kbd>

 ### 5. Add/Edit Property Page**

 <kbd>![Add/Edit Property Page](https://github.com/user-attachments/assets/9037dd43-30d5-4c9a-8d61-2639efd92ca4)<kbd>


## Features ✨

- **User Authentication**: Secure authentication powered by **Kinde**.
- **Property Listings**: Create, read, update, and delete property listings.
- **Form Validation**: Robust form handling with **React Hook Form** and **Zod**.
- **Database**: Managed with **Prisma** and **Supabase** for seamless data storage.
- **Type Safety**: Full TypeScript support for a type-safe development experience.

## Tech Stack 🛠️

- **Frontend**: Next.js, TypeScript, Tailwind CSS 
- **Backend**: Next.js API Routes & Server Actions
- **Database**: Supabase (PostgreSQL) with Prisma ORM
- **Authentication**: Kinde
- **Form Management**: React Hook Form with Zod validation
- **Deployment**: Vercel (recommended)

## Getting Started 🚀

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Kinde account

### Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/your-username/property-listing-app.git
   cd property-listing-app
   
2. **Install dependencies**:
   ```
   npm install

3. **Set up environment variables**:<br/>
   Create a .env file in the root directory and add the following variables:
   ```
   DATABASE_URL="your-supabase-database-url"
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   KINDLE_CLIENT_ID="your-kinde-client-id"
   KINDLE_CLIENT_SECRET="your-kinde-client-secret"
   KINDLE_REDIRECT_URI="http://localhost:3000/auth/callback"

4. **Run database migrations**:
   ```
   npx prisma migrate dev --name init

5. **Start the development server**:
   ```
   npm run dev

# Contributing 🤝

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. **Fork the repository.**
   
2. **Create a new branch:**
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes:**
   ```sh
   git commit -m 'Add some feature'
   ```
4. **Push to the branch:**
   ```sh
   git push origin feature/your-feature-name
   ```
5. **Open a pull request.**

Thank you for your contributions! 🎉

# Notes App 📝

A simple, secure, and organized notes application to help you manage your thoughts and important tasks. Users can register, log in, and create, edit, update, and delete notes. The app offers a clean UI and ensures your notes are safe and easy to access.

![Notes App Screenshots](https://github.com/prabhjot2001/notes-app/blob/version-1/preview/image%20(6).png)

![Notes App Screenshots](https://github.com/prabhjot2001/notes-app/blob/version-1/preview/image%20(2).png)

![Notes App Screenshots](https://github.com/prabhjot2001/notes-app/blob/version-1/preview/image%20(3).png)

![Notes App Screenshots](https://github.com/prabhjot2001/notes-app/blob/version-1/preview/image%20(6).png)

![Notes App Screenshots](https://github.com/prabhjot2001/notes-app/blob/version-1/preview/image%20(7).png)

![Notes App Screenshots](https://github.com/prabhjot2001/notes-app/blob/version-1/preview/image%20(8).png)

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Project Setup](#project-setup)
4. [API Endpoints](#api-endpoints)
5. [Screenshots](#screenshots)
6. [Contributing](#contributing)

## Features
- **User Authentication**: Users can register and log in securely.
- **Create & Manage Notes**: Add, update, view, and delete notes.
- **Responsive Design**: Accessible across desktop, tablet, and mobile devices.
- **Dark Mode**: Switch between light and dark mode for better readability.
- **Protected Routes**: Ensure authenticated access to the note management features.
- **Sorting & Organization**: Easily sort and organize your notes.

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Router
- Context API
- Toast notifications

### Backend
- **Bun** (instead of Node.js)
- **Express.js**
- **MariaDB** (via Prisma ORM)
- **argon2** for password hashing
- **JWT** for authentication

## Project Setup

**Follow these instructions to get the app running locally:**

**Backend Setup**
Install dependencies for Bun in the server folder:


- `cd server`
- `bun install`

Create the .env file inside the server folder:
```
DATABASE_URL="mysql://user:password@localhost:3306/your-database-name"
JWT_SECRET="your-secret-key"
PORT=5000

```

Prisma Setup: Run the following commands to set up Prisma and the database:


- `npx prisma migrate dev --name init`
- `npx prisma generate`


**Run the Backend:**
`bun run index.ts`
The backend should now be running at http://localhost:5000.

**Frontend Setup**
Navigate to the client folder and install the dependencies:


- `cd client`
- `npm install`


Create a .env file in the client folder and add:

REACT_APP_SERVER_URL=http://localhost:5000
Run the frontend development server:


- `npm run dev` or 
- `bun dev`(only if bun is installed)

The frontend should now be running on http://localhost:5173.

**Running the Application**

Visit http://localhost:5173 in your browser. You can create an account or log in to start managing your notes.
API Endpoints

### Authentication
**User Routes**

`POST /api/user/register`: Register a new user.

`POST /api/user/login`: Log in an existing user.

### Notes
**Notes Routes**

`GET /api/notes/user/:id`: Get all notes for the authenticated user.

`GET /api/notes/:id`: Get a specific note by its ID.

`POST /api/notes/`: Create a new note.

`PATCH /api/notes/:id`: Update an existing note.

`DELETE /api/notes/:id`: Delete a note by its ID.


### Middleware
`VerifyUser`: Ensures the user is authenticated via JWT before accessing the notes routes.

### Prerequisites
- [Bun](https://bun.sh/)
- [MariaDB](https://mariadb.org/)
- Prisma CLI (`npm install prisma --save-dev`)

### Clone the Repository
```bash
git clone https://github.com/prabhjot2001/notes-app.git
cd notes-app

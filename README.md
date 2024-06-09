# ChatterBox

## MERN Stack Chat Application

This is a real-time chat application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack with Socket.IO for real-time communication and Bootstrap for styling. The application includes user authentication with JWT and features like creating and joining chat rooms, sending messages, and editing user profiles.

## Features

- User authentication (register, login, logout)
- Create and join chat rooms
- Real-time messaging with Socket.IO
- Edit user profile (username and bio)
- Responsive design with Bootstrap 5

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14 or higher)
- MongoDB

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aymenidou/ChatterBox.git
   cd ChatterBox
   ```

2. **Install server dependencies:**

    ```bash
    cd server
    npm install
    ```

3. **Install client dependencies:**

    ```bash
    cd ../client
    npm install
    ```

4. **Configure environment variables:**

Create a .env file in the server directory with the following content:

    PORT=5000
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_secret_key

5. **Start the MongoDB server:**

    ```bash
    mongod
    ```

6. **Start the Node.js server:**

    ```bash
    cd server
    npm start
    ```
7. **Start the React client:**

    ```bash
    cd ../client
    npm start
    ```
The application should now be running on http://localhost:3000.

## Project Structure
    bash
    ChatterBox/
    ├── client/           # React front-end application
    │   ├── public/
    │   └── src/
    │       ├── components/
    │       │   ├── Chat.js
    │       │   ├── Login.js
    │       │   ├── Register.js
    │       │   └── UserModal.js
    │       ├── App.js
    │       ├── index.js
    │       └── axiosInstance.js
    ├── server/           # Express.js back-end application
    │   ├── controllers/
    │   │   ├── auth.js
    │   │   └── chat.js
    │   ├── models/
    │   │   ├── Room.js
    │   │   └── User.js
    │   ├── routes/
    │   │   ├── auth.js
    │   │   └── chat.js
    │   ├── config/
    │   │   └── db.js
    │   ├── middleware/
    │   │   └── auth.js
    │   ├── .env
    │   ├── server.js
    │   └── config.js
    └── README.md

## Usage
    ### Register
        1. Navigate to http://localhost:3000/register.
        2. Fill in the registration form and submit.
    ### Login
        Navigate to http://localhost:3000/login.
        Fill in the login form and submit.
    Chat
        After logging in, you will be redirected to the chat interface.
        Create a new room or join an existing room.
        Start chatting in real-time!
    Edit Profile
        Click the "Edit Profile" button.
        Update your username and bio in the modal.
## Technologies Used
- **Frontend :**
    - React.js
    - Bootstrap 5
    - Axios
    - React Router

- **Backend :**
    - Node.js
    - Express.js
    - MongoDB
    - Mongoose
    - JWT (JSON Web Tokens)
    - Socket.IO

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.


Developed by [Aymen Idouahman](https://github.com/aymenidou)

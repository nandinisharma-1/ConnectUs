# ConnectUs
ConnectUs is a full stack real-time chatting app built with React.js, Node.js, Express.js, and MongoDB. It uses Socket.IO for instant communication, JWT for authentication, and bcrypt for secure password storage. User data is encrypted, ensuring privacy and security.The app leverages Socket.IO to establish low-latency, bi-directional connections, ensuring that messages are delivered instantly without page refreshes. It supports both one-to-one and group conversations, making it suitable for personal as well as collaborative communication.

The frontend is developed using React.js, which delivers a responsive, interactive, and user-friendly interface. React components ensure a smooth user experience with dynamic updates, while styling libraries such as CSS can be used for an appealing design. API requests from the client are managed using Fetch API, maintaining efficient communication with the server.

On the backend, the application is powered by Node.js and Express.js, which handle API routes, authentication, and socket connections. Security is a core focus: user authentication is implemented using JWT (JSON Web Tokens), while bcrypt.js is used to hash and store passwords securely. This ensures that sensitive credentials are never stored in plain text.

The database layer uses MongoDB, a NoSQL database well-suited for handling real-time applications. User details, chat messages, and group data are stored in an encrypted format to protect privacy. With the help of Mongoose, schemas are defined to organize data effectively and enable smooth interactions between the application and database.

Key Features

✅ User Authentication & Authorization – Secure signup/login with encrypted password storage (bcrypt + JWT).

✅ Real-Time Messaging – One-to-one and group chat functionality with Socket.IO.

✅ Message Persistence – Chat history stored in MongoDB, retrievable on login.

✅ User Status – Online/offline presence indication.

✅ Secure Data Storage – Encrypted storage of sensitive user details in MongoDB.

✅ Scalable Architecture – Supports multiple concurrent users with efficient socket management.

Future improvements may include media sharing, notifications, friend management, and cloud deployment. Overall, ConnectUs demonstrates the power of the MERN stack in building a secure, scalable, and real-time communication platform.

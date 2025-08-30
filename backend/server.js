const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const colors = require("colors"); // if you are using colors for console logs

// Load environment variables
dotenv.config();

// Connect Database


const app = express();

// Middleware to accept JSON
app.use(express.json());

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// -------------------------- Deployment ------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// -------------------------- Deployment ------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

// PORT fallback (so it doesn’t stay undefined)
const PORT = process.env.PORT || 5000;
console.log("MONGO_URI from env:", process.env.MONGO_URI);
console.log("PORT from env:", process.env.PORT);
connectDB();
// Start Server
const server = app.listen(
  PORT,
  console.log(`🚀 Server running on PORT ${PORT}...`.yellow.bold)
);

// -------------------------- Socket.io ------------------------------

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("✅ Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.userData = userData; // save userData in socket object
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("📌 User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    const chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("⚠️ chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("❌ USER DISCONNECTED");
    if (socket.userData?._id) {
      socket.leave(socket.userData._id);
    }
  });
});
// Create server and with who connected
const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

// To save each user connect with your socketId
let users = [];

// To save only one userId for user
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// Remove user of list of user connect
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// Get user of list of users connect
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

// Create io conection
io.on("connection", (socket) => {
  // Connect user
  console.log("a user connected.");

  // Take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    // User that receive the message
    const user = getUser(receiverId);

    // Send the Id of user that send a message with the message
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // Disconnect user
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

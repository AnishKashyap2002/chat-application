const express = require("express");

const app = express();

const cors = require("cors");

require("dotenv").config();

const {
    getByUsername,
    addUser,
    getUser,
    getUsers,
    deleteUser,
    users,
} = require("./users");

app.use(cors());

const http = require("http");

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.WEBSITE_URL,
        methods: ["GET", "POST"],
    },
});

// const io = require("socket.io")(http);

io.on("connection", (socket) => {
    socket.on("joined", ({ name, room }) => {
        const user = addUser(socket.id, name, room);
        console.log("all users", users);
        if (!user) {
            return;
        }
        socket.join(user.room);
        io.in(room).emit("new-user", `${user.name} Entered The Chat`);
        io.in(room).emit("users", getUsers(room));
    });

    socket.on("username-taken", (data) => {
        console.log(data);
        const decision = getByUsername(data);
        console.log("this decision", decision);
        if (decision) {
            socket.emit("is-username-taken", { taken: true });
        } else {
            socket.emit("is-username-taken", { taken: false });
        }
    });

    socket.on("send-message", (data) => {
        const user = getUser(socket.id);

        // socket.broadcast.emit("receive-message", data);

        io.in(user.room).emit("message", { user: user.name, text: data });
    });
    socket.on("disconnect", () => {
        console.log("User disconnected");
        const user = deleteUser(socket.id);
        if (user) {
            io.in(user.room).emit("notification", `${user.name} left the Room`);
            io.in(user.room).emit("users", getUsers(user.room));
        }
    });
});

app.use("/", (req, res) => {
    res.json({ message: "Server running :)" });
});

const port = process.env.PORT || 5001;

server.listen(5001, () => console.log("Server is running"));

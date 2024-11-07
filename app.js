const express = require('express');
const app = express();
const path = require("path");

const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", function (socket) {
    socket.on("send-location", function (data) {
        io.emit("recieve-location", {id: socket.id, ...data});
    });
    
    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id);
    });
});

app.get("/", function (req, res) {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});



// const express = require('express');
// const app = express();
// const path = require("path");

// const http = require("http");

// const socketio = require("socket.io");
// const server = http.createServer(app);
// const io = socketio(server);

// app.set("view engine", "ejs");
// app.set(express.static(path.join(__dirname,'public')));

// io.on("connection", function (socket) {
//     console.log("connected");
// });

// app.get("/",function(req,res){
//     // res.sendFile(path.join(__dirname, 'public', 'index.ejs'));
//     res.render("index");
// });

// server.listen(3000);
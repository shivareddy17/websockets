"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 3021 });
let users = 0;
let arr = [];
ws.on("connection", (socket) => {
    arr.push(socket);
    users++;
    console.log("connected" + users);
    socket.send("sent by server" + users);
    socket.on('message', (e) => {
        for (let i = 0; i < arr.length; i++) {
            const s = arr[i];
            s.send(e.toString() + " Sent by user");
        }
        // socket.send(e.toString()+ "Sent by user")
    });
});

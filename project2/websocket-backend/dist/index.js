"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({ port: 3021 });
let users = 0;
let arr = [];
try {
    ws.on("connection", (socket) => {
        //arr.push(socket)
        users = arr.length + 1;
        //console.log("connected"+users)
        // socket.send("sent by server"+users)
        socket.on('message', (message) => {
            var _a;
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.type === "join") {
                console.log("Joining room" + parsedMessage.payload.roomId);
                arr.push({
                    socket,
                    room: parsedMessage.payload.roomId
                });
            }
            if (parsedMessage.type === "chat") {
                let currentRoom = (_a = arr.find((x) => x.socket === socket)) === null || _a === void 0 ? void 0 : _a.room;
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].room === currentRoom) {
                        arr[i].socket.send(parsedMessage.payload.message);
                    }
                }
            }
            // for(let i=0;i<arr.length;i++){
            //     const s=arr[i]
            //     s.send(e.toString()+ " Sent by user")
            // }
            // socket.send(e.toString()+ "Sent by user")
        });
        socket.on("close", () => {
            arr = arr.filter((x) => x.socket !== socket);
            console.log("Client disconnected");
        });
        console.log("connected" + users);
    });
}
catch (e) {
    console.log(e);
}

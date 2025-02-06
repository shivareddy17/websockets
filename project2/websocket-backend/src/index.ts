import { WebSocketServer,WebSocket } from "ws";

const ws =new WebSocketServer({port:3021});
let users=0;
interface user{
    socket:WebSocket,
    room:string
}

let arr:user[]=[]
try{
ws.on("connection",(socket)=>{
    //arr.push(socket)
    users=arr.length+1;
    //console.log("connected"+users)


   // socket.send("sent by server"+users)

    socket.on('message',(message)=>{
        const parsedMessage=JSON.parse(message as unknown as string)
        if(parsedMessage.type==="join"){
            console.log("Joining room"+parsedMessage.payload.roomId)
            arr.push({
                socket,
                room:parsedMessage.payload.roomId
            }
            )
        }


        if(parsedMessage.type==="chat"){
            let currentRoom=arr.find((x)=>x.socket===socket)?.room

            for(let i=0;i<arr.length;i++){
                if(arr[i].room===currentRoom){
                    arr[i].socket.send(parsedMessage.payload.message)
                }
            }
        }
        // for(let i=0;i<arr.length;i++){
        //     const s=arr[i]
        //     s.send(e.toString()+ " Sent by user")
        // }
       // socket.send(e.toString()+ "Sent by user")
    })
    socket.on("close", () => {
        arr = arr.filter((x) => x.socket !== socket);
        console.log("Client disconnected");
    });
    
    
    console.log("connected"+users)
})}catch(e){
    console.log(e)
}
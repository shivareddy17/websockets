import { WebSocketServer } from "ws";

const wss=new WebSocketServer({port:3020})

wss.on("connection",function(socket){
    console.log("connected")
    socket.send('hi')
    // setInterval(
    //     ()=>{
    //         socket.send(`the price of solana is`+Math.random())
    //     },500
    // )
    
    socket.on("message",(e)=>{
        console.log(e.toString())
        if(e.toString()==='ping'){
            socket.send('pong')
        }
    })
})
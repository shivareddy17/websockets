import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState(["hello", "hi"]);
  const wsref = useRef<WebSocket | null>(null);
  const inputref=useRef<HTMLInputElement|null>(null)

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3021");
    wsref.current = ws;
    ws.onmessage = (message) => {
      setMessages((m) => [...m, message.data]);
    };
    ws.onopen=()=>{
    ws.send(JSON.stringify({
      "type":"join",
      "payload":{
        "roomId":"red"
      }
    }))
  }
    return ()=>{
      ws.close()
    }
  },[]);
  return (
    <>
      <div className="w-screen h-screen bg-black m-0">
        <div className="w-screen h-9/10 p-2">
          {messages.map((mes) => (
            <div className="m-8">
              <span className="bg-white p-3 rounded-xl">{mes}</span>
            </div>
          ))}
        </div>
        <div className="w-[95%] bg-white h-1/10 rounded-lg flex justify-between items-center mx-4">
          <input
            type="text"
            placeholder="something"
            ref={inputref}
            className="w-8/10 h-full text-3xl m-1 border-none outline-none"
          />
          <button className="w-[15%] h-9/10 rounded-xl bg-blue-500 m-1 p-1 text-xl"onClick={()=>{
            wsref.current?.send(JSON.stringify({
              "type":"chat",
              "payload":{
                "message":inputref.current?.value
              }
            }))
          }}>
            send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

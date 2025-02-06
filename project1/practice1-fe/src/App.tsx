import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [socket, setSocket] = useState()
  const [msg, setMsg] = useState()

  const inputref=useRef<HTMLInputElement>()
  function sendMessage(){
    const msg=inputref.current?.value;
    if(!socket){
      return
    }
    socket.send(msg)
    console.log(msg)
}

useEffect(()=>{
  const ws=new WebSocket('ws://localhost:3020')
    setSocket(ws);
ws.onmessage=(ev)=>{
 alert(ev.data)
 setMsg(ev.data)
}

},[])
  

 

  return (
    <>
      <div>
        {msg}
        <input ref={inputref} type="text" placeholder={'message..'}/>

        <button onClick={sendMessage} >submit</button>
      </div>
    </>
  )
}

export default App

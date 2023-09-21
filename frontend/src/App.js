import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";
import CardComponent from "./CardComponent";

const socket = io("http://localhost:5000", { transports: ["websocket"] }); // Replace with your backend listener URL

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Listen for the 'savedData' event from the backend
    socket.on("savedData", (newData) => {
      setData(newData);
    })

    // Clean up the socket connection when the component unmounts
    // return () => {
    //   socket.disconnect();
    // };
  }, []);
  console.log("uuuu", data.upsertRes.data);
  return (
    <div className="App">
      
      <CardComponent data={data} />
    </div>
  );
}

export default App;

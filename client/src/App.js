import { useEffect, useState } from "react";
import useSocket from "./hooks/useSocket";

const App = () => {
  const [socket, isSafe, runSafe, connected] = useSocket({
    options: {
      autoConnect: true,
      withCredentials: true,
    }
  });

  const [clicks, setClicks] = useState(0);
  const [online, setOnline] = useState(0);

  useEffect(() => {
    // This should be a safe way to attach events to the socket
    if (!isSafe()) return;

    socket.emit("ready", ({
      clicks = 0,
      online = 0,
    }) => {
      setClicks(clicks);
      setOnline(online);
    });

    socket.on("clicks_change", (newValue) => {
      setClicks(newValue);
    });

    socket.on("online_change", (newValue) => {
      setOnline(newValue);
    });
  }, [socket, connected]);

  useEffect(() => {
    console.log(socket);
  })

  const handleClick = () => runSafe((socket, safe) => {
    socket.emit('click');
  });

  return (<div>
    {isSafe() ? null : <p>Connecting to socket, please wait.</p>}
    <p>Online: {online}</p>
    <p>Clicks: {clicks}</p>
    <button onClick={handleClick}>Click to add to the count</button>
  </div>);
};

export default App;
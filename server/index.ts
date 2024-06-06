import { createServer } from "https";
import { Server } from "socket.io";
import { readFileSync } from "fs";

const server = createServer({
  key: readFileSync('key.pem'),
  cert: readFileSync('cert.pem')
});

const port = 3000;
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const stringArray = [
  "당연하지!",
  "싫은데?",
  "고민해볼게",
  "나중에^^",
  "좋은 생각인걸",
];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("client-msg", (msg) => {
    console.log("message: " + msg);
    const randomIndex = Math.floor(Math.random() * stringArray.length);
    socket.emit("server-msg", stringArray[randomIndex]);
  });
  const intervalSend = () => {
    setTimeout(() => {
      socket.emit("server-msg", "놀아주세요");
      intervalSend();
    }, Math.floor(Math.random() * 300000) + 10000);
  };
  intervalSend();
  socket.on("disconnect", (reason) => {
    console.log("disconnect: ", reason);
  });
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

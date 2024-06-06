import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button, CssBaseline, Input, Typography, styled } from "@mui/material";
import MsgShow from "./components/MsgShow";
import { useEffect, useState } from "react";
import { socket } from "./util/socket";



export default function App() {
  const [msg, setMsg] = useState("");
  const [data, setData] = useState<{ user: "c" | "s"; msg: string }[]>([]);
  const [socketOn, setSocketOn] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
      setSocketOn(true);
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("server-msg", (msg) => {
        setData([...data, { user: "s", msg: msg }]);
      });
      return () => {
        socket.off("disconnect-server");
        socket.off("server-msg");
        socket.off("client-msg");
        socket.off("disconnect");
        socket.off("connect");
      };
    }
  }, [data]);

  return (
    <>
      <CssBaseline />
      <Page>
        <MsgShow data={data} />
        <Right>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              socket.emit("client-msg", msg);
              setData([...data, { user: "c", msg: msg }]);
            }}
          >
            <Input
              placeholder="메시지 전송"
              onChange={(e) => {
                setMsg(e.target.value);
              }}
              value={msg}
            />
            <Button type="submit">
              <Typography>전송</Typography>
            </Button>
          </Form>
          <Button
            onClick={() => {
              if (socketOn) {
                socket.on("disconnect-server", () => {
                  socket.off("disconnect-server");
                  socket.off("server-msg");
                  socket.off("client-msg");
                  socket.off("disconnect");
                  socket.off("connect");
                });
              } else {
                socket.on("server-msg", () => {});
                socket.on("client-msg", () => {});
                socket.on("disconnect", () => {});
                socket.on("connect", () => {});
              }
              setSocketOn(!socketOn);
            }}
          >
            <Typography>{socketOn ? "입 닫게 하기" : "켜기"}</Typography>
          </Button>
        </Right>
      </Page>
    </>
  );
}

const Page = styled("main")(() => ({
  display: "flex",
  gap: "1rem",
  padding: "1rem",
}));

const Form = styled("form")(() => ({}));

const Right = styled("div")(() => ({
  flex: 1,
}));

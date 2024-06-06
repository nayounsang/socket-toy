import { Typography, styled } from "@mui/material";

interface PropType {
  data:{ user: "c" | "s"; msg: string }[]
}

export default function MsgShow({ data }: PropType) {
  
  return (
    <Container>
      {data.map((e, i) => (
        <Message user={e.user} key={i}>{e.msg}</Message>
      ))}
    </Container>
  );
}

const Container = styled("div")(() => ({
  overflow: "scroll",
  flex:1,
  backgroundColor: "white",
  padding: "0.5rem",
  display: "flex",
  flexDirection:"column",
  gap: "0.5rem",
  maxWidth: "700px",
}));



const Message = styled(Typography)<{user:string}>(({user,theme})=>({
    alignSelf: user === "s"? "flex-end" : "flex-start",
    backgroundColor: user==="s"? theme.palette.secondary.main : theme.palette.primary.main,
    color: "white",
    borderRadius: "8px",
    width: "300px",
    padding: "0.5rem 0.75rem"
}))

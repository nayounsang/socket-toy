import { io } from "socket.io-client";

export const socket = io("wss://localhost:3000", { rejectUnauthorized: false });
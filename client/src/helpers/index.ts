import * as io from "socket.io-client";

export const socket = io.connect(import.meta.env.BACKEND_URL);

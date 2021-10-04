const io:SocketIOClientStatic = require("socket.io-client");
const socket = io("/", {
    transports:["websocket"]
});
export default socket;
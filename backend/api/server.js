const http = require("http");
const app = require("../app");
const port = process.env.PORT || 3000;
const { initializeSocket } = require("../socket");

const server = http.createServer(app);

// ✅ Pass the 'server' instance correctly
initializeSocket(server);

server.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});

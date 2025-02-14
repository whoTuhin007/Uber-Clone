const express = require("express");
const app = require("./app");
const { initializeSocket } = require("./socket");


// if (require.main === module) {
  const http = require("http");
  const port = process.env.PORT || 3000;

  const server = http.createServer(app);
  initializeSocket(server); // ✅ Initialize WebSockets

  server.listen(port, () => {
    console.log(`Server running on port ${port} 🚀`);
  });
// }

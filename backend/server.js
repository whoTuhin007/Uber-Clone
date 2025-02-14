const express = require("express");
const app = require("./app"); // Import Express app
const { initializeSocket } = require("./socket");

const http = require("http");
const server = http.createServer(app);

initializeSocket(server); // ✅ WebSocket Initialization

module.exports = app; // ✅ Export app for Vercel

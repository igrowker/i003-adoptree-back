// src/socket.ts
import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export const initializeSocket = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONT_URL, // Ajusta la URL a la del frontend
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Puedes añadir cualquier otra lógica aquí si lo necesitas
    // Por ejemplo, eventos adicionales o acciones específicas cuando un cliente se conecta.

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
};

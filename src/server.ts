// server.ts
import app from './app';
import dotenv from 'dotenv';
import http from 'http'; // Importer le module http natif de Node.js
import { Server as SocketIOServer } from 'socket.io'; // Importer Server depuis socket.io
import { initializeSocketIO } from './socket.io/socketHandlers'; // Importer la fonction d'initialisation

dotenv.config();

const PORT = parseInt(process.env.PORT || '4000', 10); 
const MSG_SECRET_KEY = process.env.MSG_SECRET_KEY;

if (!MSG_SECRET_KEY) {
  console.error("ERREUR FATALE : MSG_SECRET_KEY n'est pas défini dans server.ts.");
  process.exit(1); // Arrêter le serveur si la clé n'est pas définie
}

// Créer un serveur HTTP à partir de l'application Express
const server = http.createServer(app);

// Initialiser Socket.IO et l'attacher au serveur HTTP
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // En production, restreindre à l'URL de votre frontend
  },
});

// Initialiser la logique Socket.IO en passant l'instance io
initializeSocketIO(io);

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Le serveur backend fonctionne sur http://0.0.0.0:${PORT}`);
  console.log(`Socket.IO écoute sur le port ${PORT}`);
});
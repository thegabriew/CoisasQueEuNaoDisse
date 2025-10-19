import express from 'express';
import cors from 'cors';

// imports
import messageRoutes from './routes/messagesRoutes.js';

const app = express();

// Configurar CORS
app.use(cors({
    origin: ["http://localhost:3000","http://192.168.0.5:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/messages',messageRoutes);

export default app;
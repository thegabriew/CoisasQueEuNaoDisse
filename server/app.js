import express from 'express';
import cors from 'cors';

// imports
import messageRoutes from './routes/messagesRoutes.js';
import './schedule.js';
const app = express();

// Configurar CORS
app.use(cors({
    origin:true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/messages',messageRoutes);

export default app;
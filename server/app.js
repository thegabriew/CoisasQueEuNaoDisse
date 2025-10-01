import express from 'express';
import cors from 'cors';

// imports
import messageRoutes from './routes/messagesRoutes.js';

const app = express();

// Configurar CORS
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/messages',messageRoutes);

export default app;
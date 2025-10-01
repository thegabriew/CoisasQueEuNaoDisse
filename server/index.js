import express from 'express';
import cors from 'cors';

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

export default app;
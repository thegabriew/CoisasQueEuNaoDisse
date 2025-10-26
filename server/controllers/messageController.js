import db from '../models/index.js';
import { Op } from 'sequelize';   

const messageController = {
    create: async (req, res) => {
        const { message, reciver } = req.body;
        if (message) {
            try {
                const newMessage = await db.Messages.create({
                    message,
                    reciver
                });
                return res.status(201).json(newMessage);
            } catch (error) {
                return res.status(500).json({ error: 'Erro ao criar a mensagem', details: error.message });
            }
        } else {
            return res.status(400).json({ error: 'O texto da mensagem é necessário para criar a mensagem' });
        }
    },

    findAll: async (req, res) => {
        try {
            const messages = await db.Messages.findAll();
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar mensagens', details: error.message });
        }
    },

    findOne: async (req, res) => {
        try {
            const { id } = req.params;
            const messages = await db.Messages.findByPk(id);
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar a mensagem', details: error.message });
        }
    },

    excludeMessages: async () => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const result = await db.Messages.destroy({
            where: {
                createdAt: { [Op.lt]: sevenDaysAgo }   
            }
        });

        console.log(`${result} mensagens antigas apagadas.`);
    } catch (error) {
        console.error("Erro ao apagar mensagens antigas:", error);
    }
}   
}

export default messageController;
import db from '../models/index.js';

const messageController = {
    create: async (req, res) => {
        const {message,reciver} = req.body;
        if(message){
            try{
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

    findAll: async (req, res) =>{
        try{
            const messages = await db.Messages.findAll();
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar mensagens', details: error.message });
        }
    },

    findOne: async (req, res) =>{
        try{
            const {id}= req.params;
            const messages = await db.Messages.findByPk(id);
            return res.status(200).json(messages);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar a mensagem', details: error.message });
        }
    },

    excludeMessages: async (req,res)=>{
        try{    
            const today = new Date();
            const messages = await db.Messages.destroy({
                where: {
                    createdAt: {
                        [db.Sequelize.Op.lt]: today.setDate(today.getDate() - 7)
                    }
                }
            });
            console.log(`Mensagens excluídas: ${messages}`);
            return res.status(200).send();
        }catch (error) {
            console.log(error);
            return res.status(500).json({ error: 'Erro excluir mensagens'});
        }
    }
}

export default messageController;
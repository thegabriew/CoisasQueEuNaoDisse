import express from 'express';
import messageController from '../controllers/messageController.js';

const router = express.Router();

router.post('/', messageController.create);
router.get('/', messageController.findAll);
router.get('/:id', messageController.findOne);
router.delete('/delete', messageController.excludeMessages);

export default router;  
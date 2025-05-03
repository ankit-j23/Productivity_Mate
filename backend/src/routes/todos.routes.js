import express from 'express';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { getTodos , addTodo , updateTodo , deleteTodo } from '../controllers/todo.controllers.js';

const router = express.Router();

router.get('/gettodos' , isAuthenticated  , getTodos);
router.post('/addtodo' , isAuthenticated , addTodo);
router.put('/updatetodo/:id' , isAuthenticated , updateTodo);
router.delete('/deletetodo/:id' , isAuthenticated , deleteTodo);

export default router;
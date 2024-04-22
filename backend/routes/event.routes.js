import express from 'express';
const router = express.Router();
import * as eventController from '../controllers/event.controller.js';


// Routes for CRUD operations on event

router.get('/', eventController.getAllEvent);

router.get('/:id', eventController.getEventById);

router.post('/:id/register', eventController.registerForEvent);

router.delete('/:id/unregister', eventController.unregisterFromEvent);




export default router;
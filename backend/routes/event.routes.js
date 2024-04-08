import express from 'express';
const router = express.Router();
import * as eventController from '../controllers/event.controller.js';


// Routes for CRUD operations on event

router.get('/', eventController.getAllEvent);

router.get('/:id', eventController.getEventById);




export default router;
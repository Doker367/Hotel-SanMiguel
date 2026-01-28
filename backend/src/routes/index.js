import { Router } from 'express';
import rooms from './rooms.js';
import services from './services.js';
import restaurant from './restaurant.js';
import contact from './contact.js';
import history from './history.js';
import reservations from './reservations.js';

const router = Router();
router.use('/rooms', rooms);
router.use('/services', services);
router.use('/restaurant', restaurant);
router.use('/contact', contact);
router.use('/history', history);
router.use('/reservations', reservations);

export default router;

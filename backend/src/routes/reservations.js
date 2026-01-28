import express from 'express';
import { body, query, param } from 'express-validator';
import { validate } from '../middlewares/validate.js';
import {
  checkAvailability,
  getAvailableRooms,
  createReservation,
  getReservation,
  cancelReservation,
} from '../controllers/reservationController.js';

const router = express.Router();

// Check availability for a specific room
router.get('/availability', checkAvailability);

// Get available rooms for date range
router.get('/available-rooms', getAvailableRooms);

// Create reservation
router.post(
  '/',
  [
    body('roomId')
      .notEmpty()
      .withMessage('La habitación es requerida')
      .isMongoId()
      .withMessage('ID de habitación inválido'),
    body('checkIn')
      .notEmpty()
      .withMessage('La fecha de entrada es requerida')
      .isISO8601()
      .withMessage('Fecha de entrada inválida')
      .custom((value) => {
        const date = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date < today) {
          throw new Error('La fecha de entrada no puede ser anterior a hoy');
        }
        return true;
      }),
    body('checkOut')
      .notEmpty()
      .withMessage('La fecha de salida es requerida')
      .isISO8601()
      .withMessage('Fecha de salida inválida'),
    body('guests')
      .notEmpty()
      .withMessage('El número de huéspedes es requerido')
      .isInt({ min: 1, max: 6 })
      .withMessage('El número de huéspedes debe ser entre 1 y 6'),
    body('guestName')
      .notEmpty()
      .withMessage('El nombre es requerido')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('El nombre debe tener entre 2 y 100 caracteres')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/)
      .withMessage('El nombre solo puede contener letras'),
    body('email')
      .notEmpty()
      .withMessage('El email es requerido')
      .isEmail()
      .withMessage('Email inválido')
      .normalizeEmail(),
    body('phone')
      .notEmpty()
      .withMessage('El teléfono es requerido')
      .matches(/^[\d\s\-+()]{8,20}$/)
      .withMessage('Teléfono inválido'),
    body('specialRequests')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Las solicitudes especiales no pueden exceder 500 caracteres'),
  ],
  validate,
  createReservation
);

// Get reservation by confirmation code
router.get(
  '/:code',
  [
    param('code')
      .notEmpty()
      .withMessage('Código de confirmación requerido')
      .matches(/^CDS-[A-Z0-9]+-[A-Z0-9]+$/)
      .withMessage('Formato de código inválido'),
  ],
  validate,
  getReservation
);

// Cancel reservation
router.post(
  '/:code/cancel',
  [
    param('code')
      .notEmpty()
      .withMessage('Código de confirmación requerido'),
    body('email')
      .notEmpty()
      .withMessage('El email es requerido')
      .isEmail()
      .withMessage('Email inválido')
      .normalizeEmail(),
  ],
  validate,
  cancelReservation
);

export default router;

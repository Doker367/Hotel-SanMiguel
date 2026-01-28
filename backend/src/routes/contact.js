import { Router } from 'express';
import { body } from 'express-validator';
import { createContact } from '../controllers/contactController.js';
import { validate } from '../middlewares/validate.js';

const router = Router();

// Validation rules for contact form
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ max: 100 }).withMessage('Nombre demasiado largo')
    .escape(),
  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  body('phone')
    .optional()
    .trim()
    .isMobilePhone('any').withMessage('Teléfono inválido'),
  body('message')
    .trim()
    .notEmpty().withMessage('El mensaje es obligatorio')
    .isLength({ max: 1000 }).withMessage('Mensaje demasiado largo')
    .escape()
];

router.post('/', contactValidation, validate, createContact);
export default router;

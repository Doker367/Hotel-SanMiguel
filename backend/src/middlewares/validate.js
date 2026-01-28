import { validationResult } from 'express-validator';

/**
 * Middleware to check validation results from express-validator
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Datos inválidos',
      details: errors.array().map(e => e.msg)
    });
  }
  next();
};

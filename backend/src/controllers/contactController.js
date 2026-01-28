import { Contact } from '../models/Contact.js';

/**
 * Create a new contact submission
 * Validation is handled by middleware before this runs
 */
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const contact = await Contact.create({ name, email, phone, message });
    // Don't expose internal _id to client
    res.status(201).json({ success: true, message: 'Mensaje enviado correctamente' });
  } catch (err) {
    console.error('Contact error:', err.message);
    res.status(500).json({ error: 'Error al enviar contacto' });
  }
};

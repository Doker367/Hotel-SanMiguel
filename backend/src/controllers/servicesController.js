import { Service } from '../models/Service.js';

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener servicios' });
  }
};

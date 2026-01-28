import { History } from '../models/History.js';

export const getHistory = async (req, res) => {
  try {
    const history = await History.findOne();
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener historia' });
  }
};

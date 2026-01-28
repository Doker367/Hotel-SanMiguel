import { MenuItem } from '../models/MenuItem.js';

export const getMenu = async (req, res) => {
  try {
    const items = await MenuItem.find();
    const grouped = items.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener menú' });
  }
};

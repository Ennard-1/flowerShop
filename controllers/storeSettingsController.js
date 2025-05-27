import { models} from '../models/index.js';

const { StoreSettings } = models;
// GET - retorna as configurações da loja
export const getSettings = async (req, res) => {
  try {
    const settings = await StoreSettings.findOne();
    if (!settings) {
      return res.status(404).json({ message: 'Configurações não encontradas' });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT - atualiza configurações da loja
export const updateSettings = async (req, res) => {
  try {
    let settings = await StoreSettings.findOne();
    if (!settings) {
      settings = await StoreSettings.create(req.body);
    } else {
      await settings.update(req.body);
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

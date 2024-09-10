const express = require('express');
const router = express.Router();
const Manga = require('../models/Manga'); // Asegúrate de que la ruta al modelo sea correcta

// Obtener todos los mangas
router.get('/mangas', async (req, res) => {
  try {
    // Buscar todos los mangas en la base de datos
    const mangas = await Manga.find();
    res.json(mangas); // Devolver los mangas en formato JSON
  } catch (error) {
    // Manejo de errores del servidor
    res.status(500).json({ error: 'Error del servidor al obtener los mangas' });
  }
});

module.exports = router;

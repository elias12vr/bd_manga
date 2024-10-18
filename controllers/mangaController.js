const express = require('express');
const router = express.Router();
const Manga = require('../models/Manga');

// Obtener todos los mangas
router.get('/mangas', async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.render('mangas', { mangas });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al obtener los mangas' });
  }
});

// Obtener un manga por nombre (como DeathNote)
router.get('/mangas/:nombre', async (req, res) => {
  try {
    const nombreManga = req.params.nombre;
    const manga = await Manga.findOne({ NomManga: nombreManga });

    if (!manga) {
      return res.status(404).send('El manga no fue encontrado');
    }

    res.render('detalleManga', { manga }); // Renderiza la vista con los detalles del manga
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al obtener el manga' });
  }
});

module.exports = router;

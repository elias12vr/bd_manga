const express = require('express');
const router = express.Router();
const Manga = require('../models/Manga'); // Asegúrate de que la ruta sea correcta

// Ruta para obtener todos los mangas y renderizar la vista
router.get('/mangas', async (req, res) => {
  try {
    const mangas = await Manga.find(); // Obtener todos los mangas de la colección 'mangas'
    console.log(mangas); // Verifica qué datos estás obteniendo
    res.render('mangas', { mangas });  // Renderiza la plantilla 'mangas.ejs' pasando los datos
  } catch (error) {
    console.error('Error al obtener los mangas:', error);
    res.status(500).json({ error: 'Error del servidor al obtener los mangas' });
  }
});

module.exports = router;

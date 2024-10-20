const express = require('express');
const router = express.Router();
const Manga = require('../models/Manga');

// Obtener todos los mangas
router.get('/mangas', async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.json(mangas);
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al obtener los mangas' });
  }
});

// Obtener un manga por NomManga
router.get('/mangas/:nombre', async (req, res) => {
  try {
    const nombre = req.params.nombre; // Obtener el nombre del parámetro
    const manga = await Manga.findOne({ NomManga: nombre }); // Buscar por NomManga
    if (!manga) {
      return res.status(404).send('El manga no fue encontrado');
    }
    res.json(manga); // Devuelve el manga encontrado
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al obtener el manga' });
  }
});

// Crear un nuevo manga
router.post('/mangas', async (req, res) => {
  try {
    const { NomManga, Autor, Genero, Precio, Disponibilidad } = req.body;

    // Verificar que todos los campos requeridos estén presentes
    if (!NomManga || !Autor || !Genero || Precio == null || !Disponibilidad) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Verificar si ya existe un manga con el mismo NomManga
    const existingManga = await Manga.findOne({ NomManga: NomManga });
    if (existingManga) {
      return res.status(409).json({ error: 'Ya existe un manga con ese nombre' });
    }

    // Crear un nuevo manga usando solo los campos requeridos
    const nuevoManga = new Manga({
      NomManga,
      Autor,
      Genero,
      Precio,
      Disponibilidad,
    });

    // Guardar el nuevo manga en la base de datos
    const mangaGuardado = await nuevoManga.save();
    
    res.status(201).json(mangaGuardado);
  } catch (error) {
    console.error('Error al crear el manga:', error.message);
    res.status(500).json({ error: 'Error del servidor al crear el manga', details: error });
  }
});



// Actualizar un manga por NomManga
router.put('/mangas/:nombre', async (req, res) => {
  try {
    const nombre = req.params.nombre; // Obtener el nombre del parámetro
    const mangaActualizado = await Manga.findOneAndUpdate({ NomManga: nombre }, req.body, { new: true, runValidators: true });

    if (!mangaActualizado) {
      return res.status(404).json({ error: 'El manga no fue encontrado' });
    }

    res.json(mangaActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error del servidor al actualizar el manga' });
  }
});

// Eliminar un manga por NomManga
router.delete('/mangas/:nombre', async (req, res) => {
  try {
    const nombre = req.params.nombre; // Obtener el nombre del parámetro
    const mangaEliminado = await Manga.findOneAndDelete({ NomManga: nombre });

    if (!mangaEliminado) {
      return res.status(404).send('El manga no fue encontrado para eliminar');
    }

    res.json({ mensaje: 'Manga eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al eliminar el manga' });
  }
});

module.exports = router;

const mongoose = require('mongoose');
//crear un esquema de su documento (tabla)

const mangaSchema = new mongoose.Schema({
    idmanga: { type: Int32, required: true }, //por cada campo
    NomManga: { type: String, required: true },
    Autor: { type: String, required: true },
    Genero: { type: String, required: true },
    Precio: { type: Number, required: true },
    Disponibilidad: { type: String, required: true },
  // se agregan los campos existentes en la tabla con su tipo
});
// se exporta el modelo segun el esquema llamado Libro
module.exports = mongoose.model('Manga', mangaSchema);
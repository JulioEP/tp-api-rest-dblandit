'use strict'

const mongoose =  require('mongoose');
const Alumno = require('./alumno.js').schema;

const CursoSchema = new mongoose.Schema({
    anioDictado: Number,
    duracion: Number,
    tema: { type:String, trim:true },
    alumnos: {type:[Alumno], default: []}
});

module.exports = mongoose.model('Curso', CursoSchema);
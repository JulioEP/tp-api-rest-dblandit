'use strict'

const mongoose =  require('mongoose');
const Alumno = require('./alumno.js').schema;

const CursoSchema = new mongoose.Schema({
    anioDictado: Number,
    duracionHorasTotal: Number,
    tema: { type:String, trim:true },
    alumnos: {type:[Alumno], default: []}
},{
    versionKey: false
});

module.exports = mongoose.model('Curso', CursoSchema);
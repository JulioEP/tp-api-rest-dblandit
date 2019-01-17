'use strict'

const mongoose =  require('mongoose');

const AlumnoSchema = new mongoose.Schema({
    nombre: { type:String, trim:true },
    apellido: { type:String, trim:true },
    dni: Number,
    direccion: { type:String, trim:true },
    nota:Number
});

module.exports = mongoose.model('Alumno', AlumnoSchema);
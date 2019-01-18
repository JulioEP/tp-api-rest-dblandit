'use strict'

var Curso = require('../models/curso.js');
const mongoose = require('mongoose');

// Lista de cursos
exports.getCursos = function(req, res) {
    Curso.find(req.query).limit(10)
        .then(function (cursos) {(cursos.length) ? res.send(cursos) : res.status(400).send({ msg: "No se encontraron cursos" })})
        .catch(error => {res.status(500).send()})
};

//Crear curso
exports.crearCurso = function(req, res) {
    Curso(req.body).save()
        .then(resultado => res.status(201).send({ msg: "Curso creado", curso: req.body}))
        .catch(error => res.status(500).send({ msg: "Error al crear curso: " + error.message}))
};

//Eliminar curso
exports.eliminarCurso = function(req, res) {

    //Chequeo que se reciba un formato de id correcto
    if (!chequearId(req.params.id)) {res.status(400).send({ msg:"id invalido" }); return;}
    
    Curso.findOneAndDelete({_id: req.params.id})
        .then(function (curso) {
            if (curso == null) { res.status(404).send();   return; }
            res.send(curso);
        })
        .catch((err) =>  res.status(500).send());
      
};

//Obtener alumnos
exports.getAlumnosCurso = function(req, res) {
    //Chequeo que se reciba un formato de id correcto
    if (!chequearId(req.params.id)) {res.status(400).send({ msg:"id invalido" }); return;}
    
    console.log(req.query)

    if(req.query.mejor) {
        console.log("Mejor alumno")
        Curso.aggregate([
            {$match: {"_id" : new mongoose.Types.ObjectId(req.params.id)}},
            {$project: { _id: 0, alumnos: 1 }},
            {$unwind: "$alumnos" },
            {$sort : {"alumnos.nota":-1}},
            {$limit : 1}
        ])
        .then(function (alumnos) { res.send(alumnos) })
        .catch(error => {res.status(500).send()})
    }else{
        Curso.findById(req.params.id, 'alumnos -_id')
        .then(function (alumnos) { res.send(alumnos) })
        .catch(error => {res.status(500).send()})
    }
   
};

function chequearId(id){
    if (id.match(/^[0-9a-fA-F]{24}$/)) return true
    return false
}
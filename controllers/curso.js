'use strict'

var Curso = require('../models/curso.js');

// Lista de todos los cursos
exports.getCursos = function(req, res) {
    res.send('NOT IMPLEMENTED: getCursos');
};

//Crear curso
exports.crearCurso = function(req, res) {
    
    console.log(req.body);
    
    Curso(req.body).save()
        .then(result => res.status(200).json({ msg: "Curso creado"}))
        .catch(err => res.status(404).json({ msg: "No se pudo crear el curso: " + err.message}))
    //res.send('NOT IMPLEMENTED: crear');
};

//Eliminar curso
exports.eliminarCurso = function(req, res) {
    res.send('NOT IMPLEMENTED: eliminar');
};

//Obtener alumnos
exports.getAlumnosCurso = function(req, res) {
    res.send('NOT IMPLEMENTED: alumnos');
};

//Obtener alumno con mejor nota
exports.getMejorAlumno = function(req, res) {
    res.send('NOT IMPLEMENTED: mejornota');
};
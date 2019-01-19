'use strict'

var Curso = require('../models/curso.js');
const mongoose = require('mongoose');

/**Lista de Cursos
 * Devuelve lista de cursos que cumplan la condicion puesta en la URL
 * Si no hay condicion devuelve todos 
 */
exports.getCursos = function(req, res) {
    Curso.find(req.query).limit(10)
        .then(function (cursos) {(cursos.length) ? res.send(cursos) : res.status(400).send({ msg: "No se encontraron cursos" })})
        .catch(error => {res.status(500).send()})
};

/**Crear curso
 * Guarda en la db el curso recibido en formato json
 */
exports.crearCurso = function(req, res) {
    console.log(req.body)
    Curso(req.body).save()
        .then(resultado => res.status(201).send({ msg: "Curso creado", curso: req.body}))
        .catch(error => res.status(500).send({ msg: "Error al crear curso: " + error.message}))
        
};

/**Eliminar curso
 * Se borra de la bd el curso que corresponda con el id recibido
 */
exports.eliminarCurso = function(req, res) {

    //Chequeo que se reciba un formato de id correcto
    if (!chequearId(req.params.id)) {res.status(400).send({ msg:"id invalido" }); return;}
    
    Curso.findOneAndDelete({_id: req.params.id})
        .then(function (curso) {
            if (curso == null) { res.status(404).send({msg:"No existe el curso"});   return; }
            res.send({msg:"Curso borrado",curso});
        })
        .catch((err) =>  res.status(500).send());
};

/**Lista de alumnos
 * Si recibe query "mejor=true" devuelve el alumno con mejor nota del curso con id recibido
 * Si no recibe query devuelve todos los alumnos del curso con id recibido
 */
exports.getAlumnosCurso = function(req, res) {
    //Chequeo que se reciba un formato de id correcto
    if (!chequearId(req.params.id)) {res.status(400).send({ msg:"id invalido" }); return;}

    if(req.query.mejor) {
        //Atencion: En caso de existir varios con la misma nota solo muestra uno
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

//Chequea que el id tenga el formato correcto para realizar las busquedas
function chequearId(id){
    if (id.match(/^[0-9a-fA-F]{24}$/)) return true
    return false
}
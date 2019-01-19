var express = require('express');
var CursosController = require('../controllers/curso.js');
var router = express.Router();
const jwt = require('express-jwt')

//Creo el secret de jwt que se requerira para crear y eliminar cursos
const secret = { secret: process.env.SECRET || 'dblandit' }

/*Listar cursos
**http://localhost:3000/api/cursos/
**http://localhost:3000/api/cursos?anioDictado=2018
**http://localhost:3000/api/cursos?duracionHorasTotal=40
*/
router.get('/', CursosController.getCursos);

/*Crear curso
**http://localhost:3000/api/cursos/
**Recibe el documento en formato json en el body
*/
router.post('/', jwt(secret), CursosController.crearCurso);

/*Eliminar curso
**http://localhost:3000/api/cursos/:id
*/
router.delete('/:id', jwt(secret), CursosController.eliminarCurso);

/*Obtener alumnos de un curso
**http://localhost:3000/api/cursos/:id/alumnos
**http://localhost:3000/api/cursos/:id/alumnos?mejor=true
*/
router.get('/:id/alumnos', CursosController.getAlumnosCurso);

module.exports = router;

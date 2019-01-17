var express = require('express');
var CursosController = require('../controllers/curso.js');
var router = express.Router();

/* GET all cursos */
router.get('/', CursosController.getCursos);

//Listar curso por duracion

//Listar curso por anio dictado

//Crear Curso
router.post('/', CursosController.crearCurso);

//Eliminar curso
router.delete('/:id', CursosController.eliminarCurso);

//Obtener alumnos de un curso
router.get('/:id/alumnos', CursosController.getAlumnosCurso);

//Obtener el alumno con mejor nota del curso


module.exports = router;

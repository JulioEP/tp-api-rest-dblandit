var express = require('express');
var CursosController = require('../controllers/curso.js');
var router = express.Router();

/* GET cursos */
router.get('/', CursosController.getCursos);

//Crear Curso
router.post('/', CursosController.crearCurso);

//Eliminar curso
router.delete('/:id', CursosController.eliminarCurso);

//Obtener alumnos de un curso
router.get('/:id/alumnos', CursosController.getAlumnosCurso);

module.exports = router;

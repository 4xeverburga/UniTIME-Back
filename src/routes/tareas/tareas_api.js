const express = require('express');
const router = express.Router();
const pool = require('../../config/db');
const modulos  = require('./conection.js');


// pedir las ultimas 100 proyectos de acuerdo a grupo de un usuario
// TODO: implementar :idGrupo de acuerdo al usuario 
router.get('/proyectos/:idUsuario', (req, res) => {
	const idGrupo = req.params.idGrupo
	result = pool.query(
		`select * from proyecto where jefe_proyecto = 'US123456';`
	).then((result) =>{
		res.json(result.rows);
	}).catch((err)=>{
		console.error(err.message);
		res.status(500).json({ error: 'Internal server error' });		
	})

});

// pedir las etapas de un proyecto 
router.get('/etapas/:idProyecto', (req,res) =>{
	const idProyecto = req.params.idProyecto
	result = pool.query('SELECT * FROM etapa WHERE id_proyecto=\''+idProyecto+'\' ORDER BY fecha_inicio LIMIT 4;')
	.then((result) => {
		res.json(result.rows);
	}).catch((err) => {
		console.error(err.message);
		res.status(500).json({ error: 'Internal server error' });
	})
});

// pedir las tareas de una etapa
router.get('/tareas/:idEtapa', (req,res) =>{
	const idEtapa = req.params.idEtapa
	result = pool.query('SELECT * FROM etapa WHERE id_proyecto=\''+idEtapa+'\' ORDER BY fecha_inicio LIMIT 4;')
	.then((result) => {
		res.json(result.rows);
	}).catch((err) => {
		console.error(err.message);
		res.status(500).json({ error: 'Internal server error' });
	})
});

/*
MIGRACION DE FUNCIONES ANTIGUAS
*/

//Pedir las tareas de una etapa de un usuario en especifico (revisar si es idUsuario)
router.get('/tareas/:idEtapa/:idUsuario', (req,res) =>{
	const idEtapa = req.params.idEtapa
	const idUsuario = req.params.idUsuario
	const result = modulos.get_tasks_for_stage_user(idEtapa,idUsuario);
	result.then(resultado => {
		console.log(resultado);
		res.json(resultado);
	}).catch((err) => {
		console.error(err.message);
		res.status(500).json({ error: 'Internal server error' });
	});
});

// Peticion para crear tareas
router.get('/tareas/create_task', (req,res) =>{
	const idUsuario = req.params.idUsuario;
	const descripcion_tarea = req.params.descripcion_tarea;
	const idEtapa = req.params.idEtapa;
	const nombre_tarea = req.params.nombre_tarea;
	const comentario = req.params.comentario;
	const fecha_asignada = req.params.fecha_asignada;
	const hora_inicio = req.params.hora_inicio;
	const hora_fin = req.params.hora_fin;
	const idGrupo = req.params.idGrupo;
	const result = modulos.create_task(idUsuario,descripcion_tarea,idEtapa,nombre_tarea,comentario,fecha_asignada,hora_inicio,hora_fin,idGrupo);
	result.then(resultado => {
		console.log(resultado);
		res.json(resultado);
		}).catch((err) => {
		console.error(err.message);
		res.status(500).json({ error: 'Internal server error' });
	});
}
);

// Peticion para crear proyectos
router.get('/proyectos/create_project', (req,res) =>{
	const nombre = req.params.nombre;
	const descripcion = req.params.descripcion;
	const fecha_inicio = req.params.fecha_inicio;
	const fecha_fin = req.params.fecha_fin;
	const jefe_proyecto = req.params.jefe_proyecto;
	const idGrupo = req.params.idGrupo;
	const result = modulos.create_project(nombre,descripcion,fecha_inicio,fecha_fin,jefe_proyecto,idGrupo);
	result.then(resultado => {
		console.log(resultado);
		res.json(resultado);
		}).catch((err) => {
		console.error(err.message);
		res.status(500).json({ error: 'Internal server error' });
	});
});

// Peticion para hacer una calificacion a una tarea
router.get('/tareas/rate_task', (req,res) =>{
	const idTarea = req.params.idTarea;
	const idUsuario = req.params.idUsuario;
	const calificacion = req.params.calificacion;
	const result = modulos.rate_task(idUsuario,idTarea,calificacion);
	result.then(resultado => {
		console.log(resultado);
		res.json(resultado);
		}).catch((err) => {
		console.error(err.message);
		res.status(500).json({ error: 'Internal server error' });
	});
});
module.exports = router;
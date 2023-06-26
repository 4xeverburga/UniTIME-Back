const express = require('express');
const router = express.Router();
const pool = require('../../config/db');

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
	result = pool.query('SELECT * FROM etapa WHERE id_proyecto=\''+idProyecto+'\' ORDER BY fecha_inicio LIMIT 4;')
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

module.exports = router
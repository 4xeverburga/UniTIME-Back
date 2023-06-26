const express = require('express');
const router = express.Router();
const pool = require('../../config/db');

// pedir las ultimas 100 proyectos de acuerdo a grupo de un usuario
router.get('/proyectos/:idGrupo', (req, res) => {
	// try{
	// 	const {idGrupo} = req.params
	// 	result = pool.query(
	// 		'SELECT * FROM '
	// 	)
	// 	res.send(result.rows);
	// } catch (err) {
	// 	console.error(err.message);
	// 	res.status(500).json({ error: 'Internal server error' });
	// }
	res.send('hola');
});

// pedir las etapas de un proyecto 
router.get('/etapas/:idProyecto', (req,res) =>{
	const idProyecto = req.params.idProyecto
	result = pool.query('SELECT * FROM etapa WHERE id_proyecto=\''+idProyecto+'\' ORDER BY fecha_inicio LIMIT 4;').then((result) => {
		res.json(result.rows);
	}).catch((err) => {
		console.error(err.message);
		res.status(500).json({ error: 'Internal server error' });
	})
	// res.send('hola');
});

module.exports = router
express = require('express');
const router = express.Router();
const {getGrupos, getGrupoById} = require('../../controller/grupos.controller');



// pedir las ultimas 100 proyectos de acuerdo a fecha
router.get('/api/grupos/getgrupos', getGrupos);


// pedir las ultimas 100 tareas de acuerdo a proyecto id
router.get('/api/grupos/getgrupos/:id', getGrupoById)

module.exports = router;

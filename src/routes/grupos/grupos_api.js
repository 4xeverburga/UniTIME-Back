express = require('express');
const router = express.Router();

const {getGrupos, getGrupoById,getEventosGrupos} = require('../../controller/grupos.controller');



// pedir las ultimas 100 proyectos de acuerdo a fecha
router.get('/getgrupos', getGrupos);


// pedir las ultimas 100 tareas de acuerdo a proyecto id
router.get('/getgrupos/:id',getGrupoById)

router.get('/geteventosgrupos',getEventosGrupos)

module.exports = router;

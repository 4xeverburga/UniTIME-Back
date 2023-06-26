const {Router} = require('express'); //importa desde el modulo express el metodo Router
const router = Router(); //ejecuta el metodo Router

const corsOptions = { origin:'*' };
const {getGrupos, getGrupoById,getEventosGrupos} = require('../../controller/grupos.controller');



// pedir las ultimas 100 proyectos de acuerdo a fecha
router.get('/getgrupos', getGrupos);


// pedir las ultimas 100 tareas de acuerdo a proyecto id
router.get('/getgrupos/:id',getGrupoById)

router.get('/geteventosgrupos',getEventosGrupos)

module.exports = router;

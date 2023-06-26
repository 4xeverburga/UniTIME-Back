express = require('express');
//const db = require('./db-config');
//const {sql} = require('@databases/pg');
const cors = require('cors');

const corsOptions = { origin:'*' };
const app = express();
const router = express.Router();
const {getGrupos, getGrupoById} = require('../../controller/grupos.controller');



// pedir las ultimas 100 proyectos de acuerdo a fecha
router.get('/api/grupos/getgrupos',cors(corsOptions), getGrupos);


// pedir las ultimas 100 tareas de acuerdo a proyecto id
router.get('/api/grupos/getgrupos/:id',cors(corsOptions),getGrupoById)

module.exports = app;

const express = require('express');
const router = express.Router();
const cors = require('cors');
const corsOptions = { origin:'*' };

const {getHorarioById, getHorarios, showEventsGroup} =require('../../controller/horarios.controller')

//muestra los eventos de un grupo por codGrupo //esto y el getHorarioById son lo mismo xd
router.get('/groups/:id',cors(corsOptions),showEventsGroup);

//muestra todos los horarios del usuario
router.get('/',cors(corsOptions),getHorarios);

//mostrar el horario por codigodehorario
router.get('/:id',cors(corsOptions),getHorarioById);


module.exports= router;
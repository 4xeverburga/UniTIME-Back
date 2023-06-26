const express = require('express');
const router = express.Router();

const {getHorarioById, getHorarios, showEventsGroup} =require('../../controller/horarios.controller')

//muestra los eventos de un grupo por codGrupo //esto y el getHorarioById son lo mismo xd
router.get('/groups/:id',showEventsGroup);

//muestra todos los horarios del usuario
router.get('/',getHorarios);

//mostrar el horario por codigodehorario
router.get('/:id', getHorarioById);


module.exports= router;
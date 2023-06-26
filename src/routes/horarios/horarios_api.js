const express = require('express');
const router = express.Router();

const {getHorarioById, getHorarios, showEventsGroup,getHorarioMember} =require('../../controller/horarios.controller')

//muestra los eventos de un grupo por codGrupo //esto y el getHorarioById son lo mismo xd
router.get('/groups/:id',showEventsGroup);

//muestra todos los horarios del usuario
router.get('/',getHorarios);

//mostrar el horario por codigodehorario
router.get('/:id', getHorarioById);

//vista admin horarios miembro grupo
//EJEM: http://localhost:8080/horariosApi/groups/noimporta/members/US000001
router.get('/groups/:idgroup/members/:idmember',getHorarioMember);


module.exports= router;
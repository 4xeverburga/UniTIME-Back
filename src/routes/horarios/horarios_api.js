const express = require('express');
const router = express.Router();

const {getHorarioById, getHorarios, showEventsGroup,getHorarioMember,getPersonalHorarios,createEvents,modifyEvent,createAviso,modifyAviso} =require('../../controller/horarios.controller')

//muestra los eventos de un grupo por codGrupo //esto y el getHorarioById son lo mismo xd
router.get('/groups/:id',showEventsGroup);

//muestra todos los horarios del usuario
router.get('/',getHorarios);

//muestra solo los horarios personales del usuario IO3004
router.get('/personalHorarios',getPersonalHorarios);

//mostrar el horario por codigodehorario
router.get('/:id', getHorarioById);

//vista admin horarios miembro grupo
//EJEM: http://localhost:8080/horariosApi/groups/noimporta/members/US000001
router.get('/groups/:idgroup/members/:idmember',getHorarioMember);

//crear eventos
router.post('/events/create',createEvents);

//modificar eventos (hora)
router.patch('/events/:id',modifyEvent);

//crear aviso
router.post('/events/aviso/create',createAviso);

//modificar aviso
router.patch('/events/aviso/:id',modifyAviso);

module.exports= router;
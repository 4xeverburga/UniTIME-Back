const express = require('express');
const router = express.Router();
const cors = require('cors');
const corsOptions = { origin:'*' };

const {getHorarioById, getHorarios} =require('../../controller/horarios.controller')

//muestra todos los horarios del usuario
router.get('/',cors(corsOptions),getHorarios);

//mostrar el horario por codigodehorario
router.get('/:id',cors(corsOptions),getHorarioById);


module.exports= router;
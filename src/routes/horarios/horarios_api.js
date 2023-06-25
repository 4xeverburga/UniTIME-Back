const express = require('express');
const router = express.Router();
const cors = require('cors');
const corsOptions = { origin:'*' };

const {getHorarioById} =require('../../controller/horarios.controller')

router.get('/',(req,res)=>{
  res.send('Funciona');
  });

//mostrar el horario por codigodehorario
router.get('/:id',cors(corsOptions),getHorarioById);


module.exports= router;
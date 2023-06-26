const { text } = require('body-parser');
const pool = require('../config/db');


const showEventsGroup = async (req,res)=>{
  const codGrupo = req.params.id;
  const text = 'select * from evento e inner join grupo gr on (e.cod_grupo=gr.cod_grupo) where gr.cod_grupo=\''+codGrupo+'\';';
  const response = await pool.query(text);
  res.json(response.rows);
}

const getHorarios=async (req,res)=>{
  const idusuario= 'US000001';
  const text = 'select cod_horario, descripcion from horario h inner join usuario u on (h.cod_usuario=u.cod_usuario) where u.cod_usuario = \''+idusuario+'\';';
  const response = await pool.query(text);
  res.json(response.rows);
}

const getHorarioById = async (req,res)=>{
  const idusuario= 'US000001';
  const id = req.params.id;
  const text= 'select * from evento e inner join horario h on (h.cod_horario=e.cod_horario) inner join usuario u on (u.cod_usuario=h.cod_usuario) where u.cod_usuario =\''+idusuario+'\' and h.cod_horario = \''+ id+'\';';
  const response = await pool.query(text);
  res.json(response.rows);
};

const getHorarioMember = async (req,res)=>{
  const {idmember} =req.params;
  const text='select * from horario h inner join usuario u on (h.cod_usuario=u.cod_usuario) inner join evento e on (e.cod_horario =h.cod_horario) where u.cod_usuario=\''+idmember+'\' and h.flg_privacidad =1;';
  const response = await pool.query(text);
  res.json(response.rows);
}

const getPersonalHorarios = async (req,res)=>{
  const idusuario= 'US000001';
  const text='select * from usuario u inner join horario h on (h.cod_usuario=u.cod_usuario) inner join evento e on (e.cod_horario=h.cod_horario) where u.cod_usuario = \''+idusuario+'\' and e.cod_grupo is null;';
  const response = await pool.query(text);
  res.json(response.rows);
}

const createEvents = async(req,res)=>{
  const body = req.body;
  const cod_evento = body.cod_evento;
  const descripcion_evento = body.descripcion_evento;
  const hora_fin = body.hora_fin;
  const hora_inicio = body.hora_inicio;
  const cod_horario=body.cod_horario;
  const cod_grupo = body.cod_grupo;
  const text = 'insert into evento(cod_evento,descripcion_evento,hora_inicio,hora_fin,cod_horario,cod_grupo) values(\''+cod_evento+'\',\''+descripcion_evento+'\',\''+hora_inicio+'\',\''+hora_fin+'\',\''+cod_horario+'\',\''+cod_grupo+'\');';
  await pool.query(text);
  res.json({
    message:'created',
    data:body
  });
}

const modifyEvent = async(req,res)=>{
  const {id}=req.params;
  const body = req.body;
  const hora_inicio=body.hora_inicio;
  const text='update evento set hora_inicio = \''+hora_inicio+'\' where cod_evento=\''+id+'\'';
  await pool.query(text);
  res.json({
    message:'modify',
    data:body
  })
}

const createAviso = async(req,res)=>{
  const body = req.body;
  const cod_aviso=body.cod_aviso;
  const prioridad=body.prioridad;
  const contenido=body.contenido;
  const fecha_aviso=body.fecha_aviso;
  const cod_evento=body.cod_evento;
  const text = 'insert into aviso(cod_aviso,prioridad,contenido,fecha_aviso,cod_evento) values(\''+cod_aviso+'\',\''+prioridad+'\',\''+contenido+'\',\''+fecha_aviso+'\',\''+cod_evento+'\');';
  await pool.query(text);
  res.json({
    message:'created aviso',
    data:body
  });
}

const modifyAviso = async(req,res)=>{
  const {id}=req.params;
  const body = req.body;
  const fecha_aviso=body.fecha_aviso;
  const text ='update aviso set fecha_aviso=\''+fecha_aviso+'\' where cod_aviso=\''+id+'\'';
  await pool.query(text);
  res.json({
    message:'modify aviso',
    data:body
  })
}

module.exports={ 
  getHorarioById,
  getHorarios,
  showEventsGroup,
  getHorarioMember,
  getPersonalHorarios,
  createEvents,
  modifyEvent,
  createAviso,
  modifyAviso
}

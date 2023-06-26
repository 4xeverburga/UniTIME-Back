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
  //res.status(200).json(response.rows);
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

module.exports={ 
  getHorarioById,
  getHorarios,
  showEventsGroup,
  getHorarioMember,
  getPersonalHorarios
}

const pool = require('../config/db');
const getHorarioById = async (req,res)=>{
  const idusuario= 'US000001';
  const id = req.params.id;
  const text= 'select * from evento e inner join horario h on (h.cod_horario=e.cod_horario) inner join usuario u on (u.cod_usuario=h.cod_usuario) where u.cod_usuario =\''+idusuario+'\' and h.cod_horario = \''+ id+'\';';
  const response = await pool.query(text);
  res.json(response.rows);
  //res.status(200).json(response.rows);
};

module.exports={ 
  getHorarioById,
}

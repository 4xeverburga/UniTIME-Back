const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '12345',
  port: 5432
});

const getHorarioById = async (req,res)=>{
  const idusuario= 'US000001'
  const id = req.params.id;
  const response = await pool.query(' select * from from evento e inner join horario h on (h.cod_horario=e.cod_horario) inner join usuario u on (u.cod_usuario=h.cod_usuario) where u.cod_usuario = $1 where cod_horario = $2;', [idusuario,id]);
  res.json(response.rows);
  res.status(200).json(response.rows);
};

module.exports={ 
  getHorarioById,
  pool
}

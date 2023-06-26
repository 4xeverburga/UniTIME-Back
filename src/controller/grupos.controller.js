const pool = require('../config/db');

const getGrupos = async (req, res) => {
    const response = await pool.query('select * from lista_grupos_pulic;');
    res.status(200).json(response.rows);
    console.log(response.rows);
    console.log('hola');

    
}

const getEventosGrupos = async (req, res) => {
    const response = await pool.query('select * from eventos_grupo ;');
    res.status(200).json(response.rows);
    console.log(response.rows);
}

const getGrupoById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM grupo_solo WHERE cod_grupo = $1;', [id]);
    res.status(200).json(response.rows);
  }
  

module.exports = {
    getGrupos,
    getGrupoById,
    getEventosGrupos,
}
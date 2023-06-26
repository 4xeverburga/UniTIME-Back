const pool = require('../config/db');

const getGrupos = async (req, res) => {
    const response = await pool.query('select * from usuarios ;');
    res.status(200).json(response.rows);
    console.log(response.rows);

    
}

const getGrupoById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('select * from lista_grupos_pulic where cod_grupo = $1;', [id]);
    res.json(response.rows);
    res.status(200).json(response.rows);
}

module.exports = {
    getGrupos,
    getGrupoById,
}
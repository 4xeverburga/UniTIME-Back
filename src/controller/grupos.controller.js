const {Pool} = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '123',
    database: 'postgres',
    port: '5433'
})

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
    const response = await pool.query('select * from lista_grupos_pulic where cod_grupo = $1;', [id]);
    res.json(response.rows);
    res.status(200).json(response.rows);
}

module.exports = {
    getGrupos,
    getGrupoById,
    getEventosGrupos,
    pool
}
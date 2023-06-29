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

const addgrupo = async (req, res) => {
    const{nro_mienbros, nombre, descripcion} = req.body;
    const response = await pool.query(
        `INSERT INTO grupo (cod_grupo, nro_mienbros, nombre, descripcion)
   SELECT CONCAT('GR', LPAD(CAST((SELECT COUNT(*) FROM grupo) + 1 AS text), 6, '0')), $1, $2, $3`,
  [nro_mienbros, nombre, descripcion]
    );
    res.status(200).json({message: 'grupo agregado'});
}

const addMiembro= async (req, res) => {
    try {
    const { cod_usuario, cod_grupo, rol } = req.body;

    const query = `INSERT INTO integrante (cod_usuario, cod_grupo, fecha_ingreso , rol, flg_activo) 
                    VALUES ($1, $2, CURRENT_DATE, $3, true)`;
    await pool.query(query, [cod_usuario, cod_grupo, rol]);

    res.status(200).json({ message: 'Miembro Agregado' });
    } catch (error) {
    console.error('Error al agregar grupo:', error);
    res.status(500).json({ error: 'Error al agregar miembro' });
    }
};

module.exports = {
    getGrupos,
    getGrupoById,
    getEventosGrupos,
    addgrupo,
    addMiembro,
}
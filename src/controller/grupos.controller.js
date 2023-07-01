const pool = require('../config/db');
const cod_usuario = 'US000001';


const getGrupos = async (req, res) => {
    try {
      const response = await pool.query('select * from lista_grupos_pulic where cod_usuario= $1;', [cod_usuario]);
        res.status(200).json(response.rows);
        console.log(response.rows);
    } catch (error) {
        console.error('Error al obtener los grupos:', error);
        res.status(500).json({ error: 'Error al obtener los grupos' });
    }
}
  
  const getEventosGrupos = async (req, res) => {
    try {
      const response = await pool.query('select * from eventos_grupo where cod_usuario= $1;', [cod_usuario]);
      res.status(200).json(response.rows);
      console.log(response.rows);
    } catch (error) {
      console.error('Error al obtener los eventos de los grupos:', error);
      res.status(500).json({ error: 'Error al obtener los eventos de los grupos' });
    }
  }
  
  const getGrupoById = async (req, res) => {
    try {
      const id = req.params.id;
      const response = await pool.query('SELECT * FROM grupoByid WHERE cod_grupo = $1 AND cod_usuario= $2;', [id, cod_usuario]);
      res.status(200).json(response.rows);
      console.log(response.rows);
    } catch (error) {
      console.error('Error al obtener el grupo por ID:', error);
      res.status(500).json({ error: 'Error al obtener el grupo por ID' });
    }
  }
  
  const addgrupo = async (req, res) => {
    try {
      const { nro_miembros, nombre, descripcion,rol } = req.body;
      
      // Insertar el grupo y obtener el código del grupo generado
      const grupoQuery = 'INSERT INTO grupo (nro_miembros, nombre, descripcion) VALUES ($1, $2, $3) RETURNING cod_grupo';
      const grupoValues = [nro_miembros, nombre, descripcion];
      const grupoResult = await pool.query(grupoQuery, grupoValues);
      const cod_grupo = grupoResult.rows[0].cod_grupo;
      
      // Agregar al miembro que creó el grupo
      const miembroQuery = 'INSERT INTO integrante (cod_usuario, cod_grupo, fecha_ingreso, rol, flg_activo) VALUES ($1, $2, CURRENT_DATE, $3, true)';
      const miembroValues = [cod_usuario, cod_grupo, rol];
      await pool.query(miembroQuery, miembroValues);
  
      res.status(200).json({ message: 'grupo agregado' });
    } catch (error) {
      console.error('Error al agregar grupo:', error);
      res.status(500).json({ error: 'Error al agregar grupo' });
    }
  }
  
  const addMiembro = async (req, res) => {
    try {
    const { cod_usuario, cod_grupo, rol } = req.body;
  
    const query = `INSERT INTO integrante (cod_usuario, cod_grupo, fecha_ingreso , rol, flg_activo) 
                    VALUES ($1, $2, CURRENT_DATE, $3, true)`;
        await pool.query(query, [cod_usuario, cod_grupo, rol]);
  
        res.status(200).json({ message: 'Miembro Agregado' });
    } catch (error) {
    console.error('Error al agregar miembro:', error);
    res.status(500).json({ error: 'Error al agregar miembro' });
    }
};

const editardescripciongrupo = async (req, res) => {
  try {
    const { cod_grupo, descripcion } = req.body;

    // Validar que se proporcione el código de grupo y la descripción
    if (!cod_grupo || !descripcion) {
      return res.status(400).json({ error: 'Código de grupo y descripción son requeridos' });
    }

    const query = `UPDATE grupo SET descripcion = $1 WHERE cod_grupo = $2`;
    await pool.query(query, [descripcion, cod_grupo]);
    res.status(200).json({ message: 'Descripción actualizada' });
  } catch (error) {
    console.error('Error al actualizar descripción:', error);
    res.status(500).json({ error: 'Error al actualizar descripción' });
  }
};
const editarnombregrupo = async (req, res) => {
  try {
    const { cod_grupo, nombre} = req.body;

    // Validar que se proporcione el código de grupo y la descripción
    if (!cod_grupo || !nombre) {
      return res.status(400).json({ error: 'Código de grupo y descripción son requeridos' });
    }

    const query = `UPDATE grupo SET nombre = $1 WHERE cod_grupo = $2`;
    await pool.query(query, [nombre, cod_grupo]);
    res.status(200).json({ message: 'Nombre actualizado' });
  } catch (error) {
    console.error('Error al actualizar nombre:', error);
    res.status(500).json({ error: 'Error al actualizar nombre' });
  }
};

module.exports = {
    getGrupos,
    getGrupoById,
    getEventosGrupos,
    addgrupo,
    addMiembro,
    editarnombregrupo,
    editardescripciongrupo,
}

const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'UNI_TIME',
  password: 'jonathan28',
  port: 5432, 
});
//retorna el ultimo proyecto actualizado (funcion de apoyo)
const last_project = async() => {
  try {
    const txt='SELECT id_proyecto FROM proyecto ORDER BY id_proyecto DESC LIMIT 1';
    const res = await pool.query(txt);
    console.log(res);
    return res; 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  } 
  //pool.end();
}



//Carga de página con los 4 proyectos que aparecen
const main_projects = async() => {
  try {
    const txt='SELECT fecha_inicio, fecha_fin, nombre FROM proyecto ORDER BY fecha_inicio LIMIT 4';
    const res = await pool.query(txt);
    console.log(res);
    return res.rows; 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}
//creacion de proyectos
const create_project = async(nombre,description,fecha_inicio,fecha_fin,jefe_proyecto,cod_grupo) => {
  const last =  last_project();
  const number = last.substring(2); 
  number = parseInt(number) + 1; 
  const newcode = "PT" + number; 

  const txt='insert into proyecto values (\''+newcode+'\',\''+nombre+'\',\''+description+'\','+fecha_inicio+'\','+fecha_fin+'\',\'planificado\',\''+jefe_proyecto+'\',\''+cod_grupo+'\')';
  const res = await pool.query(txt);
  console.log(res);
  //pool.end();
}
//hola
const hello = "hola";
module.exports = { create_project, main_projects , pool};

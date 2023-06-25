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
//retorna el ultimo evento actualizado (funcion de apoyo)
const last_event = async() => {
  try {
    const txt='SELECT cod_evento FROM evento ORDER BY cod_evento DESC LIMIT 1';
    const res = await pool.query(txt);
    console.log(res);
    return res; 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  } 
  //pool.end();
}
//retorna el ultimo evento actualizado (funcion de apoyo){REVISARRRRRRRRR}
const last_etapa = async() => {
  try {
    const txt='SELECT cod_evento FROM evento ORDER BY cod_evento DESC LIMIT 1';
    const res = await pool.query(txt);
    console.log(res);
    return res; 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  } 
  //pool.end();
}

//Carga de página con los 4 proyectos que aparecen (INTERFAZ 1)
const main_projects = async() => {
  try {
    const txt='SELECT fecha_inicio, fecha_fin, nombre FROM proyecto ORDER BY fecha_inicio LIMIT 100 where';
    const res = await pool.query(txt);
    console.log(res);
    return res.rows; 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}
//creacion de proyectos (INTERFAZ 1)
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

//mostrar etapas segun proyecto para crear la tarea para el interfaz 4(NO ESTA AÑADIDO EN EL DOC)
const show_stages = async(id_proyecto) =>{
  const txt = 'SELECT e.nombre, e.descripcion, e.fecha_fin FROM etapa e JOIN proyecto p ON p.'+id_proyecto+' = e.'+id_proyecto;
  const res = await pool.query(txt);
  console.log(res);
}
//Creacion de tarea + asignacion (INTERFAZ 4){revisar entrada de la hora TIME '13:00'}
const create_task = async(cod_user,descripcion_tarea,cod_etapa,nombre_tarea,comentario,fecha_asignada,hora_inicio,hora_fin,cod_grupo) => {
 
  const last =  last_event();
  const number = last.substring(2); 
  number = parseInt(number) + 1; 
  const newcode = "EV" + number;

  const txt_evento = 'insert into evento values (\'' + newcode + '\', \'' + descripcion_tarea + '\', TIME \'' + hora_inicio + '\', TIME \'' + hora_fin + '\', \'' + fecha_fin + '\', null , \'' + cod_grupo + '\')';
  const res_evento = await pool.query(txt_evento);
  const txt_tarea='insert into tarea values (\''+newcode+'\',\''+cod_etapa+'\',\''+nombre_tarea+'\',TO_DATE(\''+fecha_asignada+'\',\'DD/MM/YYYY\')';
  const res_tarea = await pool.query(txt_tarea);
  const txt_asig='insert into asignacion values (\''+cod_user+'\',\''+newcode+'\',\'pendiente\','+comentario+'\',1)';
  const res_asig = await pool.query(txt_asig);
  console.log(res_evento);
  console.log(res_tarea);
  console.log(res_asig);
  //pool.end();
}
module.exports = { create_project, main_projects ,create_task, show_stages, pool};

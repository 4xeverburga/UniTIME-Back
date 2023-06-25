const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'databse_drop',
  password: 'jonathan28',
  port: 5432, 
});
//retorna el ultimo proyecto actualizado (funcion de apoyo) ✓
const last_project = async() => {
  try {
    const txt='SELECT id_proyecto FROM proyecto ORDER BY id_proyecto DESC LIMIT 1';
    const res = await pool.query(txt);
    //console.log(res);
    return res.rows[0]; 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  } 
  //pool.end();
}
//retorna el ultimo evento actualizado (funcion de apoyo) ✓
const last_event = async() => {
  try {
    const txt='SELECT cod_evento FROM evento ORDER BY cod_evento DESC LIMIT 1';
    const res = await pool.query(txt);
    //console.log(res);
    return res.rows[0]; 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  } 
  finally{

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
    const txt='SELECT fecha_inicio, fecha_fin, nombre FROM proyecto ORDER BY fecha_inicio LIMIT 4';
    const res = await pool.query(txt);
    return res.rows; 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}
//creacion de proyectos (INTERFAZ 1) ✓
const create_project = async(nombre,description,fecha_inicio,fecha_fin,jefe_proyecto,cod_grupo) => {
  try {
    const last = last_project();
     last.then(resultado => {
      const number = resultado.id_proyecto.slice(2);
      const numb = parseInt(number) + 1;
      const newcode = 'PT' + numb;
      const txt='insert into proyecto values (\''+newcode+'\',\''+nombre+'\',\''+description+'\',\''+fecha_inicio+'\',\''+fecha_fin+'\',\'planificado\',\''+jefe_proyecto+'\',\''+cod_grupo+'\')';
      pool.query(txt);
     
     console.log('Los datos se han guardado correctamente en la base de datos.');
    });
  } catch (error) {
    console.error('Error al guardar los datos en la base de datos:', error);
  }
}

//mostrar etapas segun proyecto para crear la tarea para el interfaz 4(NO ESTA AÑADIDO EN EL DOC) ✓
const get_stages_for_project = async (id_proyecto) => {
  try {
    const txt = 'SELECT e.nombre, e.descripcion, e.fecha_fin FROM etapa e JOIN proyecto p ON p.id_proyecto = e.id_proyecto where e.id_proyecto =\''+id_proyecto+'\'';
    const res = await pool.query(txt);
    return res.rows; 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};
//Creacion de tarea + asignacion (INTERFAZ 4){revisar entrada de la hora TIME '13:00'} ✓
const create_task = async (cod_user, descripcion_tarea, cod_etapa, nombre_tarea, comentario, fecha_asignada, hora_inicio, hora_fin, cod_grupo) => {
  try {
    const last = last_event();
     last.then(resultado => {
      const number = resultado.cod_evento.slice(2);
      const numb = parseInt(number) + 1;
      const newcode = 'EV' + numb;
      const txt_evento = 'insert into evento values (\'' + newcode + '\', \'' + descripcion_tarea + '\', TIME \'' + hora_inicio + '\', TIME \'' + hora_fin + '\', null , \'' + cod_grupo + '\')';
      const txt_tarea = 'insert into tarea values (\'' + newcode + '\', \'' + cod_etapa + '\', \'' + nombre_tarea + '\', TO_DATE(\'' + fecha_asignada + '\',\'DD/MM/YYYY\'))';
      const txt_asig = 'insert into asignacion values (\'' + cod_user + '\', \'' + newcode + '\', \'pendiente\', \'' + comentario + '\', 1)';
     pool.query(txt_evento);
     pool.query(txt_tarea);
     pool.query(txt_asig);
     console.log('Los datos se han guardado correctamente en la base de datos.');
    });
  } catch (error) {
    console.error('Error al guardar los datos en la base de datos:', error);
  }
};

module.exports = { create_project, main_projects ,create_task, get_stages_for_project, pool};
//const xd = create_task('US123456','tarea de prueba','ET345678','tarea1','comentario','01/01/2021','13:00','14:00','GR456789');
//const a = await last_event();
//console.log( a);
//create_project('proyecto1','descripcion','01/01/2021','01/01/2021','US123456','GR456789');

/*const prueba = main_projects();
prueba.then(resultado => {
  let i = 0;
  resultado.forEach(element => { 
    i++;
    console.log('Nombre '+ i+': ' +element.nombre);
    console.log('fecha_inicio '+ i+': ' +element.fecha_inicio);
    console.log('fecha_fin '+ i+': ' +element.fecha_fin);
  } );
});*/

const pool = require('../../config/db')

// //retorna el ultimo proyecto actualizado (funcion de apoyo) ✓
const last_project = async() => {
  try {
    const txt='SELECT id_proyecto FROM proyecto ORDER BY id_proyecto DESC LIMIT 1';
    const res = await pool.query(txt);
    return res.rows[0]; 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  } 
  //pool.end();
}

// //retorna el ultimo evento actualizado (funcion de apoyo) ✓
const last_event = async() => {
  try {
    const txt='SELECT cod_evento FROM evento ORDER BY cod_evento DESC LIMIT 1';
    const res = await pool.query(txt);
    return res.rows[0]; 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  } 
  //pool.end();
}

// //retorna el ultimo evento actualizado (funcion de apoyo){REVISARRRRRRRRR}
const last_etapa = async() => {
  try {
    const txt='SELECT id_etapa FROM evento ORDER BY id_etapa DESC LIMIT 1';
    const res = await pool.query(txt);
    return res.rows[0]; 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  } 
  //pool.end();
}

// //Carga de página con los 4 proyectos que aparecen (INTERFAZ 1) (la salida del date es:Wed Feb 01 2023 00:00:00 GMT-0500 (hora estándar de Perú) ) ✓
const get_projects_for_grupo = async(cod_grupo) => {
  try {
    const txt='SELECT fecha_inicio, fecha_fin, nombre FROM proyecto where cod_grupo = \''+cod_grupo+'\' ORDER BY fecha_fin LIMIT 100 ';
    const res = await pool.query(txt);
    return res.rows; 
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}

// //creacion de proyectos (INTERFAZ 1)✓
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


// //entrega de todas las tareas que se encuentran en una etapa(para el admin) (INTERFAZ 2) ✓
const get_tasks_for_stage = async (id_etapa) => {
  try {
    const txt = 'select t.nombre, t.dia_asignado as fecha, a.estado, u.nombres as responsable from tarea t  join asignacion a on t.cod_evento = a.cod_evento join usuario u on u.cod_usuario = a.cod_usuario where cod_etapa = \'' + id_etapa+ '\' ORDER BY dia_asignado LIMIT 100';
    const res = await pool.query(txt);
    return res.rows;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};


//entrega de todas las tareas pertenecientes al user que se encuentran en una etapa (INTERFAZ 2) ✓
const get_tasks_for_stage_user = async (id_etapa,cod_usuario) => {
  try {
    const txt = 'select * from tarea where cod_etapa = \''+id_etapa+'\' and cod_evento in (select cod_evento from asignacion where cod_usuario = \''+cod_usuario+'\') ORDER BY dia_asignado LIMIT 100';
    const res = await pool.query(txt);
    return res.rows;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
  finally{
    
  }
};


//Calificación de una tarea (INTERFAZ 2) calificacion es un int
const rate_task = async (cod_usuario,cod_evento,calificacion) => {
  try {
    const txt = 'update asignacion set calificacion = '+calificacion+' where cod_usuario = \''+cod_usuario+'\' and cod_evento = \''+cod_evento+'\'';
    const res = await pool.query(txt);
    console.log('Se ha calificado correctamente la asignacion');
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};




//mostrar etapas segun proyecto para crear la tarea para el interfaz 4(NO ESTA AÑADIDO EN EL DOC) ✓
const get_stages_for_project = async (id_proyecto) => {
  try {
    const txt = 'SELECT * FROM etapa WHERE id_proyecto =\''+id_proyecto+'\'ORDER BY fecha_inicio LIMIT 100';
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

module.exports = { 
  create_project, 
  get_projects_for_grupo ,
  create_task, 
  get_stages_for_project,
  get_tasks_for_stage,get_tasks_for_stage_user,
  rate_task
};

//PRUEBASSS:
//const xd = create_task('US123456','tarea de prueba','ET345678','tarea1','comentario','01/01/2021','13:00','14:00','GR456789');
//const a = await last_event();
//console.log( a);
//create_project('proyecto1','descripcion','01/01/2021','01/01/2021','US123456','GR456789');
/*const prueba = get_projects_for_grupo('GR456789');
prueba.then(resultado => {
  let i = 0;
  resultado.forEach(element => { 
    i++;
    console.log('Nombre '+ i+': ' +element.nombre);
    console.log('fecha_inicio '+ i+': ' +element.fecha_inicio);
    console.log('fecha_fin '+ i+': ' +element.fecha_fin);
  } );
});*/
/*const prueba = get_tasks_for_stage('ET345678');
prueba.then(resultado => {
  let i = 0;
  resultado.forEach(element => { 
    i++;
    console.log('Nombre '+ i+': ' +element.nombre);
    console.log('dia_asignado '+ i+': ' +element.dia_asignado);
  } );
}
);*/
//calificar_tarea('US234567','EV234567',5);
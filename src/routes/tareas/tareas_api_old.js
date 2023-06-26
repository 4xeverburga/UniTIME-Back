// // recieve incoming requests to api/tareas
// const express = require('express');
// const db = require('./db-config');
// const {sql} = require('@databases/pg');
// const cors = require('cors');
// const corsOptions = { origin:'*' };
// const app = express();
// const modulos  = require('./conection.js');


// // pedir las ultimas 100 proyectos de acuerdo a fecha(revisar deberia ser por grupo?)
// app.get('/api/tareas', (req, res) => {
//     res.send({msg: 'GET request to api/tareas'});
// });


// // pedir las ultimas 100 tareas de acuerdo a proyecto id
// app.get('/api/tareas/proyectos', cors(corsOptions), async (req, res) => {
    
// });
// // pedir los ultimas 100 proyectos segun codigo de grupo (MENCIONAR QUE ES PARA LA INTERFAZ 1 Y NECESITA UN GRUPO)
// app.get('/api/tareas/proyectos', async (req, res) => {
//     try {
//         let recibe =  req.body;
//         const result = modulos.get_projects_for_grupo(recibe);//el paramaetro debe ser un codigo de grupo: "GR123456"
//         result.then(resultado => {
//          console.log(resultado);
//          res.json(resultado);
//         });
//     }
//     catch (error) { console.error('Error al obtener los datos:', error); 
//     throw error; 
//     }
// });

// // agregar un nuevo proyecto
// app.post('/api/tareas/add/proyecto', (req, res) => {
//     res.send({msg: 'POST request to api/tareas/add/proyecto'});
//     let recibe = req.body;
//     modulos.create_project(recibe.nombre,recibe.description,recibe.fecha_inicio,recibe.fecha_fin,recibe.jefe_proyecto,recibe.cod_grupo);

// });

// // agregar una nueva tarea
// app.post('/api/tareas/add/tarea', (req, res) => {
//     res.send({msg: 'POST request to api/tareas/add/tarea'});
//     let recibe = req.body;  
//     modulos.create_task(recibe.cod_user,recibe.descripcion_tarea,recibe.cod_etapa,recibe.nombre_tarea,recibe.comentario,recibe.fecha_asignada,recibe.hora_inicio,recibe.hora_fin,recibe.cod_grupo);
// });


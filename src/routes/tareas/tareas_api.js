// recieve incoming requests to api/tareas
const express = require('express');
const db = require('./db-config');
const {sql} = require('@databases/pg');
const cors = require('cors');
const corsOptions = { origin:'*' };
const app = express();
const modulos  = require('./conection.js');


// pedir las ultimas 100 proyectos de acuerdo a fecha
app.get('/api/tareas', (req, res) => {
    res.send({msg: 'GET request to api/tareas'});
});


// pedir las ultimas 100 tareas de acuerdo a proyecto id
app.get('/api/tareas/proyectos', cors(corsOptions), async (req, res) => {
    try {
      const result = await db.query(sql`SELECT fecha_inicio, fecha_fin, nombre FROM proyecto ORDER BY fecha_inicio LIMIT 100`);
        res.json(result);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
         throw error;
     }
});

// pedir los ultimas 100 proyectos segun codigo de grupo (MENCIONAR QUE ES PARA LA INTERFAZ 1 Y NECESITA UN GRUPO)
app.get('/api/tareas/proyectos', cors(corsOptions), async (req, res) => {
    // try {
    //     const result = await db.query(sql`SELECT fecha_inicio, fecha_fin, nombre FROM proyecto ORDER BY fecha_inicio LIMIT 100`);
    //     res.json(result);
    // } catch (error) {
    //     console.error('Error al obtener los datos:', error);
    //     throw error;
    // }
    try {
        const result = await db.query(sql`SELECT fecha_inicio, fecha_fin, nombre FROM proyecto ORDER BY fecha_inicio LIMIT 100`);
        res.json(result);
    }
    catch (error) { console.error('Error al obtener los datos:', error); 
    throw error; 
    }
});



// agregar un nuevo proyecto
app.post('/api/tareas/add/proyecto', (req, res) => {
    res.send({msg: 'POST request to api/tareas/add/proyecto'});
});

// agregar una nueva tarea
app.post('/api/tareas/add/tarea', (req, res) => {
    res.send({msg: 'POST request to api/tareas/add/tarea'});
});


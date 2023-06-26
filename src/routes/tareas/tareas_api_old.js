
    
// });
// // pedir los ultimas 100 proyectos segun codigo de grupo (MENCIONAR QUE ES PARA LA INTERFAZ 1 Y NECESITA UN GRUPO)
router.get('/api/tareas/proyectos', async (req, res) => {
    try {
        let recibe =  req.body;
        const result = modulos.get_projects_for_grupo(recibe);//el paramaetro debe ser un codigo de grupo: "GR123456"
        result.then(resultado => {
         console.log(resultado);
         res.json(resultado);
        });
    }
    catch (error) { console.error('Error al obtener los datos:', error); 
    throw error; 
    }
});

// // agregar un nuevo proyecto
router.post('/api/tareas/add/proyecto', (req, res) => {
    let recibe = req.body;
    modulos.create_project(recibe.nombre,recibe.description,recibe.fecha_inicio,recibe.fecha_fin,recibe.jefe_proyecto,recibe.cod_grupo);
    res.json({msg: 'POST request to api/tareas/add/proyecto'});

});

// // agregar una nueva tarea
router.post('/api/tareas/add/tarea', (req, res) => {
    res.send({msg: 'POST request to api/tareas/add/tarea'});
    let recibe = req.body;  
    modulos.create_task(recibe.cod_user,recibe.descripcion_tarea,recibe.cod_etapa,recibe.nombre_tarea,recibe.comentario,recibe.fecha_asignada,recibe.hora_inicio,recibe.hora_fin,recibe.cod_grupo);
});


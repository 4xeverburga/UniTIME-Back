// recieve incoming requests to api/tareas
const express = require('express');
const db = require('./db-config');
const {sql} = require('@databases/pg');
const cors = require('cors');

const corsOptions = { origin:'*' };
const app = express();

app.get('/api/tareas', (req, res) => {
    res.send({msg: 'GET request to api/tareas'});
});
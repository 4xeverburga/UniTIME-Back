const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// const routerApi = require('./src/routes/indexRoutes');

const app = express();

// * in cors
var corsOptions = {
  origin: "*",
}
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// importing routes according to modules 
app.use('/tareasApi', require('./src/routes/tareas/tareas_api')); 
app.use('/gruposApi', require('./src/routes/grupos/grupos_api'));
app.use('/horariosApi', require('./src/routes/horarios/horarios_api'));


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server is running on port');
  console.log(PORT);
});
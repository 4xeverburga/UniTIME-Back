const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const colors = require("colors");

const routerApi = require('./src/routes/indexRoutes');


const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./src/routes/grupos/grupos_api'));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});
app.use('/api/grupos',require('./src/routes/grupos/grupos_api'));
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`.green);
});

//agregando las rutas o como se llame xd:
routerApi(app);
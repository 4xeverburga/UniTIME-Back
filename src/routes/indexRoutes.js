const horariosRouter = require('./horarios/horarios_api');

function routerApi(app){
    app.use('/api/horarios',horariosRouter);
}

module.exports=routerApi;
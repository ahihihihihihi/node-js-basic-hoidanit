import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './route/web'
require('dotenv').config();

const app = express()
const port = process.env.PORT || 8080;

//setup view engine
configViewEngine(app);

//init route
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
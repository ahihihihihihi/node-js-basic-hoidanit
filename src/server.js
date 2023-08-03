import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
require('dotenv').config();

const app = express()
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup view engine
configViewEngine(app);

//init route
initWebRoute(app);

//init api
initAPIRoute(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
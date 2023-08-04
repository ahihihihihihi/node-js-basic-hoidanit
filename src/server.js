import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './route/web';
import initAPIRoute from './route/api';
require('dotenv').config();

var morgan = require('morgan')

const app = express()
const port = process.env.PORT || 8080;

app.use((req, res, next) => {
    //check => return res.send()
    console.log('>>> run into my middleware');
    console.log(req.method);
    next();
})

app.use(morgan('combined'))

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

//handle 404 not found
app.use((req, res) => {
    return res.render('404.ejs')
})


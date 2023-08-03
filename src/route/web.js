import express from 'express';
import homeController from '../controller/homeController';

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);
    router.get('/delete-user/:id', homeController.getDeleteUser);
    router.get('/edit-user/:id', homeController.getEditUser);
    router.post('/update-user', homeController.updateUser);
    router.get('/about', (req, res) => {
        res.send('a hi hi');
    });

    return app.use('/', router)
}

export default initWebRoute;
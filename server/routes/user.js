const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const userController = require('../controllers/userController');
const Controller = require('../controllers/Controller');
const cartController = require('../controllers/cartController');

// Routes
router.get('/admin', userController.index);
router.get('/admin/listUser', userController.view);
// router.post('/', userController.find);
// router.get('/admin/adduser', userController.form);
// router.post('/adduser', userController.create);
router.get('/admin/edituser/:id', userController.edit);
router.post('/admin/edituser/:id', userController.update);
router.get('/admin/viewuser/:id', userController.viewall);
router.get('/admin/remove/:id',userController.delete);
  

router.get('/admin/listFilms', filmController.view);
router.get('/admin/editfilm/:id', filmController.edit);
router.post('/admin/editfilm/:id', filmController.update);
router.get('/admin/newfilm', filmController.new);
router.post('/admin/addfilm', filmController.add);
router.get('/admin/viewfilm/:id', filmController.viewall);
router.get('/admin/removefilm/:id', filmController.delete);
 
router.get('/addtocart/:id', cartController.add);

router.get('/', Controller.index);
router.get('/login', Controller.login);
router.get('/logout', Controller.logout);
router.get('/register', Controller.register);
router.post('/auths', Controller.auths);
router.post('/log', Controller.log);

module.exports = router;



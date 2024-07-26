const express=require('express');
const { Register, getUser, Login, adduser, deleteUser } = require('../Controller/UserController');
const auth = require('../Middleware/auth');
const { admin } = require('../Middleware/adminMiddleware');
const { CreateTask, UpdateStatus, getTasks, getAllTasks, dashbordcount, approveTask } = require('../Controller/TaskController');
const router=express.Router();

router.post('/register',Register);
router.post('/login',Login);
router.get('/',auth,admin,getUser);
router.post('/user',adduser);
router.delete('/users/:id',deleteUser);

//task
router.post('/create',auth,CreateTask);
router.put('/approve/:taskId',auth,admin,approveTask);
router.put('/status',auth,UpdateStatus);
router.get("/get",auth,getTasks)
router.get("/alltask",getAllTasks)
router.get("/dashboard",auth,dashbordcount);

module.exports=router;
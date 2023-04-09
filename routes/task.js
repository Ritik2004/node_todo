import express  from "express";
import { deleteTask, newTask, updateTask} from "../controllers/task.js";
import { getMyTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//this route is to create new task
router.post('/new',isAuthenticated, newTask);

//this route is to get all task of a particular user
router.get('/my',isAuthenticated, getMyTask);

//this route is to update and delete the task
//we are same route so will use router.route()
router.route('/:id')
.put(isAuthenticated, updateTask)
.delete(isAuthenticated,deleteTask);

export default router
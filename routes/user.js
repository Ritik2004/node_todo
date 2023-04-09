import express  from "express";
import { getAllUsers, login } from "../controllers/user.js";
import { register } from "../controllers/user.js";
import { getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { logout } from "../controllers/user.js";

const router = express.Router();

// router.get("/all", getAllUsers)
router.post("/new", register)
router.post("/login", login);

//The router.route() function returns an instance of a single route that you can then use to handle HTTP verbs with optional middleware. You can also use the router.route() function to avoid duplicate route naming as well as typing errors. 
// router.route("/usersid/:id").get(getMyProfile);

//if isAuthenticated() run sucessfully then the next() wiil be called which
//will implement getMyProfile
router.get("/logout",logout)
router.get("/me", isAuthenticated, getMyProfile);


export default router
import { Router }  from "express";
import { getUser, registerUser } from "../src/controllers/user.controller.js";
import { createUserMiddleware } from "../middleware/user.middleware.js";
import {verifyToken} from '../middleware/verifyToken.middleware.js'
 

const router = Router()
router.get('/usuarios', verifyToken, getUser)
router.post('/usuarios', createUserMiddleware, registerUser)

export default router
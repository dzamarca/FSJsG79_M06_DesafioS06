import { findUserByEmailModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

import 'dotenv/config'

const loginUser = async (req, res)=>{
    try {
        const {email, password} = req.body
        const user = await findUserByEmailModel(email)
        if(!user){
            return res.status(404).json({message: 'El usuario o password son incorrectos'})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid){
            return res.status(404).json({message: 'No autorizado'})
        }
        const token = jwt.sign({email}, process.env.JWT_SECRET,{expiresIn : '120s'})
        const {password : _ , ...userWithoutPass} = user
        res.status(200).json({token, userWithoutPass})
    } catch (error) {
        res.status(500).json({error: error.message})
        console.error('ERROR_AUTH_CONTROLLER =>', error)
    }
}

export {loginUser}
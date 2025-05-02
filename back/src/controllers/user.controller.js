import { createUserModel, findUserByEmailModel } from "../models/user.model.js"
import jwt from 'jsonwebtoken'


export const registerUser = async (req, res)=>{
    try {
        const {email, password, rol, lenguage} = req.body
        const result = await createUserModel(email, password, rol, lenguage)
        res.status(200).json({user: result})
    } catch (error) {
        res.status(500).json({error: 'Error al procesar la solicitud'})
        console.error('ERROR_CONTROLLER_REGISTER =>', error)
    }
}

export const getUser = async (req, res)=>{
    try {
        const token = req.header('Authorization')
        if(!token){
            return res.status(400).json({message: 'El token debe estar presente'})
        }
        const extractToken = token.split(' ')[1]
        const {email} = jwt.decode(extractToken)
        const {rol, lenguage} = await findUserByEmailModel(email)
        res.status(200).json([{
            email: email, 
            rol : rol, 
            lenguage: lenguage
        }])
    } catch (error) {
        res.status(500).json({error: 'Error al procesar la solicitud'})
        console.error('ERROR_CONTROLLER_GET =>', error)
    }
}
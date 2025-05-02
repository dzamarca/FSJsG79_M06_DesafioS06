import pool from '../../db/config.js'
import bcrypt from 'bcryptjs'

export const createUserModel = async (email, password, rol, lenguage)=>{
    const hashedPassword = bcrypt.hashSync(password)
    const sqlQuery = {
        text : 'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING email, rol, lenguage',
        values: [email, hashedPassword, rol, lenguage]
    }
    console.log(sqlQuery)
    const response = await pool.query(sqlQuery)
    return response.rows[0]
}

export const findUserByEmailModel = async(email)=>{
    const sqlQuery = {
        text : 'SELECT * FROM usuarios WHERE email = $1',
        values : [email]
    }
    const response = await pool.query(sqlQuery)
    return response.rows[0] 
}
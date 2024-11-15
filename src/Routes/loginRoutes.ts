import {Request, Response, Router} from 'express';
import { LoginBody, RegisterBody } from '../types/loginRoutes';
import { pool } from '../db';
import { comparePassword, encryptPassword } from '../utils/encryptPassword';
import {sign} from '../utils/token'
import cookie  from 'cookie' ;
import { logMsg } from '../log';
const router = Router();

const cookieOptions: cookie.SerializeOptions = {
    httpOnly: true ,
    // sameSite: 'strict' ,
    maxAge: 3600*24*60 ,
}

router.post('/login', async (req : Request, res : Response) => {
    const {username, password}: LoginBody = req.body;
    const client = await pool.connect() ;
    try{
        const result = await client.query(`SELECT * FROM users WHERE username = $1`, [username]) ;
        if(result.rows.length === 0){
            res.status(401).send('Invalid Username or Password');
            return ;
        }
        const user = result.rows[0] ;
        const match = await comparePassword(password, user.password) ;
        if(match){
            let token =  await sign({
                username: user.username,
                email: user.email,
                id : user.id,
            })
            // const cookies = cookie.serialize('auth-token' , token , cookieOptions)
            res.cookie('authToken' , token , cookieOptions)
            // res.setHeader('Set-Cookie', cookies) ;
            res.status(200).send('Login Successful');
        }
        else{
            res.status(401).send('Invalid Username or Password');
        }
    }
    catch(err){
        logMsg(err.message , 'ERROR' , 0 , 'loginRoutes.ts')
        res.status(500).send('Internal Server Error');
    }
    finally{
        client.release() ;
    }
})

router.post('/register', async (req : Request, res : Response) => {
    const {username , email , password} : RegisterBody = req.body ;
    const client = await pool.connect() ;
    try{
        const result = await client.query(`SELECT * FROM users WHERE username = $1 OR email = $2`, [username , email]) ;
        if(result.rows.length > 0){
            res.status(409).send('User already exists');
            return ;
        }
        const encryptedPassword = await encryptPassword(password) ;
        await client.query('BEGIN') ;
        await client.query(`INSERT INTO users(username , email , password) VALUES($1 , $2 , $3)`, [username , email , encryptedPassword]).then((res)=>{
            logMsg('User Created username:'+username , 'INFO' )
        }) ;
        const rows = await client.query("SELECT * FROM users WHERE username = $1", [username]) ;
        const token = sign({
            id: rows.rows[0].id,
            username: rows.rows[0].username,
            email: rows.rows[0].email
        })
        // console.log(token) ;
        res.cookie('authToken' , token , cookieOptions)
        // res.setHeader('Set-Cookie', cookies) ;
        res.status(201).send('User Created');
        client.query('COMMIT') ;
    }
    catch(err){
        logMsg(err , 'ERROR' , 50 , 'loginRoutes.ts')
        client.query('ROLLBACK') ;
        res.status(500).send('Internal Server Error');
    }
    finally{
        client.release() ;
    }
})


export default router ;
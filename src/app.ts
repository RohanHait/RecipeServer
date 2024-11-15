import express, {Request ,Response} from 'express';
import dotenv from 'dotenv';
import cookieSession = require('cookie-session');
import cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
const port = process.env.PORT ;
import {pool} from './db' ;
import { logMsg } from './log';
import loginRouter from './Routes/loginRoutes' ;
app.use(express.json());
app.use(cookieSession({
  name : 'session' ,
  keys : ["key1" , "key2"]
})) ;
app.use(cookieParser()) ;
app.get('/', async (req : Request, res :Response) => {
  const client =  await pool.connect() ;
  logMsg(req.headers.cookie , 'LOG') ;
  setTimeout(()=>{
    client.query('SELECT NOW()' ) ;
    client.release() ;
    res.setHeader("Set-Cookie", "token=12345;HttpOnly;");
    res.send('Recipe API');
  }, 2000)
});
app.use('/auth', loginRouter) ;

app.listen(port, () => {
  logMsg("____________ Starting the server ____________" , 'INFO')
  logMsg(`Server is listening on port ${port}` , 'LOG')
});
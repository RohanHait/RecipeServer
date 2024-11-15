import { Pool } from "pg";
import { logMsg } from "./log";

const pool = new Pool({
    idleTimeoutMillis: 1000,
    max: 20,
}) ;

pool.on('error',(err , client)=>{
    logMsg(err.message , 'ERROR' , 0 , 'db.ts')
    // process.exit(-1)
})
pool.on('connect',()=>{
    logMsg(`New Client Connected | Total Client:${pool.totalCount} | Waited: ${pool.waitingCount}` , 'INFO')
})
pool.on('release',(err , client)=>{
    if(err){
        logMsg(err.message , 'ERROR' , 0 , 'db.ts')
    }
    logMsg(`Client Released` , 'INFO')

})

pool.query('SELECT NOW()',(err , res)=>{
    
    if(err){
        logMsg(err.message , 'ERROR' , 0 , 'db.ts')
    }
    else{
        logMsg('Query executed successfully' , 'INFO' , 0 , 'db.ts')
    }
    logMsg('Closing the pool' , 'INFO')
})

export  {pool} ;
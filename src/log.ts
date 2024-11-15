export function logMsg(msg : string , type : string , line? : number , file? : string){
    let a = `${new Date().toISOString()} [${type}] ${msg}` ;
    if(type === 'ERROR'){
        console.error(a , `at ${file}:${line}`)
    }
    else if(type === 'INFO'){
        console.info(a)
    }
    else if(type === 'WARN'){
        console.warn(a)
    }
    else{
        console.log(a)
    }
}
import bcrypt from 'bcrypt' ;

let saltRounds = parseInt(process.env.SALT_ROUNDS || '10') ;

export async function encryptPassword(password : string){
    return await bcrypt.hash(password, saltRounds)
}
export async function comparePassword(password : string , hash : string){
    return await bcrypt.compare(password, hash)
}

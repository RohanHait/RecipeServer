import jwt, { JsonWebTokenError } from "jsonwebtoken";
import fs from "fs";
import { logMsg } from "../log";

const privateKey = fs.readFileSync("Private/Keys/private.pem", "utf8");
const publicKey = fs.readFileSync("Private/Keys/public.pem", "utf8");

export function sign(payload: any , expiresIn? : string ){
    return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn : (expiresIn || '60d') });
};

export const verify = async (token: string) => {
    return jwt.verify(token, publicKey, { algorithms: ["RS256"] })
};

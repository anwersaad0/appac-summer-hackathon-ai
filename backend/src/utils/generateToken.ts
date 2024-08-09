import jwt from 'jsonwebtoken';
import { Response } from 'express';


const generateToken = (userId: string, res: Response) =>{

    // Here we are creating the token
    const token = jwt.sign({userId}, process.env.JWT_SECRET!,{
        expiresIn: "15d"
    })

    // Here we add that token to the cookie that will be sent in the request
    res.cookie("jwt", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000, //Ms
      httpOnly: true, //prevent XSS cross site scripting
      sameSite: "strict", //CSRF attack cross-site request forgery
      secure: process.env.NODE_ENV !== "development", //HTTPS
    });

    return token;

};

export default generateToken;
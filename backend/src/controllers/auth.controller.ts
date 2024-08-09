import { Request, Response} from 'express';
import prisma from '../db/prisma.js';
import bcryptjs from 'bcryptjs';
import generateToken from '../utils/generateToken.js';


export const signup = async (req: Request, res: Response) =>{

    try{
        const { username, password, /*confirmPassword,*/ prefLang } = req.body;

        if (!username || !password || /*!confirmPassword ||*/ !prefLang) {
          return res.status(400).json({ error: "Please fill in all fields" });
        }

        // if (password !== confirmPassword) {
        //   return res.status(400).json({ error: "passwords don't match" });
        // }

        if (password.length < 8) {
          return res
            .status(400)
            .json({ error: "password must be at least 8 characters long" });
        }

        if (username.length < 6) {
          return res
            .status(400)
            .json({ error: "Username must have at least 8 characters" });
        }

        // If all the fields are correct, we try to find the user
        const user = await prisma.user.findUnique({ where: { username } });

        // If the user exists, we throw an error
        if (user) {
          return res.status(400).json({ error: "Username already exists" });
        }

        // If the user doesn't exist, we proceed to hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        // const girlAvatar = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        // const boyAvatar = `https://avatar.iran.liara.run/public/boy?username=${username}`;


        // We then try to create the user
        const newUser = await prisma.user.create({
          data: {
            username,
            password: hashedPassword,
            prefLang,
            profilePic: `https://avatar.iran.liara.run/username?username=${username}&bold=true&length=2`,
          },
        });

        // If we are able to create it, we  generate a token
        if (newUser) {
          generateToken(newUser.id, res);


        //   Here we send the response (cookie included)
          res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            profilePic: newUser.profilePic,
          });
        // After this, every time there's a req, it will have the cookie.


        } else {
          res.status(400).json({ error: "Invalid user data" });
        }

    }catch(error:any){
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }


}


export const login = async (req: Request, res: Response) =>{
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Email or password invalid" });
    }

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log("Error in the login controller ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export const logout = async (req: Request, res: Response) =>{
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error: any) {
    console.log("Error in logout controler ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export const getMe = async (req: Request, res: Response) =>{
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    console.log("Error in getMe controller ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
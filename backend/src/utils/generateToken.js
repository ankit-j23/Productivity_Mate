import jwt from "jsonwebtoken";

const generateToken = (userId , res) =>{
    const token = jwt.sign({userId} , process.env.JWT_SECRET , {
        expiresIn : "7d"
    })

    //sending the token in cookies to have checks in client side
    res.cookie("jwt" , token , {
        maxAge : 7*24*60*60*1000,
        httpOnly: true,
        sameSite: true,
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}

export default generateToken;
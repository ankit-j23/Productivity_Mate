import jwt from "jsonwebtoken"
import User from "../models/users.model.js";
export const isAuthenticated = async (req, res, next) => {
    try {
        //geting the nessessery cookie from the request with the help of cookie-parser middleware
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized No token provided" })
        }

        //decoding the token and extracting the user details from there
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        //finding the user with extracted user id from the token
        const user = await User.findById(decodedToken.userId).select("-password");

        //last check if the user with extracted details from token not found

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        //if everything is good..

        req.user = user;
        // console.log(user)

        next();

    } catch (error) {
        console.log("Some error occured in the isAuthenticated middleware" + error.message);
        res.status(500).json({ message: "Internal server error" })
    }
}
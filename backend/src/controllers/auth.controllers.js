import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signupController = async (req, res) => {
    //destructuring the creds from req body to perform some manual validations on them
    const { fullName, email, password, profilePic } = req.body;

    try {

        //some manual validators like if all the fields are filled , if email exists

        //checking if all the creds are provided except profilePic as its not required firsthand
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required ot be filled" });
        }

        //checking if the user already doesn't exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({message: "Sorry , a user with this email already exists" })
        }

        //if all the validations are passed...

        //hashing password
        const salt = await bcrypt.genSaltSync(10);
        const securedPassword = await bcrypt.hash(password, salt);

        //creating a new user in the database 

        const newUser = new User(({
            fullName,
            email,
            password: securedPassword,
            profilePic
        }))

        //if the signup is done now generating the token and sending all required things in the response and saving the new user

        await newUser.save();

        const authToken = generateToken(newUser._id, res);

        res.status(201).json({
            success : true,
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
        })

        // console.log(authToken)


    } catch (error) {
        console.log("Some Error occured in the signup controller" + error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }

}

export const loginController = async (req, res) => {
    const { email , password } = req.body;
    try {
        //express validation
        // handleValidation(req , res);

        //custom validation
        if(!email || !password){
            return res.status(400).json({message : "All fields are required"});
        }

        const user = await User.findOne({ email });

        //validating email
        if(!user){
            return res.status(400).json({message : "Invalid credentials"});
        }

        //validating password
        const isCorrectPassword = await bcrypt.compare(password , user.password);

        if(!isCorrectPassword){
            return res.status(400).json({message : "Invalid credentials"})
        }

        //after login is completed
        const token = generateToken(user._id , res);
        res.status(200).json({
            success:true,
            id : user._id,
            fullName : user.fullName,
            email : user.email,
            profilePic : user.profilePic
        })
    } catch (error) {
        console.log("Some error occured in the login controller" + error.message)
        res.status(500).json({message : "Internal server error"})
    }
}

export const logoutController = async (req, res) => {
    try {
        //deleting the authtoken from cookies
        res.cookie("jwt" , "" , {maxAge:0});
        res.status(200).json({success:true , message : "Logged out successfully"});
    } catch (error) {
        console.log("Some error occured in the logout controller" , error.message);
        res.status(500).json({sucess:false , message: "Internal Server Error"});
    }
}

import { body } from "express-validator";

export const nameValidator = body('fullName' , "Please enter a valid name").isLength({min : 3});
export const emailValidator = body('email' , "Please enter a valid email").isEmail();
export const passwordValidator = body('password' , "Please enter a valid password").isLength({min : 5});
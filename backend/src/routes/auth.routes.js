import express from 'express';
import { signupController , loginController , logoutController } from '../controllers/auth.controllers.js';
import { emailValidator, nameValidator, passwordValidator } from '../validators/authValidators.js';
import handleValidation from '../middlewares/validateRequest.js';

const router = express.Router();

router.post("/signup", [ nameValidator , emailValidator , passwordValidator ] , handleValidation , signupController)
router.post("/login" , [emailValidator , passwordValidator] ,  loginController)
router.post("/logut" , logoutController)

export default router;
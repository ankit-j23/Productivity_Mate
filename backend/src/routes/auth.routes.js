import express from 'express';
import { signupController , loginController , logoutController } from '../controllers/auth.controllers.js';
import { emailValidator, nameValidator, passwordValidator } from '../validators/authValidators.js';
import handleValidation from '../middlewares/validateRequest.js';
import { checkAuthController } from '../controllers/auth.controllers.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/signup", [ nameValidator , emailValidator , passwordValidator ] , handleValidation , signupController)
router.post("/login" , [emailValidator , passwordValidator] , handleValidation ,  loginController)
router.get("/checkauth" , isAuthenticated, checkAuthController)
router.post("/logout" , logoutController)

export default router;
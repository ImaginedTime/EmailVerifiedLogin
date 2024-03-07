//importing modules
import express from 'express';
import userController from '../Controllers/userController.js';
import userAuth from '../Middlewares/userAuth.js';
const { signup, login, verifyEmail, getAllUsers } = userController;

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup 
router.post('/signup', userAuth.saveUser, signup)


//login route
router.post('/login', login)

//email verification route
router.get('/verify-email/:id/:userName', verifyEmail)

router.get("/getAllUsers", getAllUsers)

export default router;
import express from 'express'
import { signupController, loginController } from '../controllers/user.controller.js'
import { creditController } from '../controllers/credit.controller.js'
import getId from '../middlewares/getId.js'
const userRouter = express.Router()

userRouter.post('/signup', signupController)
userRouter.post('/login', loginController)
userRouter.get('/credits', getId, creditController)

export default userRouter
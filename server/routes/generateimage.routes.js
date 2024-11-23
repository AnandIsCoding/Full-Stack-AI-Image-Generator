import express from 'express'
import generateImageController from '../controllers/generate.controller.js'
import getId from '../middlewares/getId.js'
const generateRouter = express.Router()

generateRouter.post('/generate', generateImageController)
export default generateRouter
import {Router} from 'express'
import {gethuella,createUtp,deleteUtp,gethuellaHash} from '../controllers/huella.controller.js'
const router= Router()

router.get('/huella',gethuella)

router.get('/huella/:id',gethuellaHash)

router.post('/huella',createUtp)

router.delete('/huella/:id',deleteUtp)

export default router
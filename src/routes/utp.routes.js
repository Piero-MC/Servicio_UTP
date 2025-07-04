import {Router} from 'express'
import {getUtp,createUtp,updateUtp,deleteUtp,getUtpDNI,getUtpCOD} from '../controllers/utp.controller.js'
const router= Router()

router.get('/utp',getUtp)

router.get('/utp/:id',getUtpDNI)

router.get('/utpCOD/:id',getUtpCOD)

router.post('/utp',createUtp)

router.patch('/utp/:id',updateUtp)

router.delete('/utp/:id',deleteUtp)



export default router
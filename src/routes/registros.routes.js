import {Router} from 'express'
import {getRegistros,createRegistros,updateRegistros,deleteRegistros,getRegistroFiltro,getRegistroStatSede} from '../controllers/registros.controller.js'
const router= Router()

router.get('/registros',getRegistros)

router.get('/registros/filtro',getRegistroFiltro)

router.get('/registros/StatSede',getRegistroStatSede)



router.post('/registros',createRegistros)

router.patch('/registros/:id',updateRegistros)

router.delete('/registros/:id',deleteRegistros)

export default router
import {Router} from 'express'
import {getRegistros,createRegistros,getRegistroFiltro,getRegistroStatSede,getRegistroStatMotivo,getRegistroStatEstado,getRegistroStatIngresante,getRegistroStatCantidadMes,getRegistroStatCantidadDia} from '../controllers/registros.controller.js'
const router= Router()

router.get('/registros',getRegistros)

router.get('/registros/filtro',getRegistroFiltro)

router.get('/registros/StatSede',getRegistroStatSede)

router.get('/registros/StatMotivo',getRegistroStatMotivo)

router.get('/registros/StatEstado',getRegistroStatEstado)

router.get('/registros/StatIngresante',getRegistroStatIngresante)

router.get('/registros/StatCantMes',getRegistroStatCantidadMes)

router.get('/registros/StatCantDia',getRegistroStatCantidadDia)

router.post('/registros',createRegistros)

export default router
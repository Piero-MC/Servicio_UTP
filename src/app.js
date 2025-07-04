import express from 'express'
import utp_bdRoutes from './routes/utp.routes.js'
import registros_Routes from './routes/registros.routes.js'
import huella_Routes from './routes/huella.routes.js'
import indexRoutes from './routes/index.routes.js'


const app = express()


app.use(express.json())


app.use (indexRoutes)
app.use ('/api',utp_bdRoutes)
app.use ('/api',registros_Routes)
app.use ('/api',huella_Routes)

app.use((req,res,next) =>{
    res.status(404).json({
        message:'endpoint not Found'
    })
})

export default app;
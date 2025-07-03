import express from 'express'
import utp_bdRoutes from './routes/utp.routes.js'
import indexRoutes from './routes/index.routes.js'

const app = express()


app.use(express.json())


app.use (indexRoutes)
app.use ('/api',utp_bdRoutes)

app.use((req,res,next) =>{
    res.status(404).json({
        message:'endpoint not Fou)nd'
    })
})

export default app;
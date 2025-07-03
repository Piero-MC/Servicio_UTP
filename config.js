import {config} from 'dotenv'

config()

export const PORT=process.env.PORT || 3000
export const BD_HOST=process.env.DB_HOST || 'localhost'
export const BD_USER=process.env.DB_USER || 'root'
export const BD_PASSWORD=process.env.DB_PASSWORD || ''
export const BD_PORT=process.env.DB_PASSWORD || 3306
export const BD_DATABASE=process.env.DB_DATABASE || 'bdsoan'


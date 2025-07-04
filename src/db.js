import {createPool} from 'mysql2/promise'
import {PORT,BD_HOST,BD_USER,BD_PASSWORD,BD_PORT,BD_DATABASE} from  '../config.js'
export const pool = createPool({
    host: 'crossover.proxy.rlwy.net',
    user:'root',
    password:'JSqwrsvehPwsdADYTxIHpRMUixzgzPlu',
    port:'36289',
    database: 'railway'
})
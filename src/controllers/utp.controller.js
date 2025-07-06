import {pool} from '../db.js'
export const getUtp = async (req,res)=> {
  try{
    const [rows]= await pool.query ('SELECT  u.utp_cod AS codigo,u.utp_nombre AS nombre,u.utp_dni  AS dni, r.restric_motivo  AS restriccion,rl.rol AS rol, s.sede AS sede FROM utp_bd  AS u INNER JOIN restric AS r ON r.restric_id = u.utp_restric INNER JOIN rol     AS rl ON rl.rol_id  = u.utp_rol INNER JOIN sede    AS s  ON s.sede_id    = u.utp_sede')
    res.json(rows)
  } catch(error){
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const getUtpAdmin = async (req,res)=> {
  try{
    const [rows]= await pool.query ('SELECT  u.utp_cod AS codigo,u.utp_nombre AS nombre,u.utp_dni  AS dni, r.restric_motivo  AS restriccion,rl.rol AS rol, s.sede AS sede FROM utp_bd  AS u INNER JOIN restric AS r ON r.restric_id = u.utp_restric INNER JOIN rol     AS rl ON rl.rol_id  = u.utp_rol INNER JOIN sede    AS s  ON s.sede_id    = u.utp_sede where utp_rol=?',['RO04'])
    res.json(rows)
  } catch(error){
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const getUtpDNI = async (req,res)=> {
  try {
    const [rows]= await pool.query ("select   u.utp_cod AS codigo,u.utp_nombre AS nombre,u.utp_dni  AS dni, r.restric_motivo  AS restriccion,rl.rol AS rol, s.sede AS sede  from utp_bd  AS u INNER JOIN restric AS r ON r.restric_id = u.utp_restric INNER JOIN rol     AS rl ON rl.rol_id  = u.utp_rol INNER JOIN sede    AS s  ON s.sede_id    = u.utp_sede where utp_dni=?",[req.params.id])
  
    if (rows.length<=0) return res.status(404).json({
      message:'Trabajador no Encontrado'
    })
    res.json(rows[0])
      
  } catch (error){
    return res.status(500).json({
          message: 'Something goes wrong'
        })
  }
}

export const getUtpCOD = async (req,res)=> {
  try {
    const [rows]= await pool.query ("select*from utp_bd where utp_cod=?",[req.params.id])

    if (rows.length<=0) return res.status(404).json({
      message:'Trabajador no encontrado'
    })
    res.json(rows[0])
  } catch (error){
    return res.status(500).json({
          message: 'Something goes wrong'
        })
  }
  
}

export const createUtp = async (req,res)=> {
    try {
      const {codigo,nombre,dni,restriccion,rol,sede} =req.body
      const [rows]= await pool.query('insert into utp_bd values (?,?,?,?,?,?)', [codigo,nombre,dni,restriccion,rol,sede])
      res.send({
          codigo,
          nombre,
          dni,
          restriccion,
          rol,
          sede
      })
    } catch (error){
      return res.status(500).json({
            message: 'Something goes wrong'
          })
    }  
  
    
}

export const updateUtp = async (req,res)=> {
  try {
    const {id}=req.params
    const {codigo,nombre,dni,restriccion,rol,sede}=req.body
    
    const [result]= await pool.query ("update utp_bd set utp_restric=? , utp_sede= IFNULL(?,utp_sede) where utp_dni= IFNULL(?,utp_dni)",[restriccion,sede,id])
    
    if (result.affectedRows === 0) res.status(404).json({
      message:'Trabajador no encontrado'
    })

    const [rows]= await pool.query('select * from utp_bd where utp_dni=?',[id])
    res.json(rows[0])
  } catch (error){
    return res.status(500).json({
          message: 'Something goes wrong'
        })
  }

  
}

export const deleteUtp = async (req,res)=> {
  try {
    const [result]= await pool.query ("delete from utp_bd where utp_dni=?",[req.params.id])

    if (result.affectedRows <=0) res.status(404).json({
      message:'Trabajador no encontrado'
    })
    res.sendStatus(204)
  } catch (error){
    return res.status(500).json({
          message: 'Something goes wrong'
        })
  } 
  
  
}



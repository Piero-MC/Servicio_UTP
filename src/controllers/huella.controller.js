import {pool} from '../db.js'


export const gethuella= async (req,res)=>{
  try{
    const [rows]= await pool.query ('select * from huella_persona')
    res.json(rows)
  } catch(error){
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const createUtp = async (req,res)=> {
    try {
      const {id,ndocumento,template,fecha} =req.body
      const [rows]= await pool.query('insert into huella_persona (numeroDocumento,image_template,AUDI_FecCrea) values (?,?,?)', [ndocumento,template,fecha])
      res.send({
          id,
          ndocumento,
          template,
          fecha
      })
    } catch (error){
      return res.status(500).json({
            message: 'Something goes wrong'
          })
    }  
  
    
}

export const deleteUtp = async (req,res)=> {
  try {
    const [result]= await pool.query ("delete from huella_persona where idHuella=?",[req.params.id])

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

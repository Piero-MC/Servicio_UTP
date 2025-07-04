import {pool} from '../db.js'


export const getRegistros= async (req,res)=>{
  try{
    const [rows]= await pool.query ('SELECT  r.id_registro,r.registro_nombre AS nombre,r.registro_dni AS dni,i.ingresante_detalle    AS tipo_ingresante,m.motivo_detalle AS motivo,s.sede as sede, r.registro_ingreso_fecha,estado FROM registro AS r INNER JOIN ingresante AS i ON i.id_ingresante = r.registro_tipo_ingresante INNER JOIN motivo     AS m ON m.id_motivo     = r.registro_motivo INNER JOIN sede as s on s.sede_id=r.registro_sede ORDER BY id_registro')
    res.json(rows)
  } catch(error){
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}


export const getRegistroFiltro = async (req,res)=> {
  const {
      dni,              // e.g. "75992629"  o "" / undefined
      tipo,             // e.g. "ING01"
      motivo,           // e.g. "MO02"
      estado,
      sede,           // e.g. "Ingreso Exitoso"
      desde,            // e.g. "2025-06-27 00:00:00"
      hasta             // e.g. "2025-06-27 23:59:59"
    } = req.query

     // Convierte '' → null para que la SQL funcione
    const p = s => (s?.trim() === '' ? null : s);
  try {
    const [rows]= await pool.query (
        `SELECT
          r.id_registro,
          r.registro_nombre        AS nombre,
          r.registro_dni           AS dni,
          i.ingresante_detalle     AS tipo_ingresante,
          m.motivo_detalle         AS motivo,
          s.sede                   AS sede,
          r.registro_ingreso_fecha,
          r.estado                
          FROM   registro   AS r
          INNER  JOIN ingresante AS i ON i.id_ingresante = r.registro_tipo_ingresante
          INNER  JOIN motivo     AS m ON m.id_motivo     = r.registro_motivo
          INNER  JOIN sede       AS s ON s.sede_id       = r.registro_sede
          WHERE  r.registro_dni             = COALESCE(?, r.registro_dni)
            AND  r.registro_tipo_ingresante = COALESCE(?, r.registro_tipo_ingresante)
            AND  r.registro_motivo          = COALESCE(?, r.registro_motivo)
            AND  r.estado                   = COALESCE(?, r.estado)
            AND  r.registro_sede            = COALESCE(?, r.registro_sede)
            AND  r.registro_ingreso_fecha BETWEEN
                COALESCE(?, r.registro_ingreso_fecha)     -- fecha inicio
                AND
                COALESCE(?, r.registro_ingreso_fecha)     -- fecha fin
          ORDER BY r.id_registro;`, 
        [
          p(dni),
          p(tipo),
          p(motivo),
          p(estado),
          p(sede),
          p(desde),
          p(hasta)
        ]
    )
     res.json(rows);

  } catch (error){
    
      res.status(500).json({ message: 'Error al consultar registros' });
  }
}

export const getRegistroStatSede= async (req,res)=>{
   const {
      mes,            // e.g. "2025-06-27 00:00:00"
      year             // e.g. "2025-06-27 23:59:59"
    } = req.query

     // Convierte '' → null para que la SQL funcione
    const p = s => (s?.trim() === '' ? null : s);
    try {
      const [rows]= await pool.query (
          `SELECT  s.sede,
          COUNT(*) AS total_ingresantes
          FROM    registro as r
          JOIN    registro_sede    as s ON s.sede_id = r.registro_sede
          WHERE   YEAR(r.registro_ingreso_fecha)  = ?
          AND   MONTH(r.registro_ingreso_fecha) = ?   
          GROUP BY s.sede_id, s.sede
          ORDER BY total_ingresantes DESC;`, 
          [
            p(year),
            p(mes)
          ]
      )
      res.json(rows);

    } catch (error){
      console.error(err);
        res.status(500).json({ message: 'Error al consultar registros' });
    }
}

export const getRegistroStatMotivo= async (req,res)=>{
   const {
      mes,       
      year,
      sede           
    } = req.query

    const p = s => (s?.trim() === '' ? null : s);
    try {
      const [rows]= await pool.query (
          `SELECT  m.motivo_detalle AS motivo,
          COUNT(*)         AS total
          FROM    registro AS r
          JOIN    motivo   AS m ON m.id_motivo = r.registro_motivo
          JOIN    sede     AS s ON s.sede_id   = r.registro_sede
          WHERE   YEAR(r.registro_ingreso_fecha)  = ?
            AND   MONTH(r.registro_ingreso_fecha) = ?
            AND   s.sede = COALESCE( ? , s.sede)  
          GROUP BY m.id_motivo;`, 
          [
            p(year),
            p(mes),
            p(sede)
          ]
      )
      res.json(rows);

    } catch (error){
      console.error(err);
        res.status(500).json({ message: 'Error al consultar registros' });
    }
}

export const getRegistroStatEstado= async (req,res)=>{
   const {
      mes,       
      year,
      sede           
    } = req.query

    const p = s => (s?.trim() === '' ? null : s);
    try {
      const [rows]= await pool.query (
          `SELECT  r.estado,
           COUNT(*) AS total
            FROM    registro r
            JOIN    sede     AS s ON s.sede_id   = r.registro_sede
            WHERE   YEAR(r.registro_ingreso_fecha)  = ? 
              AND   MONTH(r.registro_ingreso_fecha) = ?
              AND   s.sede = COALESCE(?, s.sede)  
            GROUP BY r.estado`, 
          [
            p(year),
            p(mes),
            p(sede)
          ]
      )
      res.json(rows);

    } catch (error){
      console.error(err);
        res.status(500).json({ message: 'Error al consultar registros' });
    }
}

export const getRegistroStatIngresante= async (req,res)=>{
   const {
      mes,       
      year,
      sede           
    } = req.query

    const p = s => (s?.trim() === '' ? null : s);
    try {
      const [rows]= await pool.query (
          `SELECT  i.ingresante_detalle,
          COUNT(*) AS total
          FROM    registro r
          JOIN    ingresante     AS i ON i.id_ingresante   = r.registro_tipo_ingresante
          JOIN    sede     AS s ON s.sede_id   = r.registro_sede
          WHERE   YEAR(r.registro_ingreso_fecha)  = ? 
            AND   MONTH(r.registro_ingreso_fecha) = ?
            AND   s.sede = COALESCE(?, s.sede)  
          GROUP BY i.ingresante_detalle`, 
          [
            p(year),
            p(mes),
            p(sede)
          ]
      )
      res.json(rows);

    } catch (error){
      console.error(err);
        res.status(500).json({ message: 'Error al consultar registros' });
    }
}

export const getRegistroStatCantidadMes= async (req,res)=>{
   const {    
      year,
      sede           
    } = req.query

    const p = s => (s?.trim() === '' ? null : s);
    try {
      const [rows]= await pool.query (
          `SELECT  MONTH(r.registro_ingreso_fecha),
          COUNT(*) AS total_anual
          FROM    registro AS r
          JOIN    sede     AS s ON s.sede_id = r.registro_sede
          WHERE   YEAR(r.registro_ingreso_fecha) = ?   
            AND   s.sede = COALESCE(?, s.sede)           
          GROUP BY MONTH(r.registro_ingreso_fecha);`, 
          [
            p(year),
            p(sede)
          ]
      )
      res.json(rows);

    } catch (error){
      console.error(err);
        res.status(500).json({ message: 'Error al consultar registros' });
    }
}

export const getRegistroStatCantidadDia= async (req,res)=>{
   const {    
      year,
      mes,
      sede           
    } = req.query

    const p = s => (s?.trim() === '' ? null : s);
    try {
      const [rows]= await pool.query (
          `SELECT  DAY(r.registro_ingreso_fecha),
            COUNT(*) AS total_anual
            FROM    registro AS r
            JOIN    sede     AS s ON s.sede_id = r.registro_sede
            WHERE   YEAR(r.registro_ingreso_fecha) = ? 
              AND MONTH (R.registro_ingreso_fecha)=?
              AND   s.sede = COALESCE(?, s.sede)           
            GROUP BY DAY(r.registro_ingreso_fecha);`, 
          [
            p(year),
            p(mes),
            p(sede)
          ]
      )
      res.json(rows);

    } catch (error){
      console.error(err);
        res.status(500).json({ message: 'Error al consultar registros' });
    }
}

export const createRegistros = async (req,res)=> {
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

export const updateRegistros = async (req,res)=> {
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

export const deleteRegistros = async (req,res)=> {
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
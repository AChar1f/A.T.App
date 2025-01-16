import { connection as db } from '../config/index.js'

class Logs{
        fetchLogs(req,res){
        try{
            const strQry = `
            select user_id, attendance_id, concat(substring(created_at,1, 10), " " ,substring(created_at,12, 5))'Time Stamp', first_name, last_name, department 
              from Attendance left join Users using (user_id) 
              order by attendance_id desc ;
            `
            db.query(strQry, (err, results) => {
                if(err) throw err 
                res.json({
                    status: res.statusCode,
                    results})
            })
        } catch (e){
           res.json({
            status: 404,
            msg: e.message
           })
        }
    }

    fetchUserStatus(req, res) {
        try {
          const strQry = `
          SELECT 
              CONCAT(u.first_name, " ", u.last_name) AS 'Full Name',
              u.department,
              a.user_id,
              a.attendance_id,
              CONCAT(SUBSTRING(a.created_at, 1, 10), " ", SUBSTRING(a.created_at, 12, 5)) AS 'Latest Log',
              CASE 
                  WHEN (SELECT COUNT(*) FROM Attendance WHERE user_id = a.user_id) % 2 = 0 THEN 'Off-Site'
                  ELSE 'On-Site'
              END AS status
          FROM 
              Attendance a
          LEFT JOIN 
              Users u ON a.user_id = u.user_id
          WHERE 
              a.created_at = (
                  SELECT MAX(created_at)
                  FROM Attendance
                  WHERE user_id = a.user_id
              )
          ORDER BY 
              a.attendance_id DESC;

          `
          db.query(strQry, (err, results) => {
            if(err) throw err
            res.json({
              status: res.statusCode,
              results
            })
          })
        } catch (error) {
          res.json({
            status: 404,
            error
          })
        }
    }
    
    addLog(req,res){
        try {
            const strQry = `
                insert into Attendance(user_id) 
                value(${req.params.uid});
            `

            db.query(strQry, (err,result) => {
                if (err) throw new err
                    res.json({
                        status: res.statusCode,
                        msg: "Scanned successfully😉",
                        result
                    }) 
            })
            
        } catch (error) {
            if(error){
                res.json({
                    status: 404,
                    result : `Couldn't find data`
                }) 
            }
        }
    }
    
    fetchSingleUserLog(req,res){
        try {
          const strQry = `
          select user_id, attendance_id, concat(substring(created_at,1, 10), " " ,substring(created_at,12, 5))'Time Stamp', first_name, last_name, department 
          from Attendance left join Users using (user_id) 
          WHERE user_id = ${req.params.id} 
          order by attendance_id desc ;
          `
  
          db.query(strQry, (err, result)=>{
            if (err) throw new err 
              res.json({
                status : result.statusCode,
                result
              })
          })
        } catch (error) {
          res.json({
            status : 404,
            error
          })
        }
    }

}


export {
    Logs
}
import conn from "../config/conn.js"

const getUserByToken = async(token) =>{
    return new Promise((resolve, reject)=>{
        if(!token){
            res.status(401).json({err:"acesso negado!"})
            return
        }

        const decoded = jwt.verify(token, "SENHASUPERRSEGURAEDIFICIL")
        //console.log("Função GetUser: ",decoded)
        const userId = decoded.id
        //console.log(" userId",userId)
        const checkSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`
        const checkData = ["usuario_id", userId]
        conn.query(checkData,checkSql, (err, data)=>{
            if(err){
                reject({status: 500, message:"Erro ao buscar usuario"})
            }else{
                resolve(data[0])
            }
        })
    })
}

export default getUserByToken
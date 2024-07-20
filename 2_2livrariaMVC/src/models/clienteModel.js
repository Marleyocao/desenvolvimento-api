import conn from "../config/conn.js";

const tableClientes = /*sql*/ `
    CREATE TABLE IF NOT EXISTS clientes(
        id VARCHAR(60) PRIMARY KEY
        nome VARCHAR(60) NOT NULL,
        email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`

conn.query(tableClientes, (err,result,field)=>{
    if(err){
        return console.error('erro ao criar a tabela ' + err.stack)
    }
    //console.log(result)
    //console.log(field)
    console.log("tabela [Clientes] criada com sucesso")
})
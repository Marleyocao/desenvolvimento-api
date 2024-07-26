//import conn from "../config/conn.js";

const tableLinhas = /*sql*/ `
CREATE TABLE IF NOT EXISTS linhas(
    id VARCHAR(60) PRIMARY KEY
    nome VARCHAR(255) NOT NULL,
    numero_linha VARCHAR(255) NOT NULL,
    itinerario VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`

conn.query(tableLinhas, (err,result,field)=>{
if(err){
    return console.error('erro ao criar a tabela ' + err.stack)
}
//console.log(result)
//console.log(field)
console.log("tabela [Linhas] criada com sucesso")
})
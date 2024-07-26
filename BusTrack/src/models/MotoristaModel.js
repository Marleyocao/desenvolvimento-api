

const tableMotoristas = /*sql*/ `
CREATE TABLE IF NOT EXISTS motoristas(
    id VARCHAR(60) PRIMARY KEY
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATA NOT NULL,
    numero_carteira_habilitacao VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`

conn.query(tableMotoristas, (err,result,field)=>{
if(err){
    return console.error('erro ao criar a tabela ' + err.stack)
}
//console.log(result)
//console.log(field)
console.log("tabela [Linhas] criada com sucesso")
})
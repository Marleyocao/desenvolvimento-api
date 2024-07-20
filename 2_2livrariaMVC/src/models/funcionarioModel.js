import conn from "../config/conn.js";

const tableFuncionarios = /*sql*/ `
    CREATE TABLE IF NOT EXISTS funcionarios(
        id VARCHAR(60) PRIMARY KEY
        nome VARCHAR(60) NOT NULL,
        cargo VARCHAR(255)NOT NULL,
        salario DECIMAL(10, 2) NOT NULL,
        data_contratacao DATA NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`

conn.query(tableFuncionarios, (err,result,field)=>{
    if(err){
        return console.error('erro ao criar a tabela ' + err.stack)
    }
    //console.log(result)
    //console.log(field)
    console.log("tabela [Funcionario] criada com sucesso")
})
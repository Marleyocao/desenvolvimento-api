import conn from "../config/conn.js";

const tableLivros = /*sql*/ `
    CREATE TABLE IF NOT EXISTS livros(
        id VARCHAR(60) PRIMARY KEY,
        titulo VARCHAR(255)NOT NULL,
        autor VARCHAR(255) NOT NULL,
        ano_publicado YEAR(4) NOT NULL,
        genero VARCHAR(255) NOT NULL,
        preco DECIMAL(10, 2) NOT NULL,
        disponibilidade BOOLEAN,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`;


conn.query(tableLivros, (err,result,field)=>{
    if(err){
        return console.error('erro ao criar a tabela ' + err.stack)
    }
    //console.log(result)
    //console.log(field)
    console.log("tabela [livros] criada com sucesso")
})


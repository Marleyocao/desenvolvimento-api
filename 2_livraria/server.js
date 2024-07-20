import express,{json, query, response} from "express"
import 'dotenv/config'
import mysql from 'mysql2'
import{v4 as uuidv4} from 'uuid'
const PORT = 3333

const app = express()

app.use(express.json())

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Sen@iDev77!.',
    database:'livraria',
    port:3306
})

//conectar ao banco de dados
conn.connect((err)=>{
    if(err){
        console.error(err.stack)
    }
    console.log('Mysql Conectado')
    app.listen(PORT, ()=>{
        console.log('Servidor on PORT '+PORT)
    })
})
/****************************************rotas de livros***************************************/
app.get("/livros", (req, res) =>{
    const sql = 'SELECT * FROM livros';
    conn.query(sql, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os livros"})
            return console.error(err);
        }
        const livros = data;
        res.status(200).json(livros);
    })
})

app.post('/livros', (req, res) => {
    const {titulo, autor, ano_publicacao, genero, preco, disponibilidade} = req.body;
    if(!titulo){
        return res.status(400).json({message: "O titulo não pode ser vazio"});
    }
    if(!autor){
        return res.status(400).json({message: "O autor não pode ser vazio"});
    }
    if(!ano_publicacao){
        return res.status(400).json({message: "O ano de publicacao não pode ser vazio"});
    }
    if(!genero){
        return res.status(400).json({message: "O genero não pode ser vazio"});
    }
    if(!preco){
        return res.status(400).json({message: "O preco não pode ser vazio"});
    }
    
    if(!disponibilidade){
        return res.status(400).json({message: "A disponibilidade não pode ser vazio"});
    }
    
    const checkSql = /*sql*/ `SELECT * FROM livros WHERE titulo = "${titulo}" AND autor = "${autor}" AND ano_publicacao = "${ano_publicacao}"`;
    conn.query(checkSql, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os livros"})
            return console.error(err);
        }
        if(data.length > 0){
            res.status(409).json({message: "Livro já existe na base de dados"});
            return;
        }

        const id = uuidv4()
        const disponibilidade = 1

        const insertSql= /*sql*/`INSERT INTO livros
        (id,titulo,autor,ano_publicacao,genero,preco,disponibilidade)
        VALUES
        ("${id}","${titulo}","${autor}","${ano_publicacao}","${genero}","${preco}","${disponibilidade}")`

        conn.query(insertSql, ()=>{
            if(err){
                res.status(500).json({message: "erro ao buscar os livros"})
                return console.error(err);
            }
            response.status(201).json({message:'Livro cadastrado'})
        })

    })

})

app.get('/livros/:id',(request, response)=>{
    const {id} = request.params

    const sql = /*sql*/`SELECT * FROM livros WHERE id = "${id}"`
    conn.query(sql, (err,data)=>{
        if(err){
            response.error(err)
            response.status(500).json({message:"Erro ao buscar livro"})
            return
        }

        if(data.length === 0){
            response.status(404).json({message:"livro não encontrado"})
            return
        }
        
        response.status(200).json(data)

    })
})
    
app.put('/livros/:id',(request, response)=>{
    const {id} = request.params
    const {titulo, autor, ano_publicacao, genero, preco, disponibilidade} = req.body;

    //validações

    if(!titulo){
        return res.status(400).json({message: "O titulo não pode ser vazio"});
    }
    if(!autor){
        return res.status(400).json({message: "O autor não pode ser vazio"});
    }
    if(!ano_publicacao){
        return res.status(400).json({message: "O ano de publicacao não pode ser vazio"});
    }
    if(!genero){
        return res.status(400).json({message: "O genero não pode ser vazio"});
    }
    if(!preco){
        return res.status(400).json({message: "O preco não pode ser vazio"});
    }
    
    if(disponibilidade === undefined){
        return res.status(400).json({message: "A disponibilidade não pode ser vazio"});
    }

    const checkSql = /*sql*/`SELECT * FROM livros WHERE id = "${id}"`
    conn.query(check,(err, data)=>{
        if(err){
            return res.status(500).json({message: "erro ao buscar livro"})
        }

        if(data.length === 0){
            return response.status(404).json({message:"livro não encontrado"})
        }

        const updateSql =/*sql*/ `UPDATE livros SET
        titulo = "${titulo}", autor = "${autor}",ano_publicacao = "${ano_publicacao}",
        genero = "${genero}",preco = "${preco}", disponibilidade = "${disponibilidade}"
        WHERE id = "${id}"
        `
        conn.query(updateSql, (err)=>{
            if(err){
                return response.status(404).json({message:"Erro ao atualizar"})
            }

            response.status(200).json9({message:"atualizado com sucesso"})
            response.end()
        })

    })

})

app.delete('/livros/:id',(request, response)=>{
    const {id} = req.params;
    
    const deleteSQL = /*sql*/ `
    DELETE FROM livros
    WHERE id = "${id}"
    `
    conn.query(deleteSQL, (err, info) => {
        if(err){
            response.status(500).json({message: "erro ao deletetar o livro"})
            return console.error(err);
        }
        if(info.affectedRows == 0){
            response.status(404).json({message: "Livro não encontrado na base de dados"})
            return;
        }
        response.status(204);
        response.end()
    })

})


























/***********************************************Rotas de funcionarios****************************************/


app.get("/funcionario", (req, res) =>{
    const sql = 'SELECT * FROM funcionarios';
    conn.query(sql, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os funcionarios"})
            return console.error(err);
        }
        const funcionario = data;
        res.status(200).json(funcionario);
    })
})

app.post("/funcionario",(req, res)=>{
    const {nome,cargo, data_contratacao, salario, email} =req.body

    if(!nome){
        return res.status(400).json({message: "O nome não pode ser vazio"});
    }
    if(!cargo){
        return res.status(400).json({message: "O Cargo não pode ser vazio"});
    }
    if(!data_contratacao){
        return res.status(400).json({message: "Adata de contratação não pode ser vazio"});
    }
    if(!salario){
        return res.status(400).json({message: "O Salario não pode ser vazio"});
    }
    if(!email){
        return res.status(400).json({message: "O Email não pode ser vazio"});
    }
    if(!email.incllues("@")){
        return res.status(422).json({message: "O Email deve conter um @"});
    }

    const checkEmailSql = /*sql*/ `SELECT * FROM funcionarios WHERE email = "${email}"`
    
    conn.query(checkEmailSql, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao listar funcionarios"})
            return console.error(err);
        }
        if(data.length > 0){
            res.status(409).json({message: "O E-mail ja esta em uso"});
            return;
        }
        
        const id = uuidv4()
        const insertSql = /*sql*/`INSERT INTO funcionarios
        (id,nome,cargo,data_contratacao,salario,email)
        VALUES
        ("${id}","${nome}","${cargo}","${data_contratacao}","${salario}","${email}")`

        conn,query(insertSql,(err)=>{
            if(err){
                response.status(500).json({message:"Erro ao Cadastrar funcionario"})
                return
            }

            response.status(201).json({message:"Funcionario Cadastrado com funcionario"})
        })
    })

})

app.get("/funcionario/:id",(req, res)=>{
    const {id} = req.params

    const sql = /*sql*/`SELECT * FROM funcionarios WHERE id = "${id}"`
    conn.query(sql, (err, data)=>{
        if(err){
            res.status(500).json({message:"erro ao buscar dados"})
            return
        }

        if(data.length === 0){
            res.status(404).json({message:"Funcionario não encontrado"})
            return
        }
        
        const funcionario = data[0]
        res.status(200).json(funcionario)
    })
})

app.put("/funcionario/:id",(req, res)=>{
    const {id} = req.params
    const {nome,cargo, data_contratacao, salario, email} =req.body

    if(!nome){
        return res.status(400).json({message: "O nome não pode ser vazio"});
    }
    if(!cargo){
        return res.status(400).json({message: "O Cargo não pode ser vazio"});
    }
    if(!data_contratacao){
        return res.status(400).json({message: "Adata de contratação não pode ser vazio"});
    }
    if(!salario){
        return res.status(400).json({message: "O Salario não pode ser vazio"});
    }
    if(!email){
        return res.status(400).json({message: "O Email não pode ser vazio"});
    }
    if(!email.incllues("@")){
        return res.status(422).json({message: "O Email deve conter um @"});
    }

    const checkSql =/*sql*/`SELECT * FROM funcionarios WHERE id ="${id}"`
    conn.query(checkSql,(err,data)=>{
        if(err){
            res.status(500).json({message:"erro ao buscar dados"})
            return
        }

        if(data.length === 0){
            res.status(404).json({message:"Funcionario não encontrado"})
            return
        }

        const emailCheckSql =/*sql*/ `SELECT * FROM funcionario WHERE
        email = "${email}"
        AND
        id != "${id}"`
        conn.query(emailCheckSql, (err, data)=>{
            if(err){
                res.status(500).json({message:"erro ao verificar os emails"})
                return
            }

            if(data.length > 0){
                return res.status(409).json({message:"E-mail ja esta em uso"})
            }

            const updateSql = /*sql*/ `UPDATE funcionarios SET
            nome = "${nome}", cargo = "${cargo}", data_contratacao = "${data_contratacao}", salario = "${salario}", email = "${email}"
            WHERE id = "${id}"`
            conn.query(updateSql,(err,data)=>{
                if(err){
                    return res.status(500).json({message:"erro ao atualizar o funcionario"})
                }
                response.status(200).json({message:"usuario atualizado com sucesso"})
            })
        })
    })

})
app.delete("/funcionario/:id",(req, res)=>{
    const {id} = req.params
    const deleteSql = /*sql*/ `DELETE FROM funcionarios WHERE id = "${id}"`
    conn.query(deleteSql,(err,data)=>{
        if(err){
            return res.status(500).json({message:"erro ao deletar o funcionario"})
        }

        if(info.affectedRows === 0){
            return res.status(404).json({message:"Funcionario não encontrado"})
        }

        res.status(204).send('exccluir')

    })
})



//Rota 404
app.use((request, response)=>{
    response.status(404).json({message:"Rota não encontrada"})
})

process.on('SIGINT', ()=>{
    conn.end((err)=>{
        if(err){
            console.error(`Erro ao fechar a conexão ${err.message}`)
        }
        console.log("conexão com MYSQL encerrada.")
        process.exit()
    })
})


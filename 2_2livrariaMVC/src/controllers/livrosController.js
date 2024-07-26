import conn from "../config/conn";
import {u4 as uuidv4} from "uuid"


export const getLivros = (req,res)=>{
    const sql = 'SELECT * FROM livros';
    conn.query(sql, (err, data) => {
        if(err){
            res.status(500).json({message: "erro ao buscar os livros"})
            return console.error(err);
        }
        const livros = data;
        res.status(200).json(livros);
    })
}
export const cadastrarLivro = (req,res)=>{
    
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

}
export const buscarLivro = (req,res)=>{

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
}

export const editarLivro = (req,res)=>{

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
}

export const deletarLivro = (req,res)=>{
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
}
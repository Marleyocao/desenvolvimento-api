import jwt from "jsonwebtoken"

//assincrono
const createUserToken = async (usuario, req, res)=>{
    //Criar o token
    const token = jwt.sign(
        {
            nome: usuario.nome,
            id: usuario.usuario_id
        },
        "SENHASUPERSEGURAEDIFICIL" //senha
    )
    //Retornar/resposta o token
    res.status(200).json({
        message:"Voce esta logado",
        token: token,
        usuario_id: usuario.usuario_id
    })
}

export default createUserToken
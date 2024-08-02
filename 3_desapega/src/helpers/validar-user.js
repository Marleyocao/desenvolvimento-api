
export const validarUsuario = (req, res, next)=>{
    const {nome, email, telefone, senha, confirmsenha} = request.body

    if(!nome){
        res.status(400).json({message:"O nome é  obrigatorio"})
        return
    }
    if(!email){
        res.status(400).json({message:"O email é  obrigatorio"})
        return
    }
    if(!telefone){
        res.status(400).json({message:"O telefone é  obrigatorio"})
        return
    }
    if(!senha){
        res.status(400).json({message:"O senha é  obrigatorio"})
        return
    }
    if(!confirmsenha){
        res.status(400).json({message:"O confirmsenha é  obrigatorio"})
        return
    }

    if(!email.includes("@")){
        res.status(409).json({message:"Deve conter @ do email"})
        return
    }
    if(senha !== confirmsenha){
        res.status(400).json({message:"A senha e confirmação de senha deve ser igauis"})
        return
    }

    next()
}

export default validarUsuario
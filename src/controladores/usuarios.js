let { contas } = require("../bancodedados");


const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const conta = contas.find((conta) => {
        return conta.numero_da_conta === Number(numeroConta);
    });

    
    //verifica se o cpf é válido e se já existe outra conta cadastrada com este cpf
    if (!cpf) {
        return res.status(404).json({ mensagem: 'O cpf é obrigatório.' });
    }

    //verifica se o email é válido e se já existe outra conta cadastrada com este email
    if (!email) {
        return res.status(404).json({ mensagem: 'O email é obrigatório.' });
    }


    const { usuario } = conta;

    if ( cpf !== usuario.cpf ) {
        const cpfExistente = contas.find((conta) => {
            const { usuario } = conta;
            return usuario.cpf === cpf;
        });
    
        if (cpfExistente) {
            return res.status(400).json({ mensagem: 'Já existe outra conta cadastrada com o cpf informado!' });
        }
    }

    if ( email !== usuario.email ) {
        const emailExistente = contas.find((conta) => {
            const { usuario } = conta;
            return usuario.email === email;
        });
    
        if (emailExistente) {
            return res.status(400).json({ mensagem: 'Já existe outra conta cadastrada com o email informado!' });
        }
    }

    //sobrescreve as propriedades do objeto conta pelas propriedades informadas no body
    usuario.nome = nome;
    usuario.cpf = cpf;
    usuario.data_nascimento = data_nascimento;
    usuario.telefone = telefone;
    usuario.email = email;
    usuario.senha = senha;

    return res.status(204).send();
}


module.exports = {
    atualizarUsuario
}
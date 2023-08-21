let { banco, contas } = require("./bancodedados");


const validarSenhaBanco = (req, res, next) => {
    const { senha_banco } = req.query;

    if (!senha_banco) {
        return res.status(404).json({ mensagem: "A senha deve ser informada."});
    }

    if (senha_banco !== banco.senha ) {
        return res.status(401).json({ mensagem: "A senha do banco informada é inválida!"});
    }

    next();
}


const validarNome = (req, res, next) => {
    const { nome } = req.body;

    if(!nome) {
        return res.status(404).json({ mensagem: 'O nome é obrigatório' });
    }
    
    next();
}


const validarCpf = (req, res, next) => {
    const { cpf } = req.body;

    if(!cpf) {
        return res.status(404).json({ mensagem: 'O cpf é obrigatório' });
    }

    const cpfExistente = contas.find((conta) => {
        const { usuario } = conta;
        return usuario.cpf === cpf;
    });

    if (cpfExistente) {
        return res.status(400).json({ mensagem: 'O CPF informado já existe cadastrado!' });
    }

    next();
}


const validarDataNasc = (req, res, next) => {
    const { data_nascimento } = req.body;

    if(!data_nascimento) {
        return res.status(404).json({ mensagem: 'A data de nascimento é obrigatória' });
    }

    next();
}


const validarTelefone = (req, res, next) => {
    const { telefone } = req.body;

    if(!telefone) {
        return res.status(404).json({ mensagem: 'O telefone é obrigatório' });
    }

    next();
}


const validarEmail = (req, res, next) => {
    const { email } = req.body;

    const emailExistente = contas.find((conta) => {
        const { usuario } = conta;
        return usuario.email === email;
    });

    if (emailExistente) {
        return res.status(400).json({ mensagem: 'O email informado já existe cadastrado!' });
    }

        if(!email) {
        return res.status(404).json({ mensagem: 'O email é obrigatório' });
    }

    next();
}


const validarSenhaConta = (req, res, next) => {
    const { senha } = req.body;
    
    if(!senha) {
        return res.status(404).json({ mensagem: 'A senha é obrigatória' });
    }

    next();
}


const validarNumeroConta = (req, res, next) => {
    const { numeroConta } = req.params;

    if (isNaN(numeroConta)) {
        return res.status(400).json({ mensagem: 'Digite um número válido.' });
    }

    const conta = contas.find((conta) => {
        return conta.numero_da_conta === Number(numeroConta);
    });

    if (!conta) {
        return res.status(404).json({ mensagem: 'Não existe uma conta com o número informado.' });
    }

    next();
}


const validarDeposito = (req, res, next) => {
    const { numero_conta, valor  } = req.body;

    if (isNaN(valor)) {
        return res.status(400).json({ mensagem: 'O valor deve ser um número válido!' });
    }


    if (!numero_conta || !valor) {
        return res.status(404).json({ mensagem: 'O número da conta e o valor são obrigatórios!' });
    }

    
    const conta = contas.find((conta) => {
        return conta.numero_da_conta === Number(numero_conta);
    });


    if (!conta) {
        return res.status(404).json({ mensagem: 'Não existe uma conta com o número informado.'});
    }


    next();
}


const validarSaque = (req, res, next) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        return res.status(404).json({ mensagem: 'O número da conta, o valor e a senha são obrigatórios!' });
    }

    if (isNaN(valor)) {
        return res.status(400).json({ mensagem: 'O valor deve ser um número válido!' });
    }

    if (valor < 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor do que zero!' });
    }

    
    const conta = contas.find((conta) => {
        return conta.numero_da_conta === Number(numero_conta);
    });


    if (!conta) {
        return res.status(404).json({ mensagem: 'Não existe uma conta com o número informado.'});
    }


    const { usuario } = conta;
    if ( senha !== usuario.senha ) {
        return res.status(401).json({ mensagem: 'Senha inválida.'});
    }


    next();
}


const validarTransf = (req, res, next) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha ) {
        return res.status(404).json({ mensagem: 'O número da conta origem, número da conta destino, o valor e a senha são obrigatórios!' });
    }


    if (isNaN(valor)) {
        return res.status(400).json({ mensagem: 'O valor deve ser um número válido!' });
    }


    if (valor < 0) {
        return res.status(400).json({ mensagem: 'O valor não pode ser menor do que zero!' });
    }

    
    const contaOrigem = contas.find((conta) => {
        return conta.numero_da_conta === Number(numero_conta_origem);
    });

    if (!contaOrigem) {
        return res.status(404).json({ mensagem: 'O número de conta origem informado não tem uma conta cadastrada.'});
    }


    const contaDestino = contas.find((conta) => {
        return conta.numero_da_conta === Number(numero_conta_destino);
    });

    if (!contaDestino) {
        return res.status(404).json({ mensagem: 'O número de conta destino informado não tem uma conta cadastrada.'});
    }


    const { usuario } = contaOrigem;
    if ( senha !== usuario.senha ) {
        return res.status(401).json({ mensagem: 'Senha inválida.'});
    }


    next();
}


const validarSaldoExtrato = (req, res, next) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(404).json({ mensagem: "O número da conta e a senha devem ser informados!"})
    }


    if (isNaN(numero_conta)) {
        return res.status(400).json({ mensagem: 'Digite um número válido.' });
    }

    const conta = contas.find((conta) => {
        return conta.numero_da_conta === Number(numero_conta);
    });

    if (!conta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!' });
    }

    const { usuario } = conta;
    if (senha !== usuario.senha ) {
        return res.status(401).json({ mensagem: "Senha inválida."});
    }

    next();
}


module.exports = { 
    validarSenhaBanco, 
    validarNome,
    validarCpf,
    validarDataNasc,
    validarTelefone,
    validarEmail,
    validarSenhaConta,
    validarNumeroConta,
    validarDeposito,
    validarSaque,
    validarTransf,
    validarSaldoExtrato,
}
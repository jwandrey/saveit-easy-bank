let { contas, saques, depositos, transferencias } = require("../bancodedados");
let identificadorConta = 1;


const listarContas = (req, res) => {
    return res.status(200).json(contas);
}


const criarConta = (req, res) => {
    //desestruturar as infos obrigatorias
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const conta = {
        numero_da_conta: identificadorConta++,
        saldo: 0,
        usuario: {
            nome,
            cpf,
            data_nascimento,
            telefone,
            email,
            senha
        }
    }

    contas.push(conta);
    return res.status(201).json();
}


const excluirConta = (req, res) => {
    const { numeroConta } = req.params;

    const conta = contas.find((conta) => {
        return conta.numero_da_conta === Number(numeroConta);
    });

    if ( conta.saldo !== 0 ) {
        return res.status(403).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" });
    }

    //sobrescrevo meus dados pelos dados filtrados
    contas = contas.filter((conta) => {
        return conta.numero_da_conta !== Number(numeroConta);
    });

    return res.status(204).send();
}


const obterSaldo = (req, res) => {
    const { numero_conta } = req.query;

    const conta = contas.find((conta) => {
        return conta.numero_da_conta === Number(numero_conta);
    });


    return res.status(200).json({ saldo: conta.saldo });
}


const obterExtrato = (req, res) => {
    const { numero_conta } = req.query;

    const depositosEfetuados = depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta;
    });

    const saquesEfetuados = saques.filter((saque) => {
        return saque.numero_conta === numero_conta;
    });

    const transferenciasEnviadas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta;
    });

    const transferenciasRecebidas = transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta;
    });

    return res.status(200).json({ depositosEfetuados, saquesEfetuados, transferenciasEnviadas, transferenciasRecebidas });
}


module.exports = {
    listarContas,
    criarConta,
    excluirConta,
    obterSaldo,
    obterExtrato
}
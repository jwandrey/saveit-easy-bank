let { contas, saques, depositos, transferencias } = require("../bancodedados");
const { format } = require('date-fns');


const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    const conta = contas.find((conta) => {
        return conta.numero_da_conta === Number(numero_conta);
    });

    if (valor > 0) {
        conta.saldo = conta.saldo + valor;

        const registroDeposito = {
            data: format( new Date(), "yyyy-MM-dd HH:mm:ss" ),
            numero_conta: numero_conta,
            valor: valor
        }

        depositos.push(registroDeposito);
        return res.status(201).json();
    }


    res.status(404).json({ mensgem: "O valor deve ser um número positivo, diferente de zero."});
}


const sacar = (req, res) => {
    const { numero_conta, valor } = req.body;

    const conta = contas.find((conta) => {
        return conta.numero_da_conta === Number(numero_conta);
    });


    if (valor <= conta.saldo) {
        conta.saldo = conta.saldo - valor;

        const registroSaque = {
            data: format( new Date(), "yyyy-MM-dd HH:mm:ss" ),
            numero_conta: numero_conta,
            valor: valor
        }

        saques.push(registroSaque);
        return res.status(201).json();
    }


    res.status(404).json({ mensgem: "Saldo insuficiente." });
}


const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body;

    const contaOrigem = contas.find((conta) => {
        return conta.numero_da_conta === Number(numero_conta_origem);
    });

    const contaDestino = contas.find((conta) => {
        return conta.numero_da_conta === Number(numero_conta_destino);
    });


    if (valor <= contaOrigem.saldo) {
        contaOrigem.saldo = contaOrigem.saldo - valor;
        contaDestino.saldo = contaDestino.saldo + valor;


        const registroTransf = {
            data: format( new Date(), "yyyy-MM-dd HH:mm:ss" ),
            numero_conta_origem: numero_conta_origem,
            numero_conta_destino: numero_conta_destino,
            valor: valor
        }
        

        transferencias.push(registroTransf);
        return res.status(201).json();
    }


    res.status(404).json({ mensagem: "Saldo insuficiente." });
}


module.exports = {
    depositar,
    sacar,
    transferir
}
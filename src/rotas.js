const express = require('express');
const { listarContas, criarConta, excluirConta, obterSaldo, obterExtrato } = require('./controladores/contas');
const { atualizarUsuario } = require('./controladores/usuarios');
const { depositar, sacar, transferir } = require('./controladores/transacoes');
const { validarNome, validarCpf, validarDataNasc, validarTelefone, validarEmail, validarSenhaConta, validarSenhaBanco, validarNumeroConta, validarDeposito, validarSaque, validarTransf, validarSaldoExtrato } = require('./intermediarios');

const rotas = express();

//listar contas bancárias - query params
rotas.get('/contas', validarSenhaBanco, listarContas);

//criar conta bancária
rotas.post('/contas', validarNome, validarCpf, validarDataNasc, validarTelefone, validarEmail, validarSenhaConta, criarConta);

//atualizar usuário
rotas.put('/contas/:numeroConta/usuario', validarNumeroConta, validarNome, validarDataNasc, validarTelefone, validarSenhaConta, atualizarUsuario);

//excluir conta
rotas.delete('/contas/:numeroConta', validarNumeroConta, excluirConta);

//depositar
rotas.post('/transacoes/depositar', validarDeposito, depositar);

//sacar
rotas.post('/transacoes/sacar', validarSaque, sacar);

//transferir
rotas.post('/transacoes/transferir', validarTransf, transferir);

//obter saldo - query params
rotas.get('/contas/saldo', validarSaldoExtrato, obterSaldo);

//obter extrato - query params
rotas.get('/contas/extrato', validarSaldoExtrato, obterExtrato);

module.exports = rotas;
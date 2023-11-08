/*******************************************************************************
 * Objetivo: Criação de uma API para manipular dados de Estados e Cidades
 * Data: 01/11/2023
 * Autor: Vitor Paes Kolle
 * Versão: 1.0
 *******************************************************************************/
//para criar uma API, podemos utilizar o 'EXPRESS', 'BODY-PARSER' & 'CORS'

//"npm instal {express, body-parser & cors} --save"

//express - biblioteca que vai gerenciar as requisições da API
//body-parser - biblioteca que vai manipular dados do corpo da requisição (POST, PUT)
//cors - biblioteca responsável pelas permissões (HEADER) de acesso das requisições

//Import das bibliotecas para criar a API
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//Criando um objeto para manipular as requisições da API
const app = express()

//request - entrada de dados na API
//response - saída (return) de dados na API

//Dizer como iremos utilizar esse objeto
app.use((request, response, next) => {
//Permite especificar quem poderá acessar a API (* = liberar acesso público, 'ip' = liberar acesso apenas para aquele ip)
    response.header('Access-Control-Allow-Origin', '*')
//Permite especficar como a API será requisitada (GET, POST, PUT E DELETE)
    response.header('Access-Control-Allow-Methods', 'GET')

//Ativa as configurações de permissão no CORS
    app.use(cors())

    next()
})

//endpoint: lista a sigla de todos os estados
app.get('/estados/sigla', cors(), async function(request, response, next){
    let controleEstadosCidades = require('./module/atividade.js')
    let listaEstados = controleEstadosCidades.getListaDeEstados()

    if(listaEstados){
        response.json(listaEstados)
        response.status(200)
    }
    else{
        response.status(404)
        response.json('{erro: item não encontrado}')
    }
})

//endpoint: retorna dados do estado filtrando pela sigla
app.get('/estado/sigla/:uf', cors(), async function(request, response, next){
    //recebe variável encaminhada como parâmetro da requisição
    let siglaEstado = request.params.uf

    let controleDadosEstado = require('./module/atividade.js')
    let dadosEstado = controleDadosEstado.getDadosEstado(siglaEstado)
    
    if(dadosEstado){
        response.json(dadosEstado)
        response.status(200)
    }
    else{
        response.status(404)
        response.json('{erro: item não encontrado}')
    }
})

//endpoint: retorna dados da capital filtrando pela sigla do estado
app.get('/capital/estado', cors(), async function(request, response, next){
    //recebe variável encaminhada como query String da requisição
    let siglaEstado = request.query.uf

    let controleDadosCapital = require('./module/atividade.js')
    let dadosEstado = controleDadosCapital.getCapitalEstado(siglaEstado)
    
    if(dadosEstado){
        response.json(dadosEstado)
        response.status(200)
    }
    else{
        response.status(404)
        response.json('{erro: item não encontrado}')
    }
})

//endpoint: retorna dados dos estados filtrando pela região
app.get('/regiao/estados', cors(), async function(request, response, next){
    //recebe variável encaminhada como query String da requisição
    let regiao = request.query.regiao

    let controleDadosEstadosRegiao = require('./module/atividade.js')
    let dadosRegiao = controleDadosEstadosRegiao.getEstadosRegiao(regiao)
    
    if(dadosRegiao){
        response.json(dadosRegiao)
        response.status(200)
    }
    else{
        response.status(404)
        response.json('{erro: item não encontrado}')
    }
})

//endpoint: retorna dados de estados que já foram capital do país
app.get('/estado/capital', cors(), async function(request, response, next){

    let controleDadosEstadosCapital = require('./module/atividade.js')
    let dadosEstado = controleDadosEstadosCapital.getCapitalPais()
    
    if(dadosEstado){
        response.json(dadosEstado)
        response.status(200)
    }
    else{
        response.status(404)
        response.json('{erro: item não encontrado}')
    }
})



app.listen('8080', function(){
    console.log('API funcionando!!!!')
})

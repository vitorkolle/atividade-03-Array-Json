var estados_cidade = require('./estados_cidades')

const getListaDeEstados = function(){  
     const arrayEstados = []

     const JsonEstados = {}
     
     estados_cidade.estadosCidades.estados.forEach(estado => {

          arrayEstados.push(estado.sigla)
});

 JsonEstados.uf = arrayEstados
 JsonEstados.quantidade = arrayEstados.length

 return JsonEstados
}
//getListaDeEstados()

const getDadosEstado = function(siglaEstado){ 
     const estado = siglaEstado
     const jsonEstado = {}

     estados_cidade.estadosCidades.estados.forEach(pEstado => {
           if(estado == pEstado.sigla){
               jsonEstado.uf = pEstado.sigla
               jsonEstado.descricao = pEstado.nome
               jsonEstado.capital = pEstado.capital
               jsonEstado.regiao = pEstado.regiao
          } 
     });

      return jsonEstado
}
//getDadosEstado('RS')

const getCapitalEstado = function(siglaEstado){
     const estado = siglaEstado
     const jsonCapEstado = {}

     estados_cidade.estadosCidades.estados.forEach(cEstado => {
           if(estado == cEstado.sigla){
               jsonCapEstado.uf = cEstado.sigla
               jsonCapEstado.descricao = cEstado.nome
               jsonCapEstado.capital = cEstado.capital
          } 
     });

     return jsonCapEstado
}
//getCapitalEstado('RJ')

const getEstadosRegiao = function(regiao){
     const eRegiao = regiao
     const estados = []
     
     estados_cidade.estadosCidades.estados.forEach(estadosR => {
          const jsonEstadosRegiao = {}

          if(eRegiao == estadosR.regiao){
               jsonEstadosRegiao.uf = estadosR.sigla
               jsonEstadosRegiao.descricao = estadosR.nome  
               estados.push(jsonEstadosRegiao)    
          }
          
     })
     const jsonRegiao = {}
     jsonRegiao.regiao = eRegiao
     jsonRegiao.estados = estados

     console.log(jsonRegiao)
}


getEstadosRegiao('Sudeste')
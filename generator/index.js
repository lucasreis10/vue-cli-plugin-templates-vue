const storeGenerator = require('./storeGenerator');

module.exports = function(api, options) {

  const { nomeModulo, caminhoEArquivoStore, tipoTarefa } = options;
  
  if(tipoTarefa === 'tarefaStore') {
    storeGenerator(api, nomeModulo, caminhoEArquivoStore);
  }
}








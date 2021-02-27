const storeGenerator = require('./storeGenerator');
const testsStoreGenerator = require('./testsStoreGenerator');

module.exports = function(api, options) {

  const { 
      nomeModulo, 
      caminhoEArquivoStore, 
      tipoTarefa,
      nomeTeste 
    } = options;
  
  if(tipoTarefa === 'tarefaStore') {
    storeGenerator(api, nomeModulo, caminhoEArquivoStore);
  } else {
    testsStoreGenerator(api, nomeTeste);
  }
}








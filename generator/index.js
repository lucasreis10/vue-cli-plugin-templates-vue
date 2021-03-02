const storeGenerator = require('./storeGenerator');
const testsStoreGenerator = require('./testsStoreGenerator');
const componenteGenerator = require('./componentGenerator');

module.exports = function(api, options) {

  const { 
      nomeModulo, 
      caminhoEArquivoStore, 
      tipoTarefa,
      nomeNovoDiretorio,
      diretorioComponente,
      nomeComponente
    } = options;
  
  if(tipoTarefa === 'tarefaStore') {
    storeGenerator(api, nomeModulo, caminhoEArquivoStore);
    testsStoreGenerator(api, nomeModulo);
  } else if(tipoTarefa === 'tarefaComponente') {
    componenteGenerator(api, nomeNovoDiretorio, diretorioComponente, nomeComponente);
  }
}








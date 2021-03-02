const fs = require('fs-extra');

module.exports = (api, nomeModulo) => {

    const nomeTesteLowerCase = nomeModulo.toLowerCase();

    // Renderizar template store
    api.render('./templates-tests-store', { nomeTeste: nomeModulo });

    api.onCreateComplete(() => {

      // Renomear pasta para name module escolhido no prompt
      fs.renameSync('tests/unit/store/modules/new-test', `tests/unit/store/modules/${nomeTesteLowerCase}`);

      // Renomear arquivos para name module escolhido no prompt
      const pathParaRenomearArquivos = `tests/unit/store/modules/${nomeTesteLowerCase}`;
      fs.rename(`${pathParaRenomearArquivos}/testModule.spec.ts`, `${pathParaRenomearArquivos}/${nomeTesteLowerCase}.spec.ts`, function(err) {
            if ( err ) console.log('ERROR: ' + err);
      });
    })
}
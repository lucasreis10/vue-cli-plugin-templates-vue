const fs = require('fs-extra')

module.exports = function(api, options) {

  const { module, pathFileStore } = options;


  // Renderizar template store
  api.render('./templates', { module });


  // Adicionar import de novo store em aquivo store.ts
  const nomeModuloLowerCase = module.toLowerCase();
  const nomeModuloUpperCase = module.toUpperCase();

  api.injectImports(pathFileStore, `import ${nomeModuloLowerCase}Module, { ${nomeModuloUpperCase}_MODULE } from '@/store/modules/${nomeModuloLowerCase}/${nomeModuloLowerCase}Module';`);


  api.onCreateComplete(() => {

    // Renomear pasta para name module escolhido no prompt 
    fs.renameSync('src/store/modules/new-module', `src/store/modules/${nomeModuloLowerCase}`);

    // Renomear arquivos para name module escolhido no prompt 
    const pathParaRenomearArquivos = `src/store/modules/${nomeModuloLowerCase}`;
    const files = [
      {
        nomeArquivoAtual: `${pathParaRenomearArquivos}/newActions.ts`,
        novaNomeArquivo: `${pathParaRenomearArquivos}/${nomeModuloLowerCase}Actions.ts`
      },
      {
        nomeArquivoAtual: `${pathParaRenomearArquivos}/newGetters.ts`,
        novaNomeArquivo: `${pathParaRenomearArquivos}/${nomeModuloLowerCase}Getters.ts`
      },
      {
        nomeArquivoAtual: `${pathParaRenomearArquivos}/newModule.ts`,
        novaNomeArquivo: `${pathParaRenomearArquivos}/${nomeModuloLowerCase}Module.ts`
      },
      {
        nomeArquivoAtual: `${pathParaRenomearArquivos}/newMutations.ts`,
        novaNomeArquivo: `${pathParaRenomearArquivos}/${nomeModuloLowerCase}Mutations.ts`
      },
    ];

    files.forEach((file) => {
      fs.rename(file.nomeArquivoAtual, file.novaNomeArquivo, function(err) {
        if ( err ) console.log('ERROR: ' + err);
      });
    })


    // Adicionar referencia do novo modulo em store
    // fs.readFile(pathFileStore, 'utf-8', (err, data) => {
    //   if (err) throw err;

    //   fs.writeFile(pathFileStore, importNovoModulo, 'utf-8', function(err) {
    //     if (err) throw err;
    //   })
    // })
  }) 
}






  

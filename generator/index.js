const fs = require('fs-extra')
const { EOL } = require('os')


module.exports = function(api, options) {
  const { module, pathFileStore } = options;


  // Renderizar template store
  api.render('./templates', { module });


  // Adicionar import de novo store em aquivo store.ts
  const nomeModuloLowerCase = module.toLowerCase();
  const nomeModuloUpperCase = module.toUpperCase();

  api.injectImports(pathFileStore, `import ${nomeModuloLowerCase}Module, { ${nomeModuloUpperCase}_MODULE } from '@/store/modules/${nomeModuloLowerCase}/${nomeModuloLowerCase}Module';`);


  api.afterInvoke(() => {
    const fs = require('fs')
    const contentMain = fs.readFileSync(pathFileStore, 'utf-8').toString();
    const lines = contentMain.split(/\r?\n/g)

    const renderIndex = lines.findIndex(line => line.match(/modules:/))
    lines[renderIndex] += `\n  router,`
  })


  // Adicionar novo module store em arquivo store.ts
  api.afterInvoke(() => {
    const storeFile = api.resolve(pathFileStore);
    const contentMain = fs.readFileSync(storeFile, { encoding: 'utf-8' })
    const lines = contentMain.split(/\r?\n/g)
 
    const moduleIndex = lines.findIndex(line => line.match(/modules\:/))
    
    let found = false;
    let index = moduleIndex;
 
    while(!found){
      let modulo = lines[index+1];
      if(modulo.indexOf('}') !== -1) {
        var tabs = ((lines[index].match(new RegExp("\t", "g")) || []).length);
        var spaces = ((lines[index].match(new RegExp("\s", "g")) || []).length);
        found = true;
      }
      index++;
    }
    spaces = 4;
    
    lines.splice(index, 0, `${new Array(tabs).fill('\t').join('')}${new Array(spaces).fill(' ').join('')}[${nomeModuloUpperCase}_MODULE]: ${nomeModuloLowerCase}Module,`); 
    fs.writeFileSync(api.resolve(storeFile), lines.join(EOL), { encoding: 'utf-8' })
  })

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
  }) 
}






  

const fs = require('fs-extra');
const { EOL } = require('os');

module.exports = (api, nomeModulo, caminhoEArquivoStore) => {

    const nomeModuloLowerCase = nomeModulo.toLowerCase();
    const nomeModuloUpperCase = nomeModulo.toUpperCase();

    // Renderizar template store
    api.render('./templates-store', { nomeModulo, nomeModuloLowerCase });


    // Adicionar import de novo store em aquivo store.ts
    api.injectImports(caminhoEArquivoStore, `import ${nomeModuloLowerCase}Module, { ${nomeModuloUpperCase}_MODULE } from '@/store/modules/${nomeModuloLowerCase}/${nomeModuloLowerCase}Module';`);


    // Adicionar novo module store em arquivo store.ts
    api.afterInvoke(() => {
      const espacos = 4;
      const arquivoStore = api.resolve(caminhoEArquivoStore);
      const conteudoArquivo = fs.readFileSync(arquivoStore, { encoding: 'utf-8' })
      const lines = conteudoArquivo.split(/\r?\n/g)

      const modulesObj = lines.findIndex(line => line.match(/modules\:/))

      let found = false;
      let index = modulesObj;

      while(!found){
        let linhaObjModules = lines[index+1];
        if(linhaObjModules.indexOf('}') !== -1) {
          var tabs = ((lines[index].match(new RegExp("\t", "g")) || []).length);
          found = true;
        }
        index++;
      }

      const EspacosETabs = `${new Array(tabs).fill('\t').join('')}${new Array(espacos).fill(' ').join('')}`;

      lines.splice(index, 0, `${EspacosETabs}[${nomeModuloUpperCase}_MODULE]: ${nomeModuloLowerCase}Module,`);
      fs.writeFileSync(api.resolve(arquivoStore), lines.join(EOL), { encoding: 'utf-8' })
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
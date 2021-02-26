const fs = require('fs-extra')

module.exports = function(api, options) {

  const { module, pathFileStore } = options;


  // Renderizar template store
  api.render('./templates', { module });

  // Adicionar import de novo store em aquivo store.ts
  const nomeModuloLowerCase = module.toLowerCase();
  const nomeModuloUpperCase = module.toUpperCase();
  api.injectImports(pathFileStore, `import ${nomeModuloLowerCase}Module { ${nomeModuloUpperCase}_MODULE } from '@/store/modules/new-module/${nomeModuloLowerCase}Module';`)


  api.onCreateComplete(() => {
    // Renomear arquivos para name module escolhido no prompt 
    const caminhaArquivosStoresRenomeados = 'src/store/modules/new-module';
    const files = [
      {
        oldNameFile: `${caminhaArquivosStoresRenomeados}/newActions.ts`,
        newNameFile: `${caminhaArquivosStoresRenomeados}/${nomeModuloLowerCase}Actions.ts`
      },
      {
        oldNameFile: `${caminhaArquivosStoresRenomeados}/newGetters.ts`,
        newNameFile: `${caminhaArquivosStoresRenomeados}/${nomeModuloLowerCase}Getters.ts`
      },
      {
        oldNameFile: `${caminhaArquivosStoresRenomeados}/newModule.ts`,
        newNameFile: `${caminhaArquivosStoresRenomeados}/${nomeModuloLowerCase}Module.ts`
      },
      {
        oldNameFile: `${caminhaArquivosStoresRenomeados}/newMutations.ts`,
        newNameFile: `${caminhaArquivosStoresRenomeados}/${nomeModuloLowerCase}Mutations.ts`
      },
    ];

    files.forEach((file) => {
      console.log(`arquivo que será renomeado ${file.oldNameFile}`);
      console.log(`novo arquivo renomeado ${file.newNameFile}`);
      fs.rename(file.oldNameFile, file.newNameFile, function(err) {
        if ( err ) console.log('ERROR: ' + err);
      });
    })


    // Adicionar referencia do novo modulo em store
    fs.readFile(pathFileStore, 'utf-8', (err, data) => {
      if (err) throw err;

      var importNovoModulo = data.replace('/{(.*?)},/g', `[${nomeModuloUpperCase}_MODULE]: ${nomeModuloLowerCase}Module,`);
      
      fs.writeFile(pathFileStore, importNovoModulo, 'utf-8', function(err) {
        if (err) throw err;
      })
    })
   
  })  
}






  

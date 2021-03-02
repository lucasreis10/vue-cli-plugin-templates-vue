const { renameSync, rename } = require('fs-extra');

module.exports = (api, nomeNovoDiretorio, diretorioComponente, nomeComponente) => {

    // Renderizar template store
    if(diretorioComponente === 'novoDiretorio') {
      api.render('./templates-component', { nomeComponente });  
    } else {
      api.render('./templates-component/src/components/modules/new-componente/', { nomeComponente });  
    }
    
    api.onCreateComplete(() => {
      let pathParaRenomearArquivos = `src/components/modules/${diretorioComponente}`;
        if(diretorioComponente === 'novoDiretorio') {
            // Renomear diretorio para nome escolhido no prompt
            pathParaRenomearArquivos = `src/components/modules/${nomeNovoDiretorio}`
            renameSync('src/components/modules/new-componente', pathParaRenomearArquivos);
        } else {
            // Mover arqui novo para module escolhido no prompt
            renameSync('newComponente.vue', `${pathParaRenomearArquivos}/newComponente.vue`);
        }
        

        // Renomear arquivos para nome de componente escolhido no prompt
        rename(`${pathParaRenomearArquivos}/newComponente.vue`, `${pathParaRenomearArquivos}/${nomeComponente}.vue`);
      })

}
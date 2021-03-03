const fs = require('fs-extra');

module.exports = (api, nomeView) => {


    const caminhoArquivoRouter = 'src/router/router.ts';

    // Renderizar template store
    api.render('./templates-view', { nomeView });


    // Adicionar import de novo store em aquivo store.ts
    api.injectImports(caminhoArquivoRouter, `import ${nomeView} from '@/views/${nomeView}';`);


    // Adicionar novo module store em arquivo store.ts
    api.afterInvoke(() => {
    })

    
    api.onCreateComplete(() => {

      // Renomear arquivo view
      fs.renameSync('src/views/newView.vue', `src/views/${nomeView}.vue`);
    })

}
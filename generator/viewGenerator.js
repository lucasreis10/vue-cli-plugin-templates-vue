const fs = require('fs-extra');
const { EOL } = require('os')

module.exports = (api, nomeView) => {


    const caminhoArquivoRouter = 'src/router/router.ts';

    // Renderizar template store
    api.render('./templates-view', { nomeView });


    // Adicionar import de novo store em aquivo store.ts
    api.injectImports(caminhoArquivoRouter, `import ${nomeView} from '@/views/${nomeView}';`);


    // Adicionar novo module store em arquivo store.ts
    api.afterInvoke(() => {
        const arquivoRouter = api.resolve('src/router/router.ts');
        const conteudoArquivo = fs.readFileSync(arquivoRouter, { encoding: 'utf-8' })
        const lines = conteudoArquivo.split(/\r?\n/g)
        const index = lines.findIndex(line => line.match(/];/))

        lines.splice(index, 0, `\t{\n\t\tpath:'/${nomeView}', \n\t\tbeforeEnter: autenticar,\n\t\tcomponent: ${nomeView}, \n\t},`);

        fs.writeFileSync(api.resolve(arquivoRouter), lines.join(EOL), { encoding: 'utf-8' })
    })

    
    api.onCreateComplete(() => {

      // Renomear arquivo view
      fs.renameSync('src/views/newView.vue', `src/views/${nomeView}.vue`);
    })

}
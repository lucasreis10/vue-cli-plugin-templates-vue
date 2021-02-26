module.exports = function(api, options) {

  const { module } = options;


  api.render('./templates', { module });

  api.injectImports('ui/src/store/store.ts', `import newModule, { ${module}_MODULE } from '@/store/modules/new-module/newModule';`)

}

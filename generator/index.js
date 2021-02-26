module.exports = function(api, options) {

  const { module, pathFileStore } = options;


  api.render('./templates', { module });

  api.injectImports(pathFileStore, `import ${module.toLowerCase()}Module, { ${module}_MODULE } from '@/store/modules/new-module/newModule';`)

}

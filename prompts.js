module.exports = pkg => {
  const prompts = [
    {
      name: 'nomeModulo',
      type: 'input',
      message: 'Escolha nome do modulo para sua store',
      validade: input => !!input,
      default: 'NAME_MODULE'
    },
    {
      name: 'pathFileStore',
      type: 'input',
      message: 'Digite o caminho para o arquivo store.ts ou deixe o padrao',
      validade: input => !!input,
      default: 'src/store/store.ts'
    },
  ]

  // add dynamically prompt
  if ('@vue/cli-plugin-eslint' in (pkg.devDependencies || {})) {
    prompts.push({
      type: 'confirm',
      name: 'useESLintPluginVueI18n',
      message: 'Use ESLint plugin for Vue I18n ?'
    })
  }

  return prompts
}

module.exports = [
  {
    name: 'module',
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
    default: 'ui/src/store/store.ts'
  },
]
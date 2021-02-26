module.exports = [
  {
    name: 'module',
    type: 'input',
    message: 'Escolha nome do modulo para sua store',
    validade: input => !!input,
    default: 'NAME_MODULE'
  }
]
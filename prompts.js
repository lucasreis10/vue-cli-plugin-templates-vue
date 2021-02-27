module.exports = [
    {
      name: 'tipoTarefa',
      type: 'list',
      message: 'Escolha o tipo de terefa',
      default: '^11.0.0',
      choices: [
        {
          name: 'Criar module store Vuex',
          value: 'tarefaStore',
          short: 'Module store'
        },
        {
          name: 'Criar arquivos de teste',
          value: 'tarefaTeste',
          short: 'Arquivo de teste'
        },
      ],
      default: 'moduleStore'
    },
    {
      when: res => res.tipoTarefa === 'tarefaStore',
      name: 'nomeModulo',
      type: 'input',
      message: 'Escolha nome do modulo para sua store',
      validade: input => !!input,
      default: 'NAME_MODULE'
    },
    {
      when: res => res.tipoTarefa === 'tarefaStore',
      name: 'caminhoEArquivoStore',
      type: 'input',
      message: 'Digite o caminho para o arquivo store.ts ou deixe o padrao',
      validade: input => !!input,
      default: 'src/store/store.ts'
    },
]
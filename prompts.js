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
          name: 'Criar teste para module de store',
          value: 'tarefaTesteStore',
          short: 'Arquivo de teste'
        },
      ],
      default: 'tarefaStore'
    },

    // Tarefa criar module store Vuex
    {
      when: res => res.tipoTarefa === 'tarefaStore',
      name: 'nomeModulo',
      type: 'input',
      message: 'Digite o nome do modulo para store',
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

    // Tarefa criar teste para store
    {
      when: res => res.tipoTarefa === 'tarefaTesteStore',
      name: 'nomeTeste',
      type: 'input',
      message: 'Digite o nome do teste store',
      validade: input => !!input,
      default: 'NAME_TESTE'
    },
]
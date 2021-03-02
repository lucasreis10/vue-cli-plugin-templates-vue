const { statSync, readdirSync } = require('fs-extra');

module.exports = () => {

  const prompts = [
    {
      name: 'tipoTarefa',
      type: 'list',
      message: 'Escolha o tipo de terefa',
      choices: [
        {
          name: 'Modulo Store',
          short: 'Store',
          value: 'tarefaStore',
        },
        {
          name: 'Component',
          short: 'Component',
          value: 'tarefaComponente',
        },
        {
          name: 'View',
          short: 'view',
          value: 'tarefaView',
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
      type: 'list',
      message: 'Digite o caminho para o arquivo store.ts ou deixe o padrao',
      validade: input => !!input,
      default: 'src/store/store.ts'
    },

    // Tarefa criar component
    {
      when: res => res.tipoTarefa === 'tarefaComponente',
      name: 'diretorioComponente',
      type: 'list',
      message: 'Escolha a pasta onde o Componete serah criado',
      choices: lerPastasComponetes,
      default: 'novoDiretorio'
    },
    {
      when: res => res.diretorioComponente === 'novoDiretorio',
      name: 'nomeNovoDiretorio',
      type: 'input',
      message: 'Digite o nome do novo diretorio',
      default: 'novo'
    },
    {
      when: res => res.nomeNovoDiretorio || res.diretorioComponente,
      name: 'nomeComponente',
      type: 'input',
      message: 'Digite o nome do componente',
      default: 'novoComponente'
    },
  ];


  function lerPastasComponetes() {
    const path = 'src/components/modules';
    const diretorios = readdirSync(path)
    .filter(file => statSync(`${path}/${file}`).isDirectory())
    .map(nomeDiretorio => {
      return {
        name:  nomeDiretorio,
        short: nomeDiretorio,
        value: nomeDiretorio
      }
    });
    
    diretorios.unshift({
      name: 'Novo Diretorio',
      short: 'Novo Diretorio',
      value: 'novoDiretorio'
    });

    return diretorios;
  } 





  return prompts;
} 



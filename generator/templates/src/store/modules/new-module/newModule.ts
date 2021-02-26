import actions from './newActions';
import getters from './newGetters';
import mutations from './newMutations';

export const '<%- module %>'_ACTIONS_MODULE = '\'<%- module %>\'_ACTIONS_MODULE';

const state = {
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

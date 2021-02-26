import actions from './<%- nomeModuloLowerCase %>Actions';
import getters from './<%- nomeModuloLowerCase %>Getters';
import mutations from './<%- nomeModuloLowerCase %>Mutations';

export const <%- module %>_MODULE = '<%- module %>_MODULE';

const state = {
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};

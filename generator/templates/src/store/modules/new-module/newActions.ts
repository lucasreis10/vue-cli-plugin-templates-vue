import { ActionContext } from 'vuex';
import createRequestAction from '@/util/request-action/createRequestAction';
import HttpMethod from '@/util/request-action/HttpMethod';


export const <%- module %>_ACTIONS = {
  EXEMPLO_ACTIONS: 'EXEMPLO_ACTIONS',

};

export default {
  [<%- module %>_ACTIONS.EXEMPLO_ACTIONS](context: ActionContext<any, any>) {
    return createRequestAction(context, {
      httpMethod: HttpMethod.GET,
      url: '',
    });
  },
};

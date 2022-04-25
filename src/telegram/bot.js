/* istanbul ignore file */

import { setWebhook } from './webhooks';
import { messageReducer } from '../reducers/messageReducer';
import { callbackQueryReducer } from '../reducers/callbackQueryReducer';


export const Bot = {

  init: async () => {
    await setWebhook();
  },

  handleMessage: async (message) => {
    await messageReducer(message);
  },

  handleCallbackQuery: async(callback_query) => {
    await callbackQueryReducer(callback_query);
  }
};
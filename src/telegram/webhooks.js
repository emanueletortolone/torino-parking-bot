/* istanbul ignore file */

import axios from 'axios';

import {
  TELEGRAM_API,
  WEBHOOK_URL
} from '../config'


export const setWebhook = async () => {
  try {
    const response = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};
import axios from "axios";

import {
  TELEGRAM_API
} from '../config'


export const callbackQueryReducer = async (callback_query) => {
  const data = callback_query.data;
  const chat = callback_query.message.chat;
  const position = data.split('|');
  const latitude = position[0];
  const longitude = position[1];

  await axios.post(`${TELEGRAM_API}/sendLocation`, {
    chat_id: chat.id,
    latitude,
    longitude
  });
};
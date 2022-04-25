import axios from "axios";
import { getAll } from '../data/parkingDataProvider';
import {
  orderByNearest,
  filterByOkStatus
} from '../data/parkingDataSorter';

import {
  TELEGRAM_API
} from '../config'

import { parkingToButton } from '../mappers/parkingToButton';

const getParkingListButton = async (latitude, longitude) => {
  const parkingList = await getAll();
  const availableParkingList = filterByOkStatus(parkingList);
  const orderByNearestParkingList = orderByNearest(latitude, longitude, availableParkingList);

  return parkingToButton(
    orderByNearestParkingList.slice(0, 5),
    latitude, 
    longitude
    );
}

export const messageReducer = async (message) => {
  let responseOptions = {
    chat_id: message.chat.id || 0
  };

  if (
    message.location &&
    message.location.latitude &&
    message.location.longitude
  ) {
    try {
      const parkingList = await getParkingListButton(
        message.location.latitude,
        message.location.longitude);

      Object.assign(responseOptions, {
        text: 'Here is the list of the 5 nearest car parks right now.\r\n\nClick on each on to get the directions.',
        reply_markup: {
          inline_keyboard: parkingList,
          one_time_keyboard: true
        }
      });
    } catch (error) {
      Object.assign(responseOptions, {
        text: 'Ops, an error occurred.\r\nPlease try later.'
      });
    };
  } else {
    Object.assign(responseOptions, {
      text: 'Please send me your current position 📍'
    });
  }

  await axios.post(`${TELEGRAM_API}/sendMessage`, responseOptions);
};
import axios from 'axios';
import { jest } from '@jest/globals';

import {
  TELEGRAM_API
} from '../../src/config';

import {
  callbackQueryReducer
} from '../../src/reducers/callbackQueryReducer';

beforeEach(() => {
  jest.mock('axios');
  axios.post = jest.fn().mockResolvedValue('');
});

afterEach(()=>{
  jest.clearAllMocks();
});

describe('callbackQueryReducer', () => {
  it('should call the sendLocation API endpoint with an object argument', async () => {
    // ARRANGE
    const callback_query = {
      data: '45.031625|7.662682',
      message: {
        chat: {
          id: 2528597
        }
      }
    };

    // ACT
    const result = await callbackQueryReducer(callback_query);

    // ARRAGE
    expect(axios.post)
      .toHaveBeenCalledWith(
        `${TELEGRAM_API}/sendLocation`, {
        chat_id: 2528597,
        latitude: '45.031625',
        longitude:'7.662682'
      });
  });
});
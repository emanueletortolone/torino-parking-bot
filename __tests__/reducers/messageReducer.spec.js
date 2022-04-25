import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { jest } from '@jest/globals';

import { TELEGRAM_API } from '../../src/config';
import { messageReducer } from '../../src/reducers/messageReducer';


jest.mock('../../src/data/parkingDataProvider', () => ({
  __esModule: true,
  default: 'mockedDefaultExport',
  getAll: jest.fn(),
}));

let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
  mock.onPost(`${TELEGRAM_API}/sendMessage`).reply(200, '{ message: "ok" }');
});

afterEach(() => {
  mock.resetHistory();
  jest.restoreAllMocks();
});

afterAll(() => {
  mock.reset();
});

describe('messageReducer', () => {
  it('should call the sendMessage API endpoint with simple text if no location is available', async () => {
    // ARRANGE

    const message = {
      message_id: 289,
      from: {
        id: 596517809,
        is_bot: false,
        first_name: 'John Doe',
        username: 'jdoe',
        language_code: 'it'
      },
      chat: {
        id: 596517809,
        first_name: 'John Doe',
        username: 'jdoe',
        type: 'private'
      },
      date: 1651069318,
      text: 'hi!'
    };

    // ACT
    await messageReducer(message);

    // ASSERT
    expect(mock.history.post[0].data).toBe(JSON.stringify({
      chat_id: 596517809,
      text: 'Please send me your current position 📍'
    }));
  });

  it('should call the sendMessage API endpoint with reply_markup if location is available', async () => {
    // ARRANGE
    mock.onGet('https://opendata.5t.torino.it/get_pk')
      .reply(200, `
      <traffic_data>
        <PK_data Name="MONTI" ID="56" status="1" Total="156" Free="130" tendence="1" lat="45.04709" lng="7.68091"/>
        <PK_data Name="MERCATO CENTRALE" ID="57" status="1" Total="110" Free="75" tendence="1" lat="45.07768" lng="7.68379"/>
      </traffic_data>
      `);

    const message = {
      message_id: 289,
      from: {
        id: 596517809,
        is_bot: false,
        first_name: 'John Doe',
        username: 'jdoe',
        language_code: 'it'
      },
      chat: {
        id: 596517809,
        first_name: 'John Doe',
        username: 'jdoe',
        type: 'private'
      },
      date: 1651069318,
      location: {
        latitude: 45.0621537,
        longitude: 7.6782032
      }
    };

    const expectedParkingList = [
      [{
        text: '🟢 MONTI (1.7 km): 130 available',
        callback_data: '45.04709|7.68091'
      }],
      [{
        text: '🟢 MERCATO CENTRALE (1.8 km): 75 available',
        callback_data: '45.07768|7.68379'
      }]
    ];

    // ACT
    await messageReducer(message);

    // ASSERT
    expect(mock.history.post[0].data).toBe(JSON.stringify({
      chat_id: 596517809,
      text: 'Here is the list of the 5 nearest car parks right now.\r\n\nClick on each on to get the directions.',
      reply_markup: {
        inline_keyboard: expectedParkingList,
        one_time_keyboard: true
      }
    }));
  });

  it('should call the sendMessage API endpoint with an error message', async () => {
    // ARRANGE
    mock.onGet('https://opendata.5t.torino.it/get_pk')
      .reply(500, `Server Unavailable`);

    const message = {
      message_id: 289,
      from: {
        id: 596517809,
        is_bot: false,
        first_name: 'John Doe',
        username: 'jdoe',
        language_code: 'it'
      },
      chat: {
        id: 596517809,
        first_name: 'John Doe',
        username: 'jdoe',
        type: 'private'
      },
      date: 1651069318,
      location: {
        latitude: 45.0621537,
        longitude: 7.6782032
      }
    };

    // ACT
    await messageReducer(message);

    // ASSERT
    expect(mock.history.post[0].data).toBe(JSON.stringify({
      chat_id: 596517809,
      text: 'Ops, an error occurred.\r\nPlease try later.'
    }));
  });
});

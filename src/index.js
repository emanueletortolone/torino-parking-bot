/* istanbul ignore file */

import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';

import { Bot } from './telegram/bot';
import {
  URI
} from './config'

const app = express();
app.use(bodyParser.json());

// Helthz
app.get('/', function (req, res, next) {
  res.json({
    statusCode: 200,
    message: `🚀 ${process.env.NAME} app is running`
  });
  next();
});

// Webhook exposed to Telegram
app.post(URI, async (req, res) => {
  try {
    if (req.body.message) {
      await Bot.handleMessage(req.body.message);
    } else if (req.body.callback_query) {
      await Bot.handleCallbackQuery(req.body.callback_query);
    }
  } catch (error) {
    console.error(error.message);
  }
  return res.send();
});

// Initializer
const server = app.listen(process.env.PORT || 5000, async () => {
  await Bot.init();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  })
})
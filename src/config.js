/* istanbul ignore file */

import 'dotenv/config';

const { TOKEN, BASE_URL } = process.env;

export const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
export const URI = `/webhook/${TOKEN}`;
export const WEBHOOK_URL = `${BASE_URL}${URI}`;
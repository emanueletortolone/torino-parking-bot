/* istanbul ignore file */

import * as parser from 'xml2js';

const parserOptions = {
  explicitArray: false,
  mergeAttrs: true
};

export const parseXmlResponse = (text) => new Promise((resolve, reject) => {
  try {
    parser.parseString(text, { ...parserOptions }, (error, result) => {
      if (error) {
        console.error('Parsing XML: KO', error.message);
        return reject(error);
      }
      resolve(result.traffic_data.PK_data);
    });
  } catch (error) {
    console.error('Parsing XML: KO', error.message);
    reject(error);
  }
});
/* istanbul ignore file */

import axios from 'axios';
import { parseXmlResponse } from './parkingDataParser';

export const getAll = async () => {
  try{
    const res = await axios.get("https://opendata.5t.torino.it/get_pk");
    const data = await parseXmlResponse(res.data);
    return data;
  }
  catch(error){
    console.error(error.message);
  };
};
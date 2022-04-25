import { getDistanceFromLatLonInKm } from '../utils/math/trigo'

export const renderStatusIcon = (total, available) => {
  const percent = Math.round((100 * available) / total);
  let statusIcon;
  switch (true) {
    case percent > 15:
      statusIcon = '🟢';
      break;

    case (percent >= 1 && percent <= 15):
      statusIcon = '🟠';
      break;

    default:
      statusIcon = '🔴';
      break;
  }
  return statusIcon;
};

export const parkingToButton = (parkingList, latitude, longitude) => {
  return parkingList.map((item) => {
    return [{
      text: `${renderStatusIcon(item.Total, item.Free)} ${item.Name} (${getDistanceFromLatLonInKm(item.lat,item.lng, latitude,longitude).toFixed(1)} km): ${item.Free} available`,
      callback_data: `${item.lat}|${item.lng}`
    }];
  });
};
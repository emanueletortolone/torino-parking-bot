import { getDistanceFromLatLonInKm } from '../utils/math/trigo';

export const orderByFree = (parkingList) => {
  return parkingList.sort((a, b) => b.Free - a.Free);
};

export const filterByOkStatus = (parkingList) => {
  return parkingList.filter((item) => item.status !== '0');
};

export const orderByNearest = (latitude, longitude, parkingList) => {
  return parkingList.sort((a, b) => {
    return getDistanceFromLatLonInKm(latitude, longitude, a.lat, a.lng) - getDistanceFromLatLonInKm(latitude, longitude, b.lat, b.lng);
  });
};


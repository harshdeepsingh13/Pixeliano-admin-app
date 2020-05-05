import AsyncStorage from '@react-native-community/async-storage';
import config from '../config/config';

export const getToken = async () => {
  const item = await AsyncStorage.getItem(config.storageKey.userDetails);
  return (item && JSON.parse(item).token) ? JSON.parse(item).token : undefined;
};

export const saveItem = async (storageKey = config.storageKey.userDetails, payload = {}) => {
  await AsyncStorage.setItem(storageKey, JSON.stringify(payload));
  return 'done';
};

export const deleteItem = async (storageKey = config.storageKey.userDetails) => {
  await AsyncStorage.setItem(storageKey, JSON.stringify({}));
  return 'done';
};

export const getUserId = async () => {
  const item = await AsyncStorage.getItem(config.storageKey.userDetails);
  return (item && JSON.parse(item).userId) ? JSON.parse(item).userId : undefined;
};

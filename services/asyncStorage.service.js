import AsyncStorage from '@react-native-community/async-storage';
import config from '../config/config';

const defaultProperties = {
  isDefaultTagOnEdit: false, //are default tags to be added when the posts is edited.
};

export const getToken = async () => {
  const item = await AsyncStorage.getItem(config.storageKey.userDetails);
  return (item && JSON.parse(item).token) ? JSON.parse(item).token : undefined;
};

export const saveItem = async (storageKey = config.storageKey.userDetails, payload = {}) => {
  await AsyncStorage.setItem(
    storageKey,
    JSON.stringify({...payload, ...defaultProperties}),
  );
  return 'done';
};

export const deleteItem = async (storageKey = config.storageKey.userDetails) => {
  await AsyncStorage.setItem(storageKey, JSON.stringify({}));
  return 'done';
};

export const getItem = async (storageKey = config.storageKey.userDetails) => {
  const item = await AsyncStorage.getItem(storageKey);
  return item ? JSON.parse(item) : undefined;
};

export const getUserId = async () => {
  const item = await AsyncStorage.getItem(config.storageKey.userDetails);
  return (item && JSON.parse(item).userId) ? JSON.parse(item).userId : undefined;
};

export const getDefaultTags = async () => {
  const item = await AsyncStorage.getItem(config.storageKey.userDetails);
  return (item && JSON.parse(item).defaultTags) ? JSON.parse(item).defaultTags : undefined;
};

export const updateDefaultTags = async (storageKey = config.storageKey.userDetails, tags = []) => {
  const item = await AsyncStorage.getItem(storageKey);
  const userData = JSON.parse(item);
  userData.defaultTags = [...tags];
  await saveItem(config.storageKey.userDetails, {...userData});
};

export const updateDefaultTagOnEdit = async (storageKey = config.storageKey.userDetails, isDefaultTagOnEdit) => {
  const item = await AsyncStorage.getItem(storageKey);
  const userData = JSON.parse(item);
  defaultProperties.isDefaultTagOnEdit = isDefaultTagOnEdit;
  await saveItem(config.storageKey.userDetails, {...userData});
};

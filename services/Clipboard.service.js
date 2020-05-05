import Clipboard from '@react-native-community/clipboard';
import createToast from './createToast.service';

export const copyToClipboard = (data = '') => {
  Clipboard.setString(data);
  createToast('Copied to Clipboard', 'LONG');
};

import {ToastAndroid} from 'react-native';

export default (message, duration = 'SHORT') => {
  //duration either 'SHORT' or 'LONG'
  ToastAndroid.show(message, ToastAndroid[duration]);
}

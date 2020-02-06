import {verifyEmail} from './axios.service';

export default async email => {
  try {
    const {data: {data: {isEmailPresent}}} = await verifyEmail(email);
    return !isEmailPresent;
  } catch (e) {
    console.log('e', JSON.stringify(e));
  }
}

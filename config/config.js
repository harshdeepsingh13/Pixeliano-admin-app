const apiUrl = {
  homeLocalHostIP: 'http://192.168.1.15:8080/api/v1/',
  rnDaemon: 'http://10.0.2.2:8080/api/v1/',
  officeLocalHostIP: 'http://10.1.212.207:8080/api/v1/',
  herokuDev: 'https://broadcast-rss-dev.herokuapp.com/api/v1/',
  herokuProd: 'https://broadcast-rss.herokuapp.com/api/v1/',
};

const modes = ['dev', 'herokudev', 'prod'];

const mode = modes[2];

const getAPIUrl = mode => {
  switch (mode) {
    case modes[0]:
      return apiUrl.homeLocalHostIP;

    case modes[1]:
      return apiUrl.herokuDev;

    case modes[2]:
      return apiUrl.herokuProd;

    default:
      return '';
  }
};

export default {
  errorMessages: {
    requiredFieldEmpty: 'required field',
    emailNotFormatted: 'enter proper email id',
    emailAlreadyExists: 'this email already exists.',
    verifyPassword: 'passwords entered do not match',
    shortPassword: 'Password should be atleast 8 characters long, should be alpha-numeric and should have atleast one special character',
    websiteNotValid: 'website is not valid',
    contactNumberNotValid: 'Contact number entered is not valid',
    numberOutOfRange: 'the number entered is out of given range',
    APIresponseMessages: {
      login: {
        '404': 'Email or Password not valid',
        '500': 'Internal Error',
        '401': 'Email or Password not valid',
      },
      register: {
        '409': 'User with the given Email already exists',
        '500': 'Internal Error',
      },
      '500': 'Internal Error',
    },
  },
  emailRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  apiUrl: getAPIUrl(mode),
  status: {
    started: 'started',
    success: 'success',
    failed: 'failed',
    default: 'default',
  },
  storageKey: {
    userDetails: 'user',
  },
  cloudinary: {
    apiKey: '851184338949628',
    apiSecret: '0sIXpYfKjBO9XlDvX9AnZHvOLKw',
    secureDeliveryURL: 'https://res.cloudinary.com/harshdeep-singh/image/upload/',
    apiURL: 'https://api.cloudinary.com/v1_1/harshdeep-singh/',
    uploadPreset: `pixeliano_preset_${mode}`,
  },
  rssLink: `${getAPIUrl(mode)}listing/get/$userId$/posts`,
  instagramTagLimit: 27
};

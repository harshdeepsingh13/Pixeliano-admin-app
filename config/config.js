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
        '500': 'Internal Error'
      },
      register:{
        '409': "User with the given Email already exists",
        '500': 'Internal Error'
      },
      '500': 'Internal Error'
    },
  },
  emailRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  apiUrl: 'http://10.0.2.2:8080/api/v1/',
  status: {
    started: 'started',
    success: 'success',
    failed: 'failed',
    default: 'default',
  },
  storageKey: {
    userDetails: 'user',
  },
};

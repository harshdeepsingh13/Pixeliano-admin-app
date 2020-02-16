import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, ActivityIndicator} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import theme from '../../config/theme';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faAt, faCheck, faExclamationCircle, faICursor} from '@fortawesome/free-solid-svg-icons';
import Error from '../Error';
import config from '../../config/config';
import verifyEmailService from '../../services/verifyEmail.service';

library.add(faICursor, faAt, faCheck, faExclamationCircle);

const InputEmail = React.forwardRef(
  (props, ref) => {
    const {
      name,
      id,
      placeholder,
      value,
      handleChange: handleChangeFromProps,
      required,
      handleError,
      styles,
      checkValue,
      isEmpty,
      iconName,
      disabled,
      canBeCanceled,
      onCancel,
      contentType,
      capitalize,
      handleBlur,
      keyboardType,
      isNext,
      nextInputRef,
      returnKeyType,
      checkEmailRegex,
      toVerifyEmail
    } = props;

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [emailVerified, setEmailVerified] = useState({
      value: false,
      status: config.status.default,
    });

    useEffect(
      () => {
        required && handleError(name, isError);
      },
      [isError],
    );
    useEffect(
      () => {
        if (isEmpty) {
          setIsError(true);
          setErrorMessage(config.errorMessages.requiredFieldEmpty);
        } else {
          setIsError(false);
          setErrorMessage(config.errorMessages.requiredFieldEmpty);
        }
      },
      [isEmpty],
    );
    /*useEffect(
      () => {
        if (!emailVerified.value && !isError && !isEmpty) {
          setIsError(true);
          setErrorMessage(config.errorMessages.emailAlreadyExists);
        }
      },
      [emailVerified.value],
    );*/

    /*  const inputOnFocus = () => setBorderBottomColor(theme.light.primary);*/
    const inputOnBlur = (arg) => {
      // console.log('ar', arg.value);
      // handleBlur(ref.current.value);
    };
    const handleChange = ({
                            nativeEvent: {
                              text: value,
                            },
                          }) => {
      if (required && value === '') {
        setIsError(true);
        setErrorMessage(config.errorMessages.requiredFieldEmpty);
      } else {
        const [isError, errorMessage] = checkValue(value, checkEmailRegex);
        if (isError) {
          setIsError(true);
          setErrorMessage(errorMessage);
        } else {
          setIsError(false);
          setErrorMessage('');
        }
      }
      handleChangeFromProps({name, value});
    };
    const inputOnSubmitEditing = () => {
      isNext && nextInputRef.current.focus();
    };
    const inputOnEndEditing = async ({
                                       nativeEvent: {
                                         text: value,
                                       },
                                     }) => {
      if (!isError && !isEmpty && toVerifyEmail) {
        setEmailVerified({...emailVerified, status: config.status.started});
        const isEmailVerified = await verifyEmailService(value);
        console.log('em', isEmailVerified);
        setEmailVerified({...emailVerified, status: config.status.success, value: isEmailVerified});
      }

    };

    return (
      <View style={style.inputFieldsContainer}>
        <View style={style.fieldContainer} pointerEvents={disabled ? 'none' : 'auto'}>
          <FontAwesomeIcon
            icon={iconName}
            color={
              (isError) ?
                'red' :
                theme.basicColors.blueyGrey
            }
            className="icon"
            style={
              {
                ...style.icon,
                opacity: disabled ?
                  0.4 :
                  1,
              }
            }
          />
          <TextInput
            name={name}
            id={id}
            placeholder={`${placeholder}${required ? '*' : ''}`}
            value={value}
            editable={!disabled}
            style={
              {
                ...styles,
                ...style.field,
                opacity: disabled ? 0.4 : 1,
              }
            }
            underlineColorAndroid={isError ? 'red' : theme.light.primary}
            ref={ref}
            autoCapitalize={capitalize}
            textContentType={contentType}
            keyboardType={keyboardType}
            blurOnSubmit={!isNext}
            returnKeyType={returnKeyType}
            onChange={handleChange}
            onSubmitEditing={inputOnSubmitEditing}
            onBlur={inputOnBlur}
            onEndEditing={inputOnEndEditing}
          />
          {
            emailVerified.status === config.status.started &&
            <ActivityIndicator
              color={theme.light.primaryDark}
            />
          }
          {
            emailVerified.status === config.status.success && emailVerified.value &&
            <FontAwesomeIcon
              icon={'check'}
              color={theme.basicColors.successGreen}
            />
          }
          {
            emailVerified.status === config.status.success && !emailVerified.value &&
            <FontAwesomeIcon
              icon={'exclamation-circle'}
              color={'red'}
            />
          }
        </View>

        <View style={style.errorContainer}>
          {
            isError &&
            <Error
              message={errorMessage}
              styles={
                {
                  textAlign: 'right',
                }
              }
            />
          }
        </View>
      </View>
    );
  },
);

InputEmail.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  required: PropTypes.bool,
  handleError: PropTypes.func,
  styles: PropTypes.object,
  checkValue: PropTypes.func,
  isEmpty: PropTypes.bool,
  iconName: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]),
  disabled: PropTypes.bool,
  canBeCanceled: PropTypes.bool,
  onCancel: PropTypes.func,
  contentType: PropTypes.oneOf([
    'none',
    'URL',
    'addressCity',
    'addressCityAndState',
    'addressState',
    'countryName',
    'creditCardNumber',
    'emailAddress',
    'familyName',
    'fullStreetAddress',
    'givenName',
    'jobTitle',
    'location',
    'middleName',
    'name',
    'namePrefix',
    'nameSuffix',
    'nickname',
    'organizationName',
    'postalCode',
    'streetAddressLine1',
    'streetAddressLine2',
    'sublocality',
    'telephoneNumber',
    'username',
    'password',
    'newPassword',
    'oneTimeCode',
  ]),
  capitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
  handleBlur: PropTypes.func,
  keyboardType: PropTypes.oneOf([
    'default',
    'email-address',
    'numeric',
    'phone-pad',
    'ascii-capable',
    'numbers-and-punctuation',
    'url',
    'number-pad',
    'name-phone-pad',
    'decimal-pad',
    'twitter',
    'web-search',
    'visible-password',
  ]),
  isNext: PropTypes.bool,
  nextInputRef: PropTypes.any,
  returnKeyType: PropTypes.oneOf([
    'done',
    'go',
    'next',
    'search',
    'send',
    'none',
    'previous',
    'default',
    'emergency-call',
    'google',
    'join',
    'route',
    'yahoo',
  ]),
  checkEmailRegex: PropTypes.bool,
  toVerifyEmail: PropTypes.bool
};

InputEmail.defaultProps = {
  name: 'inputText',
  id: 'inputText',
  placeholder: 'Input Type Text',
  value: '',
  handleChange: () => console.log('Input Type Text'),
  required: false,
  handleError: () => console.log('Input Type Text Error'),
  styles: {},
  checkValue: (email, checkEmailRegex) =>
    checkEmailRegex ?
    (email.match(config.emailRegex) ?
      [false, ''] :
      [true, config.errorMessages.emailNotFormatted]) : [false, ''],
  checkEmailRegex: true,
  isEmpty: false,
  iconName: 'at',
  disabled: false,
  canBeCanceled: false,
  onCancel: () => console.log('Input Type Text OnCancel'),
  contentType: 'emailAddress',
  capitalize: 'sentences',
  handleBlur: () => console.log('Input Text Blurr'),
  keyboardType: 'email-address',
  isNext: false,
  nextInputRef: undefined,
  returnKeyType: 'done',
  toVerifyEmail: true
};

InputEmail.navigationOptions = {};

export default InputEmail;

import React, {useEffect, useState} from 'react';
import {TextInput, TouchableNativeFeedback, View} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import theme from '../../config/theme';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faAt, faClosedCaptioning, faICursor, faKey} from '@fortawesome/free-solid-svg-icons';
import Error from '../Error';
import config from '../../config/config';
import {faEye} from '@fortawesome/free-regular-svg-icons';

library.add(faICursor, faAt, faEye, faKey, faClosedCaptioning);

const InputText = React.forwardRef(
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
      secureTextEntry,
      canBeVisible,
      onVisible,
      toSubmitOnReturnKey,
      handleOnSubmitEditing,
      multiline,
      numberOfLines,
    } = props;
    const textInputStylesArr = [
      style.field,
      styles,
      {opacity: disabled ? 0.4 : 1},
    ];
    multiline && textInputStylesArr.push({height: 20 * numberOfLines});

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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

    /*  const inputOnFocus = () => setBorderBottomColor(theme.light.primary);*/
    const inputOnBlur = () => {
      handleBlur();
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
        const [isError, errorMessage] = checkValue(value);
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
      toSubmitOnReturnKey && handleOnSubmitEditing();
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
            style={textInputStylesArr}
            underlineColorAndroid={isError ? 'red' : theme.light.primary}
            ref={ref}
            autoCapitalize={capitalize}
            textContentType={contentType}
            keyboardType={keyboardType}
            blurOnSubmit={!isNext}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            numberOfLines={multiline ? numberOfLines : 1}
            scrollEnabled={multiline}
            onChange={handleChange}
            onSubmitEditing={inputOnSubmitEditing}
          />
          {
            secureTextEntry && canBeVisible &&
            <TouchableNativeFeedback
              onPress={() => {
                onVisible(keyboardType !== 'visible-password');
              }}
            >
              <FontAwesomeIcon
                icon={['far', 'eye']}
                color={theme.text.greyMedium}
                style={{
                  alignSelf: 'flex-start',
                  // width: 100,
                  paddingTop: 20,
                  paddingBottom: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                  // backgroundColor: 'red',
                }}
              />
            </TouchableNativeFeedback>
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

InputText.propTypes = {
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
  secureTextEntry: PropTypes.bool,
  canBeVisible: PropTypes.bool,
  onVisible: PropTypes.func,
  handleOnSubmitEditing: PropTypes.func,
  toSubmitOnReturnKey: PropTypes.bool,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number,
};

InputText.defaultProps = {
  name: 'inputText',
  id: 'inputText',
  placeholder: 'Input Type Text',
  value: '',
  handleChange: () => console.log('Input Type Text'),
  required: false,
  handleError: () => console.log('Input Type Text Error'),
  styles: {},
  checkValue: () => [false, ''],
  isEmpty: false,
  iconName: 'i-cursor',
  disabled: false,
  canBeCanceled: false,
  onCancel: () => console.log('Input Type Text OnCancel'),
  contentType: 'none',
  capitalize: 'sentences',
  handleBlur: () => console.log('Input Text Blurr'),
  keyboardType: 'default',
  isNext: false,
  nextInputRef: undefined,
  returnKeyType: 'done',
  secureTextEntry: false,
  canBeVisible: false,
  onVisible: () => console.log('Input Text onVisible'),
  handleOnSubmitEditing: () => console.log('Input Text submit editing'),
  toSubmitOnReturnKey: false,
  multiline: false,
  numberOfLines: 4,
};

InputText.navigationOptions = {};

export default InputText;

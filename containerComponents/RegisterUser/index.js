import React, {useState, useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import style from './styles.js';
import PropTypes from 'prop-types';
import InputText from '../../components/BasicUIElements/InputText';
import config from '../../config/config';
import InputEmail from '../../components/BasicUIElements/InputEmail';
import Button from '../../components/BasicUIElements/Button';
import verifyFormFields from '../../services/verifyFormFields.service';
import Error from '../../components/Error';
import {registerNewUser} from '../../services/axios.service';
import createToast from '../../services/createToast.service';

const RegisterUser = props => {

  const [name, setName] = useState({
    value: '',
    isError: false,
    isEmpty: false,
  });
  const [email, setEmail] = useState({
    value: '',
    isError: false,
    isEmpty: false,
    isVerified: undefined,
  });
  const [password, setPassword] = useState({
    value: '',
    isError: false,
    isEmpty: false,
    setPasswordVisible: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    isError: false,
    isEmpty: false,
  });
  const [registerUserStatus, setRegisterUserStatus] = useState({
    status: config.status.default,
    errorMessage: '',
  });

  let emailRef = useRef(undefined);
  let passwordRef = useRef(undefined);
  let confirmPasswordRef = useRef(undefined);

  useEffect(
    () => {
      if (registerUserStatus.status === config.status.success) {
        createToast('New user register successfully.', 'LONG');
        props.navigation.goBack();
      }
    },
    [registerUserStatus.status],
  );

  const handleChange = ({name, value}) => {
    if ((name === 'password' || name === 'confirmPassword') && registerUserStatus.errorMessage === config.errorMessages.verifyPassword) {
      setRegisterUserStatus({...registerUserStatus, status: config.status.default, errorMessage: ''});
    }
    name === 'name' && setName({...name, value});
    name === 'email' && setEmail({...email, value});
    name === 'password' && setPassword({...password, value});
    name === 'confirmPassword' && setConfirmPassword({...confirmPassword, value});
  };
  const handleError = ({name, isError}) => {
    name === 'name' && setName({...name, isError});
    name === 'email' && setEmail({...email, isError});
    name === 'password' && setPassword({...password, isError});
    name === 'confirmPassword' && setConfirmPassword({...confirmPassword, isError});
  };
  const handleRegisterUser = async () => {
    const emptyFormFields = verifyFormFields({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!emptyFormFields.length) {
      if (password.value !== confirmPassword.value) {
        setRegisterUserStatus({
          ...registerUserStatus,
          status: config.status.failed,
          errorMessage: config.errorMessages.verifyPassword,
        });
      } else {
        try {
          setRegisterUserStatus({...registerUserStatus, status: config.status.started});
          await registerNewUser({
            email: email.value,
            name: name.value,
            password: password.value,
          });
          setRegisterUserStatus({...registerUserStatus, status: config.status.success});
        } catch (e) {
          if (e.isAxiosError && e.response) {
            setRegisterUserStatus({
              ...registerUserStatus,
              status: config.status.failed,
              errorMessage: config.errorMessages.APIresponseMessages.register[e.response.data.status],
            });
          } else {
            setRegisterUserStatus({
              ...registerUserStatus,
              status: config.status.failed,
              errorMessage: config.errorMessages.APIresponseMessages[500],
            });
          }
        }
      }
    } else {
      for (let fieldName of emptyFormFields) {
        fieldName === 'name' && setName({...name, isEmpty: true});
        fieldName === 'email' && setEmail({...email, isEmpty: true});
        fieldName === 'password' && setPassword({...password, isEmpty: true});
        fieldName === 'confirmPassword' && setConfirmPassword({...confirmPassword, isEmpty: true});
      }
    }
  };

  return (
    <>
      {
        registerUserStatus.status === config.status.failed &&
        <Error
          errorType={'displayError'}
          message={registerUserStatus.errorMessage}
        />
      }
      <View style={style.registerContainer}>
        <InputText
          name={'name'}
          id={'name'}
          value={name.value}
          required={true}
          placeholder={'Full Name'}
          isEmpty={name.isEmpty}
          contentType={'name'}
          capitalize={'words'}
          handleChange={handleChange}
          handleError={handleError}
          isNext={true}
          nextInputRef={emailRef}
          returnKeyType={'next'}
        />
        <InputEmail
          name={'email'}
          id={'email'}
          value={email.value}
          required={true}
          placeholder={'Email ID'}
          isEmpty={email.isEmpty}
          handleChange={handleChange}
          handleError={handleError}
          ref={emailRef}
          returnKeyType={'next'}
          isNext={true}
          nextInputRef={passwordRef}
          toVerifyEmail={true}
        />
        <InputText
          name={'password'}
          id={'password'}
          value={password.value}
          required={true}
          placeholder={'Password'}
          isEmpty={password.isEmpty}
          contentType={'password'}
          handleChange={handleChange}
          handleError={handleError}
          isNext={true}
          nextInputRef={confirmPasswordRef}
          returnKeyType={'next'}
          ref={passwordRef}
          secureTextEntry={true}
          canBeVisible={true}
          iconName={'key'}
          keyboardType={password.setPasswordVisible ? 'visible-password' : 'default'}
          onVisible={(visible = true) => {
            setPassword({...password, setPasswordVisible: visible});
          }}
          /*checkValue={value =>
            confirmPassword.value.length ?
              value === confirmPassword.value ?
                [false, ''] :
                [true, config.errorMessages.verifyPassword] :
              [false, '']
          }*/
        />
        <InputText
          name={'confirmPassword'}
          id={'confirmPassword'}
          value={confirmPassword.value}
          required={true}
          placeholder={'Confirm Password'}
          isEmpty={confirmPassword.isEmpty}
          contentType={'password'}
          handleChange={handleChange}
          handleError={handleError}
          toSubmitOnReturnKey={true}
          handleOnSubmitEditing={() => {
          }}
          returnKeyType={'done'}
          ref={confirmPasswordRef}
          secureTextEntry={true}
          iconName={'key'}
          checkValue={value =>
            password.value.length ?
              password.value === value ?
                [false, ''] :
                [true, config.errorMessages.verifyPassword] :
              [false, '']
          }
        />
        <Button
          theme={'primary'}
          text={'Submit'}
          styles={
            {
              width: 200,
              marginTop: 9,
            }
          }
          handleClick={handleRegisterUser}
          showActivityIndicator={registerUserStatus === config.status.started}
        />
      </View>
    </>
  );
};

RegisterUser.propTypes = {};

export default RegisterUser;

import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import style from './styles.js';
import InputText from '../../components/BasicUIElements/InputText';
import InputEmail from '../../components/BasicUIElements/InputEmail';
import Button from '../../components/BasicUIElements/Button';
import verifyFormFields from '../../services/verifyFormFields.service';
import {signInUser} from '../../services/axios.service';
import {saveItem} from '../../services/asyncStorage.service';
import config from '../../config/config';
import resetStackWithNavigationRoute from '../../services/resetStackWithNavigateRoute.service';
import Error from '../../components/Error';

const SignIn = props => {

  const [email, setEmail] = useState({
    value: '',
    isError: false,
    isEmpty: false,
  });
  const [password, setPassword] = useState({
    value: '',
    isError: false,
    isEmpty: false,
    setPasswordVisible: false,
  });
  const [signInStatus, setSignInStatus] = useState({
    status: config.status.default,
    errorMessage: '',
  });

  const passwordRef = useRef(undefined);

  const handleChange = ({name, value}) => {
    name === 'email' && setEmail({...email, value});
    name === 'password' && setPassword({...password, value});
  };
  const handleError = ({name, isError}) => {
    name === 'email' && setEmail({...email, isError});
    name === 'password' && setPassword({...password, isError});
  };
  const handleSignIn = async () => {
    const emptyFormFields = verifyFormFields({
      email,
      password,
    });
    if (!emptyFormFields.length) {
      let userData;
      try {
        setSignInStatus({...signInStatus, status: config.status.started});
        const {data: {data}} = await signInUser(email.value, password.value);
        userData = data;
        setSignInStatus({...signInStatus, status: config.status.success});

        await saveItem(config.storageKey.userDetails, {
          email: userData.email,
          name: userData.name,
          token: userData.token,
        });
        resetStackWithNavigationRoute(props.navigation, 'Dashboard');
      } catch (e) {
        console.log('e', Object.keys(e), e.isAxiosError);
        if (e.isAxiosError && e.response) {
          setSignInStatus({
            ...signInStatus,
            status: config.status.failed,
            errorMessage: config.errorMessages.APIresponseMessages.login[e.response.data.status],
          });
          console.log('ee', e.response.data);
        } else {
          setSignInStatus({
            ...signInStatus,
            status: config.status.failed,
            errorMessage: config.errorMessages.APIresponseMessages[500]
          })
        }
      }

    } else {
      console.log('else');
      for (let fieldName of emptyFormFields) {
        fieldName === 'email' && setEmail({...email, isEmpty: true});
        fieldName === 'password' && setPassword({...password, isEmpty: true});
      }
    }
  };
  const handleNewRegister = () => {
    props.navigation.push('RegisterUser');
  };

  return (
    <>
      {
        signInStatus.status === config.status.failed &&
        <Error
          errorType={'displayError'}
          message={signInStatus.errorMessage}
        />
      }
      <View style={style.signInContainer}>
        <InputEmail
          name={'email'}
          id={'email'}
          nextInputRef={passwordRef}
          isNext={true}
          returnKeyType={'next'}
          placeholder={'Email'}
          required={true}
          isEmpty={email.isEmpty}
          value={email.value}
          checkEmailRegex={false}
          toVerifyEmail={false}
          handleChange={handleChange}
          handleError={handleError}
        />
        <InputText
          name={'password'}
          id={'password'}
          ref={passwordRef}
          iconName={'key'}
          value={password.value}
          isEmpty={password.isEmpty}
          required={true}
          placeholder={'Password'}
          secureTextEntry={true}
          canBeVisible={true}
          keyboardType={password.setPasswordVisible ? 'visible-password' : 'default'}
          onVisible={(visible = true) => {
            setPassword({...password, setPasswordVisible: visible});
          }}
          toSubmitOnReturnKey={true}
          handleOnSubmitEditing={handleSignIn}
          handleChange={handleChange}
          handleError={handleError}
        />
        <Button
          styles={
            {
              width: 300,
              marginTop: 9,
            }
          }
          text={'Sign In'}
          handleClick={handleSignIn}
          showActivityIndicator={signInStatus.status === config.status.started}
        />
        <Button
          styles={
            {
              width: 200,
              marginTop: 9,
            }
          }
          text={'Register New User'}
          handleClick={handleNewRegister}
          theme={'secondary'}
        />
      </View>
    </>
  );
};

SignIn.propTypes = {};

export default SignIn;

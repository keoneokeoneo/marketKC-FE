import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { PALETTE } from '../../constants/color';
import { SignInProps } from '../../types/ScreenProps';
import PressableIcon from '../../components/PressableIcon';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import NoticeModal from '../../components/Modal/NoticeModal';
import { SignInSchema } from '../../constants/schema';
import { RootState } from '../../store/reducer';
import { LoginReq } from '../../utils/api/auth/types';
import { loginThunk } from '../../store/auth/thunk';
import {
  findCurrentLocationThunk,
  loadUserThunk,
} from '../../store/user/thunk';
import { loginInit } from '../../store/auth/action';
import { loadCategoriesThunk } from '../../store/category';
import Geolocation from 'react-native-geolocation-service';

interface FormInput {
  email: string;
  password: string;
}

const SignIn = ({ navigation }: SignInProps) => {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(SignInSchema),
  });
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const onSubmit = (data: FormInput) => {
    const loginData: LoginReq = {
      username: data.email,
      password: data.password,
    };
    dispatch(loginThunk(loginData));
  };

  const requestLocationPermission = async () => {
    try {
      return await Geolocation.requestAuthorization('whenInUse');
    } catch (e) {
      console.log(e);
    }
  };

  const getLocation = () => {
    requestLocationPermission().then(res => {
      if (res === 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            dispatch(
              findCurrentLocationThunk(
                pos.coords.longitude,
                pos.coords.latitude,
              ),
            );
          },
          err => {
            console.log(err);
          },
          { enableHighAccuracy: true, timeout: 3600, maximumAge: 3600 },
        );
      }
    });
  };

  useEffect(() => {
    if (authState.login.error && !authState.validation.data) {
      setModalOpen(true);
    } else {
      if (authState.login.data && authState.validation.data) {
        dispatch(loginInit());
        dispatch(loadUserThunk(authState.validation.data.id));
        dispatch(loadCategoriesThunk());
        getLocation();
        navigation.navigate('Main', {
          screen: 'Home',
          params: { screen: 'Feed' },
        });
        reset();
      }
    }
  }, [authState.login.error, authState.login.data, authState.validation.data]);

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <NoticeModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            dispatch(loginInit());
          }}
          content={authState.login.error ? authState.login.error : ''}
        />
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>Market</Text>
            <Text style={styles.logo}>KC</Text>
          </View>
          <View style={styles.input}>
            <View
              style={[
                styles.inputContainer,
                errors.email && { borderColor: PALETTE.error },
              ]}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.inputText,
                      errors.email && { borderColor: PALETTE.error },
                    ]}
                    placeholder="YourEmail@smarcet.com"
                    placeholderTextColor={PALETTE.grey}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
            </View>
            <Text style={styles.inputError}>
              {errors.email && errors.email.message}
            </Text>
          </View>
          <View style={styles.input}>
            <View
              style={[
                styles.inputContainer,
                errors.password && { borderColor: PALETTE.error },
              ]}>
              <Controller
                name="password"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.inputText}
                    placeholder="Your Password"
                    placeholderTextColor={PALETTE.grey}
                    secureTextEntry={!visible}
                    value={value}
                    onChangeText={value => onChange(value)}
                    onBlur={onBlur}
                  />
                )}
              />
              {!visible ? (
                <PressableIcon
                  name="eye"
                  size={16}
                  onPress={() => setVisible((prev: boolean) => !prev)}
                />
              ) : (
                <PressableIcon
                  name="eye-off"
                  size={16}
                  onPress={() => setVisible((prev: boolean) => !prev)}
                />
              )}
            </View>
            <Text style={styles.inputError}>
              {errors.password && errors.password.message}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <View style={styles.join}>
            <Text style={[styles.joinText]}>Don't you have any account?</Text>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.navigate('SignUp');
                reset();
                dispatch(loginInit());
              }}>
              <Text
                style={[
                  styles.joinText,
                  { color: PALETTE.main, fontWeight: 'bold' },
                ]}>
                Join Us!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.bg2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 48,
    color: PALETTE.main,
    marginHorizontal: 4,
    marginBottom: 40,
  },
  input: {
    width: '80%',
    justifyContent: 'center',
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderColor: PALETTE.line1,
    borderWidth: 1,
    justifyContent: 'space-between',
  },
  inputText: {
    flex: 1,
    fontWeight: '500',
    color: PALETTE.line1,
    paddingHorizontal: 4,
  },
  inputError: {
    color: PALETTE.error,
    alignSelf: 'flex-start',
    padding: 4,
    marginTop: 4,
    fontSize: 11,
  },

  button: {
    width: '80%',
    backgroundColor: PALETTE.main,
    borderRadius: 28,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  join: { flexDirection: 'row', marginTop: 14 },
  joinText: { marginHorizontal: 2, color: PALETTE.line1 },
});

export default SignIn;

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
import { SignUpProps } from '../../types/ScreenProps';
import PressableIcon from '../../components/PressableIcon';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import NoticeModal from '../../components/Modal/NoticeModal';
import { SignUpSchema } from '../../constants/schema';
import { RootState } from '../../store/reducer';
import { RegisterReq } from '../../utils/api/auth/types';
import { registerThunk } from '../../store/auth/thunk';
import { registerInit } from '../../store/auth/action';

interface FormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = ({ navigation }: SignUpProps) => {
  const [visible, setVisible] = useState({
    pwd: false,
    confirmPwd: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(SignUpSchema),
  });
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const onClose = () => {
    setModalOpen(false);
    if (!authState.register.error) {
      navigation.navigate('SignIn');
      dispatch(registerInit());
      reset();
    }
  };

  const onSubmit = (data: FormInput) => {
    const regData: RegisterReq = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    dispatch(registerThunk(regData));
  };

  useEffect(() => {
    if (authState.register.error || authState.register.data) {
      setModalOpen(true);
    }
  }, [authState.register.error, authState.register.data]);

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <NoticeModal
          isOpen={modalOpen}
          onClose={onClose}
          content={
            authState.register.error
              ? authState.register.error
              : authState.register.data
              ? authState.register.data
              : ''
          }
        />
        <View style={styles.container}>
          <Text style={styles.logo}>Join Us!</Text>
          <View style={styles.input}>
            <View
              style={[
                styles.inputContainer,
                errors.email && { borderColor: PALETTE.error },
              ]}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.inputText,
                      errors.name && { borderColor: PALETTE.error },
                    ]}
                    placeholder="Your Nickname"
                    placeholderTextColor={PALETTE.grey}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    autoCapitalize="none"
                  />
                )}
              />
            </View>
            <Text style={styles.inputError}>
              {errors.name && `* ${errors.name.message}`}
            </Text>
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
                    placeholder="YourEmail@market.kc"
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
              {errors.email && `* ${errors.email.message}`}
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
                    secureTextEntry={!visible.pwd}
                    value={value}
                    onChangeText={value => onChange(value)}
                    onBlur={onBlur}
                  />
                )}
              />

              {!visible.pwd ? (
                <PressableIcon
                  name="eye"
                  size={16}
                  color={PALETTE.grey}
                  mh={2}
                  onPress={() =>
                    setVisible(prev => ({ ...prev, pwd: !prev.pwd }))
                  }
                />
              ) : (
                <PressableIcon
                  name="eye-off"
                  size={16}
                  color={PALETTE.grey}
                  mh={2}
                  onPress={() =>
                    setVisible(prev => ({ ...prev, pwd: !prev.pwd }))
                  }
                />
              )}
            </View>
            <Text style={styles.inputError}>
              {errors.password && errors.password.message}
            </Text>
          </View>
          <View style={styles.input}>
            <View
              style={[
                styles.inputContainer,
                errors.confirmPassword && { borderColor: PALETTE.error },
              ]}>
              <Controller
                name="confirmPassword"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.inputText}
                    placeholder="Confirm Password"
                    placeholderTextColor={PALETTE.grey}
                    secureTextEntry={!visible.confirmPwd}
                    value={value}
                    onChangeText={value => onChange(value)}
                    onBlur={onBlur}
                  />
                )}
              />

              {!visible.confirmPwd ? (
                <PressableIcon
                  name="eye"
                  size={16}
                  color={PALETTE.grey}
                  mh={2}
                  onPress={() =>
                    setVisible(prev => ({
                      ...prev,
                      confirmPwd: !prev.confirmPwd,
                    }))
                  }
                />
              ) : (
                <PressableIcon
                  name="eye-off"
                  size={16}
                  color={PALETTE.grey}
                  mh={2}
                  onPress={() =>
                    setVisible(prev => ({
                      ...prev,
                      confirmPwd: !prev.confirmPwd,
                    }))
                  }
                />
              )}
            </View>
            <Text style={styles.inputError}>
              {errors.confirmPassword && errors.confirmPassword.message}
            </Text>
          </View>
          <View style={{ marginBottom: 30 }} />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignIn');
              dispatch(registerInit());
              reset();
            }}
            style={[
              styles.button,
              {
                backgroundColor: PALETTE.bg2,
                borderColor: PALETTE.line1,
                borderWidth: 1,
              },
            ]}>
            <Text style={[styles.buttonText, { color: PALETTE.line1 }]}>
              Sign In
            </Text>
          </TouchableOpacity>
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
  logo: {
    fontWeight: 'bold',
    fontSize: 32,
    color: PALETTE.main,
    marginHorizontal: 4,
    marginBottom: 40,
  },
  input: {
    width: '80%',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingBottom: 8,
    borderRadius: 16,
    justifyContent: 'space-between',
    borderBottomColor: PALETTE.line1,
    borderBottomWidth: 1,
    marginTop: 15,
  },
  inputText: {
    flex: 1,
    fontWeight: '500',
    color: PALETTE.line1,
    paddingHorizontal: 4,
    fontSize: 17,
  },
  inputError: {
    color: PALETTE.error,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 11,
  },
  button: {
    width: '80%',
    backgroundColor: PALETTE.main,
    borderRadius: 28,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default SignUp;

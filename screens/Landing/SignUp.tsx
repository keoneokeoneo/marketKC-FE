import React, { useState } from 'react';
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
import { ISignUp } from '../../types/ScreenProps';
import PressableIcon from '../../components/PressableIcon';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { RegData, REGISTER_USER } from '../../store/types';
import { registerUser } from '../../store/actions/userAction';

interface FormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpSchema = yup.object().shape({
  name: yup.string().required('필수 입력 항목입니다'),
  email: yup
    .string()
    .email('이메일 형식을 맞춰주세요')
    .required('필수 입력 항목입니다'),
  password: yup
    .string()
    .required('필수 입력 항목입니다')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#^&])[A-Za-z\d@$!%*?#^&]{8,}$/,
      '대/소문자, 숫자, 특수문자가 포함된 8자 이상',
    ),
  confirmPassword: yup
    .string()
    .required('필수 입력 항목입니다')
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다'),
});

const SignUp = ({ navigation }: ISignUp) => {
  const [visible, setVisible] = useState({
    pwd: false,
    confirmPwd: false,
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(SignUpSchema),
  });
  const dispatch = useDispatch();

  const onSubmit = (data: FormInput) => {
    console.log(data);
    const regData: RegData = {
      userName: data.name,
      userEmail: data.email,
      userPW: data.password,
    };
    dispatch(registerUser(regData));
  };

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
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
                  />
                )}
              />
            </View>
            <Text style={styles.inputError}>
              {errors.name && errors.name.message}
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
                    secureTextEntry={visible.pwd}
                    value={value}
                    onChangeText={value => onChange(value)}
                    onBlur={onBlur}
                  />
                )}
              />

              {visible.pwd ? (
                <PressableIcon
                  name="eye"
                  size={16}
                  onPress={() =>
                    setVisible(prev => ({ ...prev, pwd: !prev.pwd }))
                  }
                />
              ) : (
                <PressableIcon
                  name="eye-off"
                  size={16}
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
                    secureTextEntry={visible.confirmPwd}
                    value={value}
                    onChangeText={value => onChange(value)}
                    onBlur={onBlur}
                  />
                )}
              />

              {visible.confirmPwd ? (
                <PressableIcon
                  name="eye"
                  size={16}
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
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
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
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default SignUp;

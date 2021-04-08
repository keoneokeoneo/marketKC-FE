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
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { ISignIn } from '../../types/ScreenProps';
import PressableIcon from '../../components/PressableIcon';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormInput {
  email: string;
  password: string;
}

const SignInSchema = yup.object().shape({
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
});

const SignIn = ({ navigation }: ISignIn) => {
  const [visible, setVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(SignInSchema),
  });
  const onSubmit = (data: FormInput) => console.log(data);

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
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
                    secureTextEntry={visible}
                    value={value}
                    onChangeText={value => onChange(value)}
                    onBlur={onBlur}
                  />
                )}
              />
              {visible ? (
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
              onPress={() => navigation.navigate('SignUp')}>
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
  join: { flexDirection: 'row', marginTop: 14 },
  joinText: { marginHorizontal: 2, color: PALETTE.line1 },
});

export default SignIn;
import React, { useLayoutEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { PALETTE } from '../../../constants/color';
import { RootState } from '../../../store/reducer';
import { RegisterWalletProps } from '../../../types/ScreenProps';
import { updateUserWalletThunk } from '../../../store/user/thunk';

interface Input {
  addr: string;
}

const RegisterWallet = ({ navigation }: RegisterWalletProps) => {
  const {
    user: {
      data: { walletAddr, id },
    },
  } = useSelector((state: RootState) => state.user);
  const { control, handleSubmit } = useForm<Input>();
  const dispatch = useDispatch();
  const onSubmit = (data: Input) => {
    console.log(data.addr);
    dispatch(updateUserWalletThunk(id, data.addr));
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '지갑 주소 등록',
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon
            name="close"
            size={26}
            onPress={() => navigation.goBack()}
          />
        </HeaderSide>
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container} removeClippedSubviews={false}>
      <Text style={styles.title}>이더리움 지갑 주소를 등록하세요!</Text>
      <Text style={styles.text}>지갑 주소가 등록되어 있지 않으면</Text>
      <Text style={styles.text}>앱 내에서의 구매/판매가 제한됩니다.</Text>
      <Text style={styles.text}>
        지갑 주소는 0x로 시작하는 42자의 형식입니다.
      </Text>

      <Controller
        control={control}
        name="addr"
        defaultValue={walletAddr}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextInput
            value={value}
            onChangeText={value => onChange(value)}
            onBlur={onBlur}
            placeholder="지갑 주소 입력"
            style={styles.input}
          />
        )}
      />
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={1}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.btnText}>완료</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: { fontSize: 21, fontWeight: 'bold', marginBottom: 8 },
  text: { marginVertical: 2 },
  input: {
    padding: 12,
    borderWidth: 0.5,
    borderColor: 'rgb(216,216,216)',
    width: '100%',
    marginTop: 12,
    borderRadius: 4,
  },
  btn: {
    padding: 12,
    backgroundColor: PALETTE.main,
    borderRadius: 8,
    marginTop: 20,
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RegisterWallet;

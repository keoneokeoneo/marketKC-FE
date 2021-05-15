import React, { useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { check, PERMISSIONS } from 'react-native-permissions';
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { SetLocationProps } from '../../../types/ScreenProps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const SetLocation = ({ navigation }: SetLocationProps) => {
  const [permission, setPermission] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon
            name="arrow-back-sharp"
            size={26}
            onPress={() => navigation.goBack()}
          />
        </HeaderSide>
      ),
      title: '동네 인증하기',
    });
  }, [navigation]);

  useEffect(() => {
    if (getPermission()) {
      Geolocation.getCurrentPosition(
        pos => {
          console.log(pos);
          getData(pos.coords.longitude, pos.coords.latitude);
        },
        err => {
          console.log(err);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    }
  }, []);

  const getPermission = async () => {
    const result = await Geolocation.requestAuthorization('whenInUse');

    return result === 'granted';
  };

  const getData = (long: number, lat: number) => {
    axios({
      method: 'GET',
      url: `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${long},${lat}&orders=admcode,roadaddr&output=json`,
      headers: {
        'X-NCP-APIGW-API-KEY-ID': 'b8kcvazjsz',
        'X-NCP-APIGW-API-KEY': 'GpR9KVkoD2OCREhL0MbXRMQcGvUbrUZvjkSV9jHb',
      },
    })
      .then(res => {
        if (res.data.status.code === 0) {
          // success
          console.log(res.data.results[0]);
        } else {
          // fail
          console.log('해당하는 결과가 없습니다.');
        }
      })
      .catch(e => console.log(e));
  };

  return (
    <View style={styles.container}>
      <Text>SetLocation</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SetLocation;

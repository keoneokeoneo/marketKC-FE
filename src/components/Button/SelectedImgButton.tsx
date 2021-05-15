import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ImageErrorEventData,
  ImageLoadEventData,
  ImageProgressEventDataIOS,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PALETTE } from '../../constants/color';
import { IMAGES } from '../../constants/image';
import { LoadedImage } from '../../types';

interface Props {
  data: LoadedImage;
  onRemove: (id: string) => void;
}

const SelectedImgButton = ({ data, onRemove }: Props): JSX.Element => {
  const [isLoading, setLoading] = useState(false);
  const [uri, setUri] = useState(data.path);

  const handleLoadStart = () => {
    setLoading(true);
  };

  const handleLoad = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    setLoading(false);
  };

  const handleError = (error: NativeSyntheticEvent<ImageErrorEventData>) => {
    setUri(IMAGES.defaultImage);
  };

  const handleLoadEnd = () => {};

  const handleProgress = (
    event: NativeSyntheticEvent<ImageProgressEventDataIOS>,
  ) => {};

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: uri }}
        style={{
          width: 84,
          height: 84,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        imageStyle={{
          borderRadius: 8,
          borderWidth: 1,
          borderColor: PALETTE.five,
        }}
        onLoadStart={handleLoadStart}
        onLoad={handleLoad}
        onError={handleError}
        onLoadEnd={handleLoadEnd}
        onProgress={handleProgress}>
        <ActivityIndicator
          size="small"
          color={PALETTE.main}
          animating={isLoading}
        />
      </ImageBackground>
      <TouchableOpacity
        onPress={() => {
          onRemove(data.id);
        }}
        style={styles.closeButton}
        activeOpacity={1}>
        <Ionicons name="close" size={14} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 84,
    width: 84,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  loader: {
    width: 84,
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 12,
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    padding: 3,
    backgroundColor: 'rgb(216,216,216)',
    borderRadius: 30,
  },
});

export default SelectedImgButton;

import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ImageErrorEventData,
  ImageLoadEventData,
  ImageProgressEventDataIOS,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PALETTE } from '../../constants/color';
import { IMAGES } from '../../constants/image';
import { ImagePickerRes } from '../../types';

export interface Test {
  uri: string;
}

interface Props {
  data: ImagePickerRes;
  onRemove: (id: string) => void;
  onCoverChange: (id: string) => void;
  isCover: boolean;
}

const SelectedImgButton = ({
  data,
  onRemove,
  isCover,
  onCoverChange,
}: Props): JSX.Element => {
  const [chip, setChip] = useState({ width: 0, height: 0 });
  const [isLoading, setLoading] = useState(false);
  const [uri, setUri] = useState(data.path);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setChip({ width: width, height: height });
  }, []);

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
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => onCoverChange(data.localIdentifier)}>
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
          onRemove(data.localIdentifier);
        }}
        style={styles.closeButton}
        activeOpacity={1}>
        <Ionicons name="close" size={14} color="white" />
      </TouchableOpacity>
      {isCover && (
        <View
          style={[
            styles.chip,
            { bottom: -chip.height / 2, left: 44 - chip.width / 2 },
          ]}
          onLayout={onLayout}>
          <Text style={{ color: 'white', fontSize: 10 }}>대표</Text>
        </View>
      )}
    </TouchableOpacity>
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
  chip: {
    position: 'absolute',
    padding: 3,
    backgroundColor: PALETTE.sub,
    borderRadius: 6,
  },
});

export default SelectedImgButton;

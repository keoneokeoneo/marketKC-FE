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
import { Image } from 'react-native-image-crop-picker';

export interface Test {
  uri: string;
}

interface Props {
  data: Image;
  onRemove?: (id: string) => void;
  onChange?: (id: string) => void;
  isCover?: boolean;
}

const SelectedImgButton = ({
  data,
  onRemove,
  onChange,
  isCover,
}: Props): JSX.Element => {
  const [chip, setChip] = useState({ width: 0, height: 0 });
  const [isLoading, setLoading] = useState(false);
  const [uri, setUri] = useState(data.sourceURL);

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
      onPress={() => {
        //onChange(data.id);
      }}
      style={styles.container}
      activeOpacity={1}>
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
          //onRemove(data.id);
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
    top: 4,
    right: 4,
    padding: 3,
    backgroundColor: PALETTE.line1,
    borderRadius: 30,
  },
  chip: {
    position: 'absolute',
    padding: 3,
    backgroundColor: PALETTE.main,
    borderRadius: 6,
  },
});

export default SelectedImgButton;

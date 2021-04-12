import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { BottomTabItem } from './BottomTabItem';

export const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const windowWidth = Dimensions.get('window').width;
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  // const tabWidth = windowWidth / state.routes.length;
  // const [translateValue] = useState(new Animated.Value(0));
  // const animateSlider = (index: number) => {
  //   Animated.spring(translateValue, {
  //     toValue: index * tabWidth,
  //     velocity: 10,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // useEffect(() => {
  //   animateSlider(state.index);
  // }, [state.index]);

  if (!focusedOptions.tabBarVisible) return null;

  return (
    <View style={[styles.tabContainer, { width: windowWidth }]}>
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              activeOpacity={1}
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}>
              <BottomTabItem label={label.toString()} isCurrent={isFocused} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    paddingBottom: Platform.OS === 'ios' ? 0 : 0,
    height: 80,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: 'white',
    elevation: 10,
    position: 'absolute',
    bottom: 0,
  },
  slider: {
    height: 3,
    position: 'absolute',
    top: 0,
    left: 10,
    backgroundColor: PALETTE.three,
    borderRadius: 10,
    width: 0,
  },
});

import React, { useLayoutEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { PALETTE } from '../../../constants/color';
import { SelectCategoryProps } from '../../../types/ScreenProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import { selectCategory } from '../../../store/actions/postingAction';
import { Category } from '../../../types';

const SelectCategory = ({ navigation }: SelectCategoryProps) => {
  const currentCategory = useSelector(
    (state: RootState) => state.posting.form.category,
  );
  const categories = useSelector(
    (state: RootState) => state.categories.categories,
  );
  const dispatch = useDispatch();

  const onPress = (category: Category) => {
    dispatch(selectCategory(category));
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon
            name="arrow-back-sharp"
            size={26}
            onPress={() => onPress(currentCategory)}
          />
        </HeaderSide>
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={1}
      onPress={() => onPress(item)}>
      <Text
        style={[
          styles.itemText,
          item.id === currentCategory.id && styles.itemTextSelected,
        ]}>
        {item.name}
      </Text>
      {item.id === currentCategory.id && (
        <Ionicons
          name="checkmark-sharp"
          style={styles.itemTextSelected}
          size={18}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList data={categories} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    borderBottomColor: PALETTE.grey,
    borderBottomWidth: 0.5,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: { fontSize: 16 },
  itemTextSelected: {
    color: PALETTE.main,
    fontWeight: 'bold',
  },
});

export default SelectCategory;

import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderSide from '../../../components/HeaderSide';
import PressableIcon from '../../../components/PressableIcon';
import { CATEGORIES } from '../../../constants';
import { PALETTE } from '../../../constants/color';
import { SetCategoryProps } from '../../../types/ScreenProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { loadCategories } from '../../../store/actions/userAction';
import SimpleToast from 'react-native-simple-toast';

interface Category {
  id: number;
  name: string;
  isActive: boolean;
}

const CategoryItem = ({
  data,
  onPress,
}: {
  data: Category;
  onPress: (id: number) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={1}
      onPress={() => onPress(data.id)}>
      <Ionicons
        name={data.isActive ? 'checkmark-circle' : 'checkmark-circle-outline'}
        size={24}
        style={data.isActive ? styles.itemIconActive : styles.itemIconInactive}
      />
      <Text style={styles.itemText}>{data.name}</Text>
    </TouchableOpacity>
  );
};

const SetCategory = ({ navigation }: SetCategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '관심 카테고리 설정',
      headerRight: () => null,
      headerLeft: () => (
        <HeaderSide left>
          <PressableIcon
            name="arrow-back-sharp"
            size={26}
            onPress={() => navigation.goBack()}
          />
        </HeaderSide>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setCategories([]);
    CATEGORIES.map(category => {
      setCategories(prev => prev.concat({ ...category, isActive: true }));
      //   const tmp: Category = {
      //     ...category,
      //     isActive: true,
      //   };
      //   setCategories(prev => [...prev, tmp]);
    });
    dispatch(loadCategories());
  }, []);

  const onPress = (id: number) => {
    setCategories(prev =>
      prev.map(category =>
        category.id === id
          ? { ...category, isActive: !category.isActive }
          : category,
      ),
    );
  };

  const renderItem = ({ item }: { item: Category }) => (
    <CategoryItem data={item} onPress={onPress} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.titleText}>
            홈 화면에서 보고 싶지 않은 카테고리는 체크를 해제하세요.
          </Text>
        </View>
        <View style={styles.headerDesc}>
          <Text style={styles.descText}>
            최소 1개 이상 선택되어 있어야 합니다.
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <FlatList
          data={categories}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 8,
  },
  header: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '74%',
    marginVertical: 12,
  },
  headerDesc: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  titleText: {
    fontSize: 17,
    fontWeight: '500',
    textAlign: 'center',
  },
  descText: {
    color: PALETTE.grey,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 8,
    marginVertical: 8,
  },
  itemIconActive: {
    color: PALETTE.main,
  },
  itemIconInactive: {
    color: PALETTE.grey,
  },
  itemText: {
    fontSize: 18,
    marginLeft: 12,
  },
});

export default SetCategory;

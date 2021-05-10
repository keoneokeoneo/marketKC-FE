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
import { PALETTE } from '../../../constants/color';
import { SetCategoryProps } from '../../../types/ScreenProps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers';
import { requestUpdateCategories } from '../../../store/actions/userAction';
import Toast from 'react-native-simple-toast';

interface SelectedCategory {
  id: number;
  name: string;
  isSelected: boolean;
}

const CategoryItem = ({
  data,
  onPress,
}: {
  data: SelectedCategory;
  onPress: (id: number) => void;
}) => {
  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={1}
      onPress={() => onPress(data.id)}>
      <Ionicons
        name={data.isSelected ? 'checkmark-circle' : 'checkmark-circle-outline'}
        size={24}
        style={
          data.isSelected ? styles.itemIconActive : styles.itemIconInactive
        }
      />
      <Text style={styles.itemText}>{data.name}</Text>
    </TouchableOpacity>
  );
};

const SetCategory = ({ navigation }: SetCategoryProps) => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state: RootState) => state.categories);
  const userState = useSelector((state: RootState) => state.user);

  const [categories, setCategories] = useState<SelectedCategory[]>([]);

  useEffect(() => {
    setCategories(
      categoryState.categories.map(category => {
        return {
          ...category,
          isSelected:
            userState.categories.ids.find(el => el === category.id) !==
            undefined,
        };
      }),
    );
  }, [categoryState.categories, userState.categories.ids]);

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

  const onPress = (id: number) => {
    if (userState.categories.status.stage === 'FETCHING') {
      Toast.show(
        '이전 요청을 처리중입니다. 잠시 뒤에 다시 시도해주세요.',
        Toast.SHORT,
        ['UIAlertController'],
      );
      return;
    }

    // 1이면 추가, 0이면 제거
    const flag = userState.categories.ids.find(el => el === id) === undefined;
    dispatch(
      requestUpdateCategories(
        userState.user.id,
        flag
          ? userState.categories.ids.concat(id)
          : userState.categories.ids.filter(el => el !== id),
        flag,
      ),
    );
  };

  const renderItem = ({ item }: { item: SelectedCategory }) => (
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
  toast: {
    backgroundColor: 'red',
  },
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

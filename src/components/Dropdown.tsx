import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Divider, TextInput, TextInputProps} from 'react-native-paper';
import TextInputOutlined from './TextInputOutlined';
import CustomTheme from '../utils/CustomTheme';

const {shadowContainer} = CustomTheme;
interface Props<T> extends TextInputProps {
  data: T[] | undefined;
  name: keyof T;
  uniqueKey: keyof T;
  onPressItem: (item: T) => void;
}
const Dropdown = <T extends Record<string, any>>({
  data,
  name,
  uniqueKey,
  onPressItem,
  ...textInputProps
}: Props<T>) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{flex: 1}}
      onPress={() => setShowDropdown(prev => !prev)}>
      <TextInputOutlined
        {...textInputProps}
        right={
          <TextInput.Icon
            icon="chevron-down"
            onPress={() => setShowDropdown(prev => !prev)}
          />
        }
        editable={false}
      />
      {showDropdown && (
        <View style={styles.dropdown}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  onPressItem(item);
                  setShowDropdown(false);
                }}
                style={{padding: 10}}>
                <Text>{item[name] as string}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item[uniqueKey].toString()}
            ItemSeparatorComponent={() => <Divider />}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    backgroundColor: 'white',
    maxHeight: 130,
    top: 60,
    right: 0,
    zIndex: 100,
    ...shadowContainer,
  },
});

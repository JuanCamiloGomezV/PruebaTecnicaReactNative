import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput, TextInputProps} from 'react-native-paper';
import CustomTheme from '../utils/CustomTheme';

const {colors} = CustomTheme;
interface Props extends TextInputProps {}
const TextInputOutlined = ({...props}: Props) => {
  return (
    <TextInput
      scrollEnabled
      mode="outlined"
      outlineColor={colors.gray}
      activeOutlineColor={colors.primary}
      cursorColor={colors.primary}
      style={[styles.textInput, props.style]}
      contentStyle={{flex: 1}}
      numberOfLines={1}
      {...props}
    />
  );
};

export default TextInputOutlined;

const styles = StyleSheet.create({
  textInput: {fontSize: 14, backgroundColor: 'transparent', flex: 1},
});

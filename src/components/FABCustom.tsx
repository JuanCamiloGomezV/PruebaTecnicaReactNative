import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FAB, FABProps} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomTheme from '../utils/CustomTheme';

const {colors} = CustomTheme;
interface Props {
  onPress?: () => void;
}
const FABCustom = ({onPress = () => {}}: Props) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <FAB
      style={[styles.fab, {bottom}]}
      icon="plus"
      color={colors.white}
      onPress={onPress}
    />
  );
};

export default FABCustom;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 10,
    right: 0,
    backgroundColor: colors.primary,
  },
});

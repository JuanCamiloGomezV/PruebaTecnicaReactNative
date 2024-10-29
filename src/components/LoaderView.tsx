import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomTheme from '../utils/CustomTheme';

const {colors} = CustomTheme;
const LoaderView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
};

export default LoaderView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

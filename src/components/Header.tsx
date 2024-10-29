import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import CustomTheme from '../utils/CustomTheme';

const {colors, borderRadius} = CustomTheme;

interface Props {
  backNavigation?: () => void;
  title: string;
  renderMenu?: () => React.JSX.Element;
}
const Header = ({title, backNavigation}: Props) => {
  return (
    <>
      <Appbar.Header
        style={{
          height: 55,
          padding: 0,
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: colors.primary,
          justifyContent: 'space-between',
        }}
        theme={{colors: {primary: colors.primary}}}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {backNavigation && (
            <Appbar.BackAction
              style={styles.backButtonContainer}
              size={Platform.OS == 'ios' ? 30 : 33}
              color={'#fff'}
              onPress={backNavigation}
            />
          )}

          <View
            style={{
              paddingLeft: 10,
              paddingRight: 5,
              marginLeft: backNavigation ? 40 : 0,
            }}></View>

          <View
            style={{
              flex: 1,
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.textSticky}>
              {title}
            </Text>
          </View>
        </View>
      </Appbar.Header>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  backButtonContainer: {
    position: 'absolute',
  },
  textSticky: {
    color: 'white',
    margin: 10,
    fontSize: 24,
  },
});

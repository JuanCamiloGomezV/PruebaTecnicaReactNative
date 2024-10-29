// @ts-check

import {DefaultTheme} from 'react-native-paper';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f89939',
    white: '#ffffff',
    gray: '#ccc',
  },
  borderRadius: 7,
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
};

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {DefaultTheme, PaperProvider, Provider} from 'react-native-paper';
import ContainerStackNavigation from './src/navigation/ContainerStackNavigation';

const App = () => {
  const theme = {
    ...DefaultTheme,
  };

  return (
    <Provider>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <ContainerStackNavigation />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

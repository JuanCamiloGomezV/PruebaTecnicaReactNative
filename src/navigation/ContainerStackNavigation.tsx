import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Header from '../components/Header';
import PostsScreen from '../screens/posts/PostsScreen';

export type ContainerRootStackParams = {
  PostsScreen: undefined;
};
const Stack = createStackNavigator<ContainerRootStackParams>();

const ContainerStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={() => ({
          header: () => <Header title="Publicaciones" />,
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default ContainerStackNavigation;

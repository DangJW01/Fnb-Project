// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AdminPage from './AdminPage';
import ManageOrder from './ManageOrder';
import ManageUsers from './ManageUsers';
import ManageProducts from './ManageProducts';
import ManageCategory from './ManageCategory';
import ViewOrderDetail from './ViewOrderDetail';

// Define the RootStackParamList
export type RootStackParamList = {
  Home: undefined;
  AdminPage: undefined;
  ManageOrder: undefined;
  ManageUsers: undefined;
  ManageProducts: undefined;
  ManageCategory: undefined;
  ViewOrderDetail: { orderId: number; totalAmount?: string };

};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AdminPage" component={AdminPage} />
        <Stack.Screen name="ManageOrder" component={ManageOrder} />
        <Stack.Screen name="ManageUsers" component={ManageUsers} />
        <Stack.Screen name="ManageProducts" component={ManageProducts} />
        <Stack.Screen name="ManageCategory" component={ManageCategory} />
        <Stack.Screen name="ViewOrderDetail" component={ViewOrderDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

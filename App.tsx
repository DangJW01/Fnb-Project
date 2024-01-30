// Import necessary modules
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './admin/HomeScreen';
import AdminPage from './admin/AdminPage';
import ManageOrder from './admin/ManageOrder';
import ManageUsers from './admin/ManageUsers';
import ManageProducts from './admin/ManageProducts';
import ManageCategory from './admin/ManageCategory';
import ViewOrderDetail from './ViewOrderDetail';
import CustomerHomePage from './customer/Homepage';
import ProductDetailPage from './customer/ProductDetailPage';
import Login from './Login';  
import Register from './Register';  
import CartPage from './customer/CartPage';  
import OrderPage from './customer/OrderPage';


// Define the RootStackParamList
export type RootStackParamList = {
  Home: undefined;
  AdminPage: undefined;
  ManageOrder: undefined;
  ManageUsers: undefined;
  ManageProducts: undefined;
  ManageCategory: undefined;
  CustomerHomePage: { userId: number };
  ProductDetailPage: { userId: number };
  ViewOrderDetail: { orderId: number; totalAmount?: string };
  Login: undefined; 
  Register: undefined;
  OrderPage: { userId: number};
  CartPage: { userId: number };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"> 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CustomerHomePage" component={CustomerHomePage} />
        <Stack.Screen name="AdminPage" component={AdminPage} />
        <Stack.Screen name="ManageOrder" component={ManageOrder} />
        <Stack.Screen name="ManageUsers" component={ManageUsers} />
        <Stack.Screen name="ManageProducts" component={ManageProducts} />
        <Stack.Screen name="ManageCategory" component={ManageCategory} />
        <Stack.Screen name="ProductDetailPage" component={ProductDetailPage} />
        <Stack.Screen name="ViewOrderDetail" component={ViewOrderDetail} />
        <Stack.Screen name="Login" component={Login} />  
        <Stack.Screen name="CartPage" component={CartPage} />
        <Stack.Screen name="OrderPage" component={OrderPage} />
        <Stack.Screen name="Register" component={Register} />  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

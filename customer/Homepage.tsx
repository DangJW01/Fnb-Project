import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CartPage from '../customer/CartPage';
import OrderPage from '../customer/OrderPage';

interface HomePageProps {
  route: {
    params: {
      userId: number;
    };
  };
   navigation: any;
}
const Tab = createBottomTabNavigator();

const API_BASE_URL = 'http://backendfoodorder-prod.us-east-1.elasticbeanstalk.com/api/product';

interface Product {
  productId: number;
  name: string;
  price: string;
  image: string;
}



const HomePageComponent: React.FC<HomePageProps> = ({ route }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const windowWidth = useWindowDimensions().width;
  const navigation = useNavigation();

  // Access userId from route.params
  const userId = route.params?.userId;

  console.log('Fetched userId:', userId);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        console.error(`Failed to fetch products. Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const calculateNumColumns = () => {
    const minItemWidth = 150; // Minimum width for each item
    return Math.floor(windowWidth / minItemWidth);
  };

  const itemSize = windowWidth / calculateNumColumns() - 10; // Adjust margin

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={[styles.productItem, { width: itemSize, height: itemSize }]}
      onPress={() => handleProductPress(item.productId)}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productPrice}>Price: ${item.price}</Text>
    </TouchableOpacity>
  );

  const handleProductPress = (productId: number) => {
    navigation.navigate('ProductDetailPage', { productId, userId } as any);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.productId.toString()}
        numColumns={calculateNumColumns()}
        renderItem={renderProductItem}
        onLayout={() => {
          setProducts([...products]);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productItem: {
    margin: 5,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productTitle: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 12,
    color: 'green',
  },
  logoutButton: {
    marginRight: 15,
    padding: 10,
  },
  logoutButtonText: {
    color: 'blue',
  },
});

const HomePage: React.FC<HomePageProps> = ({ route, navigation }) => {
  const userId = route.params?.userId;

  const handleLogout = () => {
    // Perform logout actions if needed
  
    // Navigate to the Login page and reset the navigation stack
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = 'cart-outline';
          } else if (route.name === 'Order') {
            iconName = 'list-outline';
          }

          
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerRight: () => {
          // Render the logout button in the header
          return (
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          );
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <HomePageComponent {...props} route={route} />}
      </Tab.Screen>
      <Tab.Screen name="Cart">
        {(props) => <CartPage {...props} route={route} />}
      </Tab.Screen>
      <Tab.Screen name="Order">
        {(props) => <OrderPage {...props} userId={userId} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default HomePage;


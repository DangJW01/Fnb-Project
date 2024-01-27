import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

interface ProductDetailPageProps {
  route: { params: { productId: number } };
}

interface ProductDetail {
  name: string;
  desc: string;
  price: string;
  stock: string;
  category: string;
  image: string;
}

const API_BASE_URL = 'http://backendfoodorder-prod.us-east-1.elasticbeanstalk.com/api/product/';

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ route }) => {
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [quantity, setQuantity] = useState('1'); // Default quantity is 1

  useEffect(() => {
    const { productId } = route.params;
    fetchProductDetail(productId);
  }, [route.params]);

  const fetchProductDetail = async (productId: number) => {
    try {
      const response = await fetch(API_BASE_URL + productId);
      if (!response.ok) {
        console.error(`Failed to fetch product details. Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      setProductDetail(data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleQuantityChange = (newQuantity: string) => {
    // Validate if newQuantity is a positive integer
    if (/^[1-9]\d*$/.test(newQuantity) || newQuantity === '') {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Assuming productId and userId are available
    const { productId } = route.params;
    const userId = 5; // Dummy user ID
    const cartApiUrl = `http://backendfoodorder-prod.us-east-1.elasticbeanstalk.com/api/cart/${productId}/${userId}`;

    // Assuming productDetail contains price
    const price = productDetail?.price || '0';

    // Make API request to add the product to the cart
    fetch(cartApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        userId,
        price,
        quantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product added to cart:', data);
        // You can add additional logic or navigation here
      })
      .catch((error) => {
        console.error('Error adding product to cart:', error);
      });
  };

  return (
    <View style={styles.container}>
      {productDetail ? (
        <>
          <Image source={{ uri: productDetail.image }} style={styles.productImage} />
          <Text style={styles.productTitle}>{productDetail.name}</Text>
          <Text style={styles.productDesc}>{productDetail.desc}</Text>
          <Text style={styles.productPrice}>Price: ${productDetail.price}</Text>
          <Text style={styles.productStock}>Stock: {productDetail.stock}</Text>
          <Text style={styles.productCategory}>Category: {productDetail.category}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleQuantityChange((parseInt(quantity, 10) - 1).toString())}>
              <Icon name="minus" size={20} color="black" />
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              keyboardType="numeric"
              value={quantity}
              onChangeText={handleQuantityChange}
            />
            <TouchableOpacity onPress={() => handleQuantityChange((parseInt(quantity, 10) + 1).toString())}>
              <Icon name="plus" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  productTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDesc: {
    marginVertical: 10,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
  productStock: {
    fontSize: 16,
    color: 'darkorange',
  },
  productCategory: {
    fontSize: 16,
    color: 'blue',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
    fontSize: 16,
  },
  addToCartButton: {
    marginTop: 20,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductDetailPage;

import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, View, Image, Modal, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface OrderPageProps {
  userId: number;
}

const OrderPage: React.FC<OrderPageProps> = ({ userId }) => {
  const [orderIds, setOrderIds] = useState<number[]>([]);
  const [orderDetails, setOrderDetails] = useState<any[]>([]);
  const [productDetails, setProductDetails] = useState<{ [key: number]: any }>({});
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('Current userId:', userId);
      fetchOrderData();
    }, [userId])
  );

  

  const renderRatingButtons = () => (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <TouchableOpacity
          key={rating}
          style={[styles.ratingButton, selectedRating === rating && styles.selectedRating]}
          onPress={() => setSelectedRating(rating)}
        >
          <Text style={styles.ratingButtonText}>{rating}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const closeModal = () => {
    setModalVisible(false);
  };

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      setOrderIds([]);
      setOrderDetails([]);
      setProductDetails({});

      const orderIdsResponse = await fetch(`http://backendfoodorder-prod.us-east-1.elasticbeanstalk.com/api/order`);
      if (!orderIdsResponse.ok) {
        console.error(`Failed to fetch order IDs. Status: ${orderIdsResponse.status}`);
        return;
      }
      const orderIdsData = await orderIdsResponse.json();
      const userOrderIds = orderIdsData
        .filter((order: any) => order.userId === userId)
        .map((order: any) => order.orderId);
      setOrderIds(userOrderIds);

      const orderDetailsPromises = userOrderIds.map(async (orderId) => {
        const response = await fetch(
          `http://backendfoodorder-prod.us-east-1.elasticbeanstalk.com/api/orderdetails/user/${orderId}`
        );
        if (!response.ok) {
          console.error(`Failed to fetch order details for order ${orderId}. Status: ${response.status}`);
          return null;
        }
        const data = await response.json();

        const orderStatusResponse = await fetch(
          `http://backendfoodorder-prod.us-east-1.elasticbeanstalk.com/api/order/${orderId}`
        );
        if (!orderStatusResponse.ok) {
          console.error(`Failed to fetch order status for order ${orderId}. Status: ${orderStatusResponse.status}`);
          return null;
        }
        const orderStatusData = await orderStatusResponse.json();

        return data.map((detail: any) => ({
          ...detail,
          orderStatus: orderStatusData.orderStatus,
          deliveryStatus: orderStatusData.deliveryStatus,
          ratings: orderStatusData.ratings,
        }));
      });

      const orderDetailsResults = await Promise.all(orderDetailsPromises);
      const flattenedOrderDetails = orderDetailsResults
        .filter((result) => result !== null)
        .flat();
      setOrderDetails(flattenedOrderDetails);

      const productDetailsPromises = flattenedOrderDetails.map((detail) => fetchProductDetails(detail.productId));
      const productDetailsResults = await Promise.all(productDetailsPromises);
      productDetailsResults.forEach((data: any, index: number) => {
        setProductDetails((prevDetails) => ({ ...prevDetails, [flattenedOrderDetails[index].productId]: data }));
      });
    } catch (error) {
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (productId: number) => {
    try {
      const response = await fetch(`http://backendfoodorder-prod.us-east-1.elasticbeanstalk.com/api/product/${productId}`);
      if (!response.ok) {
        console.error(`Failed to fetch product details. Status: ${response.status}`);
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching product details for product ${productId}:`, error);
      return null;
    }
  };

  const updateRating = async (orderId: number, rating: number) => {
    setLoading(true);
    try {
      // Step 1: Fetch order details using GET
      const orderDetailsResponse = await fetch(`http://backendfoodorder-prod.us-east-1.elasticbeanstalk.com/api/order/${orderId}`);
      if (!orderDetailsResponse.ok) {
        console.error(`Failed to fetch order details for order ${orderId}. Status: ${orderDetailsResponse.status}`);
        return;
      }
      const orderDetailsData = await orderDetailsResponse.json();

      // Step 2: Prepare updated data for PUT
      const updatedOrderData = {
        ...orderDetailsData,
        ratings: rating.toString(),
        dtAdded: '', // Emptying dtAdded
      };

      // Step 3: Update the rating using PUT
      const updateResponse = await fetch(`http://backendfoodorder-prod.us-east-1.elasticbeanstalk.com/api/order/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrderData),
      });

      if (!updateResponse.ok) {
        console.error(`Failed to update rating. Status: ${updateResponse.status}`);
        return;
      }

      // Show success message
      Alert.alert('Success', 'Rating has been updated successfully.');
    } catch (error) {
      console.error('Error updating rating:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={fetchOrderData} style={styles.refreshButton}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {orderIds.map((orderId) => {
        const orderStatus = orderDetails.find((detail) => detail.orderId === orderId)?.orderStatus;
        const deliveryStatus = orderDetails.find((detail) => detail.orderId === orderId)?.deliveryStatus;
        const ratings = orderDetails.find((detail) => detail.orderId === orderId)?.ratings;

        return (
          <View key={orderId} style={styles.orderBox}>
            <Text style={styles.orderHeader}>Order ID: {orderId}</Text>
            <Text>Order Status: {orderStatus}</Text>
            <Text>Delivery Status: {deliveryStatus}</Text>
            <Text>Rating: {ratings}</Text>

            {orderDetails
              .filter((detail) => detail.orderId === orderId)
              .map((detail) => (
                <View key={detail.orderDetailsId} style={styles.productDetails}>
                  <Image source={{ uri: productDetails[detail.productId]?.image }} style={styles.productImage} />
                  <View>
                    <Text>{productDetails[detail.productId]?.name}</Text>
                    <Text>Quantity: {detail.quantity}</Text>
                    <Text>Price: ${detail.price}</Text>
                    <Text>Total Amount: ${detail.totalAmount}</Text>
                  </View>
                </View>
              ))}
            {orderStatus === 'Completed' && deliveryStatus === 'Delivered' && ratings === 'Not given yet' && (
              <>
                <Text style={{ paddingTop: 15, fontWeight: 'bold' }}>Please rate your order:</Text>
                <TouchableOpacity onPress={openModal} style={styles.rateButton}>
                  <Text style={styles.rateButtonText}>Rate</Text>
                </TouchableOpacity>

                {/* Modal */}
                <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <Text>Please rate your order:</Text>
                      {renderRatingButtons()}

                      <TouchableOpacity
                    onPress={() => {
                      if (selectedRating !== null) {
                        updateRating(orderId, selectedRating);
                        setSelectedRating(null);
                        closeModal();
                      }
                    }}
                    style={styles.rateButton}
                  >
                        <Text style={styles.rateButtonText}>Rate</Text>
                      </TouchableOpacity>

                      <Button title="Close" onPress={closeModal} />
                    </View>
                  </View>
                </Modal>
              </>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  ratingButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    width: 40,
    alignItems: 'center',
  },
  selectedRating: {
    backgroundColor: 'green',
  },
  ratingButtonText: {
    color: 'black',
  },
  orderBox: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  orderHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  refreshButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  refreshButtonText: {
    color: 'white',
  },
  rateButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  rateButtonText: {
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
});

export default OrderPage;

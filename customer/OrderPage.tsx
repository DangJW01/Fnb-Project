// ./customer/OrderPage.tsx

import React, { useState } from 'react';
import { View, Text } from 'react-native';

const OrderPage: React.FC = () => {
  const [orders, setOrders] = useState([
    { orderId: 1, totalAmount: '25.00', date: '2024-01-30' },
    { orderId: 2, totalAmount: '30.00', date: '2024-02-01' },
    // Add more orders as needed
  ]);

  return (
    <View>
      <Text>Order Page</Text>
      {orders.map((order) => (
        <View key={order.orderId}>
          <Text>Order ID: {order.orderId}</Text>
          <Text>Total Amount: ${order.totalAmount}</Text>
          <Text>Date: {order.date}</Text>
        </View>
      ))}
    </View>
  );
};

export default OrderPage;

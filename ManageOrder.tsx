import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native'

const API_BASE_URL = 'http://backendfoodorder-prod.us-east-1.elasticbeanstalk.com/'

interface Order {
  id: number
  text: string
}

const ManageOrderScreen = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [newOrderText, setNewOrderText] = useState<string>('')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}orders`)
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const addOrder = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newOrderText }),
      })
      const data: Order = await response.json()
      setOrders([...orders, data])
      setNewOrderText('')
    } catch (error) {
      console.error('Error adding order:', error)
    }
  }

  const deleteOrder = async (orderId: number) => {
    try {
      await fetch(`${API_BASE_URL}orders/${orderId}`, {
        method: 'DELETE',
      })
      setOrders(orders.filter((order) => order.id !== orderId))
    } catch (error) {
      console.error('Error deleting order:', error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Order</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter new order"
        value={newOrderText}
        onChangeText={(text) => setNewOrderText(text)}
      />

      <Button title="Add Order" onPress={addOrder} />

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text style={styles.orderText}>{item.text}</Text>
            <Button title="Delete" onPress={() => deleteOrder(item.id)} />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
  },
  orderText: {
    flex: 1, // Add this line
    marginRight: 10,
  },
})

export default ManageOrderScreen
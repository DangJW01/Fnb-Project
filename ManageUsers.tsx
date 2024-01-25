import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const API_BASE_URL = 'http://backendfoodorder-prod.us-east-1.elasticbeanstalk.com/api/User';

interface UserData {
  userId: number;
  email: string;
  password: string;
  userLevel: string;
  dtAdded: string;
}

const ManageUsersScreen: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [newUserEmail, setNewUserEmail] = useState<string>('');
  const [newUserPassword, setNewUserPassword] = useState<string>('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async () => {
    try {
      const response = await axios.post(API_BASE_URL, {
        email: newUserEmail,
        password: newUserPassword,
      });
      const data: UserData = response.data;
      setUsers([...users, data]);
      setNewUserEmail('');
      setNewUserPassword('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (email: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/${email}`);
      setUsers(users.filter((user) => user.email !== email));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async (email: string, newPassword: string) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${email}`, {
        password: newPassword,
      });
      const updatedUser: UserData = response.data;
      setUsers(users.map((user) => (user.email === email ? updatedUser : user)));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Users</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={newUserEmail}
          onChangeText={(text) => setNewUserEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={newUserPassword}
          onChangeText={(text) => setNewUserPassword(text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Add User" onPress={addUser} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.userItem}>
          <Text style={[styles.tableHeader, { flex: 1 }]}>UserID</Text>
          <Text style={[styles.tableHeader, { flex: 2 }]}>Email</Text>
          <Text style={[styles.tableHeader, { flex: 2 }]}>Password</Text>
          <Text style={[styles.tableHeader, { flex: 1 }]}>User Level</Text>
          <Text style={[styles.tableHeader, { flex: 2 }]}>Date Added</Text>
          <Text style={[styles.tableHeader, { flex: 2 }]}>Actions</Text>
        </View>

        {users.map((item) => (
          <View key={item.userId} style={styles.userItem}>
            <Text style={{ flex: 1 }}>{item.userId}</Text>
            <Text style={{ flex: 2 }}>{item.email}</Text>
            <Text style={{ flex: 2 }}>{item.password}</Text>
            <Text style={{ flex: 1 }}>{item.userLevel}</Text>
            <Text style={{ flex: 2 }}>{item.dtAdded}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => updateUser(item.email, 'new-password')}
              >
                <Text>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => deleteUser(item.email)}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 8,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
  },
  scrollView: {
    width: '100%',
  },
  tableHeader: {
    fontWeight: 'bold',
  },
});

export default ManageUsersScreen;

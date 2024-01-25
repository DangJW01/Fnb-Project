import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, ScrollView } from 'react-native';

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
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async () => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newUserEmail, password: newUserPassword }),
      });
      const data: UserData = await response.json();
      setUsers([...users, data]);
      setNewUserEmail('');
      setNewUserPassword('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (email: string) => {
    try {
      await fetch(`${API_BASE_URL}/${email}`, {
        method: 'DELETE',
      });
      setUsers(users.filter((user) => user.email !== email));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async (email: string, newPassword: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });
      const updatedUser: UserData = await response.json();
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
        {users.map((item) => (
          <View key={item.userId} style={styles.userItem}>
            <Text>{`UserID: ${item.userId}`}</Text>
            <Text>{`Email: ${item.email}`}</Text>
            <Text>{`Password: ${item.password}`}</Text>
            <Text>{`User Level: ${item.userLevel}`}</Text>
            <Text>{`Date Added: ${item.dtAdded}`}</Text>
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
    flexDirection: 'column',
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
});

export default ManageUsersScreen;

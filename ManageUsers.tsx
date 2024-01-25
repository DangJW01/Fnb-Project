import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const API_BASE_URL = 'http://backendfoodorder-prod.us-east-1.elasticbeanstalk.com/api/Users';

interface User {
  Email: string;
  Password: string;
}

const ManageUsersScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserEmail, setNewUserEmail] = useState<string>('');
  const [newUserPassword, setNewUserPassword] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
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
        body: JSON.stringify({ Email: newUserEmail, Password: newUserPassword }),
      });
      const data: User = await response.json();
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
      setUsers(users.filter((user) => user.Email !== email));
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
        body: JSON.stringify({ Password: newPassword }),
      });
      const updatedUser: User = await response.json();
      setUsers(users.map((user) => (user.Email === email ? updatedUser : user)));
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

      <FlatList
        data={users}
        keyExtractor={(item) => item.Email}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text>{`Email: ${item.Email}, Password: ${item.Password}`}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => updateUser(item.Email, 'new-password')}
              >
                <Text>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => deleteUser(item.Email)}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
});

export default ManageUsersScreen;
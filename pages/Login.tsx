import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const Login = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={styles.imgCont}>
        <Image
          style={{ width: 300, height: 300 }}
          source={require("../assets/Main.jpg")}
        ></Image>
      </View>
      <Text style={styles.inText}>Login</Text>
      <View style={styles.inCont}>
        <Entypo name="email" size={30} style={{ marginRight: 10 }} />
        <TextInput placeholder="Email ID" />
      </View>
      <View style={styles.inCont}>
        <MaterialCommunityIcons
          name="onepassword"
          size={30}
          style={{ marginRight: 10 }}
        />
        <TextInput placeholder="Password" secureTextEntry={true} />
      </View>

      <TouchableOpacity
        onPress={() => {}}
        style={{
          backgroundColor: "#AD40AF",
          padding: 20,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {}}
        style={{
          backgroundColor: "#5D3FD3",
          padding: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imgCont: {
    paddingTop: "10%",
    alignItems: "center",
  },

  inCont: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 20,
  },

  inText: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 30,
  },
});

export default Login;

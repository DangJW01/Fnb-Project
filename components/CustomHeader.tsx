import { View, Text, StyleSheet, Image } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Link } from "expo-router";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const SearchBar = () => (
  <View style={styles.searchContainer}>
    <View style={styles.searchSection}>
      <View style={styles.searchField}>
        <Ionicons
          style={styles.searchIcon}
          name="ios-search"
          size={20}
          color={Colors.medium}
        ></Ionicons>
        <TextInput placeholder="Search"></TextInput>
      </View>
    </View>
  </View>
);

const CustomHeader = () => {
  //   const bottomSheetRef = useRef<BottomSheetModal>(null);

  //   const openModal = () => {
  //     bottomSheetRef.current?.present();
  //   };

  return (
    <SafeAreaView style={styles.SafeAra}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TouchableOpacity>
            <Image style={styles.bike} source={require("../assets/bike.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.titleContainer}>
            <Text style={styles.title}>Delivery-Now</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.subTitle}>Kuala Lumpur</Text>
              <Ionicons
                name="chevron-down-outline"
                size={20}
                color={Colors.primary}
              ></Ionicons>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.profileBtn}>
          <Ionicons
            name="person-outline"
            size={20}
            color={Colors.primary}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SafeAra: {
    flex: 1,
    backgroundColor: "orange",
  },

  titleContainer: {},

  searchContainer: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "#fff",
  },

  searchSection: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  searchField: {
    borderRadius: 8,
    flex: 1,
    backgroundColor: Colors.lightGrey,
    flexDirection: "row",
    alignItems: "center",
  },

  searchIcon: { paddingLeft: 10 },

  optionBtn: {
    padding: 10,
    borderRadius: 50,
  },

  container: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  profileBtn: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 50,
  },

  title: {
    fontSize: 14,
    color: Colors.medium,
  },

  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.medium,
  },

  input: {
    padding: 10,
    color: Colors.mediumDark,
  },

  bike: {
    width: 45,
    height: 45,
  },
});

export default CustomHeader;

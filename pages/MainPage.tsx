import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import Categories from "../components/categories";
import CustomHeader from "../components/CustomHeader";

const MainPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.header}>Categories</Text>
        <Categories />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 100,
    backgroundColor: "white",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});

export default MainPage;

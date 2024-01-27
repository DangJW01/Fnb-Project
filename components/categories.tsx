import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
// import { categories } from "@/assets/data/home";

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}
    >
      {/* {categories.map((category, index) => (
        <View style={styles.categoryCard} key={index}>
          <Image source={category.img} />
          <Text style={styles.categoryText}>{category.text}</Text>
        </View>
      ))} */}

      <View style={styles.categoryCard}>
        <Image
          style={{ width: 100, height: 70 }}
          source={require("../assets/meat.jpg")}
        />
        <Text style={styles.categoryText}>Meat</Text>
      </View>
      <View style={styles.categoryCard}>
        <Image
          style={{ width: 100, height: 70 }}
          source={require("../assets/liquor.jpg")}
        />
        <Text style={styles.categoryText}>Liquor</Text>
      </View>
      <View style={styles.categoryCard}>
        <Image
          style={{ width: 100, height: 70 }}
          source={require("../assets/Coffee.jpg")}
        />
        <Text style={styles.categoryText}>Coffee</Text>
      </View>
      <View style={styles.categoryCard}>
        <Image
          style={{ width: 100, height: 70 }}
          source={require("../assets/asian.jpg")}
        />
        <Text style={styles.categoryText}>Asian</Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  categoryCard: {
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    marginEnd: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  categoryText: {
    padding: 6,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Categories;

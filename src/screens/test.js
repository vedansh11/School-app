import React from "react";
import { View, StyleSheet } from "react-native";

const ScoopedCorner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.scoop} />
      <View style={styles.content}>{/* Your content goes here */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 80,
    backgroundColor: "#522d5b",
    overflow: "hidden", // Clip content that goes beyond the container's boundaries
    position: "relative",
  },
  scoop: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#522d5b",
    top: -20,
    left: -20,
  },
  content: {
    // Add padding or other styles for your content
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ScoopedCorner;

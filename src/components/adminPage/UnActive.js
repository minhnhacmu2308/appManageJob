import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width: WIDTH } = Dimensions.get("window");
var e;

class UnActive extends Component {
  constructor(props) {
    super(props);
    e = this;
  }
  render() {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Text>This is list UnActive</Text>
      </View>
    );
  }
}

export default UnActive;

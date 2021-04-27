import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage
} from "react-native";

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    var isLogined = await AsyncStorage.getItem(
      "isLogined"
    );
    isLogined =
      isLogined === null ? false : isLogined;

    if (isLogined) {
      this.props.navigation.navigate("home");
    } else {
      this.props.navigation.navigate("login");
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white"
        }}
      />
    );
  }
}

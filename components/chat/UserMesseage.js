import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from "react-native";

const { width, height } = Dimensions.get(
  "window"
);

import { TypingAnimation } from "react-native-typing-animation";

export default class ServiceMesseage extends Component {
  constructor(props) {
    super(props);
    this.state = { isWait: true };
  }

  /* componentDidMount는 정말 처음에만 들어오나? render 이후에는 */
  componentDidMount() {
    const {
      isWait,
      _update,
      index,
      delay
    } = this.props;
    if (isWait) {
      setTimeout(() => {
        _update(index);
        this.setState({ isWait: false });
      }, delay);
    } else {
      this.setState({ isWait: false });
    }
  }

  render() {
    // 얘는 로딩이 필요 없음
    const { isWait } = false;
    if (isWait) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "row",
            marginTop: 3,
            marginBottom: 3
          }}
        >
          <View
            style={
              this.props.isFirst
                ? styles.first_profile
                : styles.second_profile
            }
          />

          <TypingAnimation
            dotColor="black"
            dotMargin={10}
            dotAmplitude={5}
            dotSpeed={0.15}
            dotRadius={5}
            dotX={20}
            dotY={-6}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-end",
            flexDirection: "row",
            marginTop: 3,
            marginBottom: 3,
            marginRight: 15
          }}
        >
          <View
            style={
              this.props.isFirst
                ? styles.first_message
                : styles.second_message
            }
          >
            <Text
              style={{
                fontSize: 16,
                padding: 10,
                fontWeight: "400",
                color: "white"
              }}
            >
              {this.props.text}
            </Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  first_message: {
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: "#15badb",
    maxWidth: width - 150
  },
  second_message: {
    borderRadius: 15,
    backgroundColor: "#15badb",
    maxWidth: width - 150
  }
});

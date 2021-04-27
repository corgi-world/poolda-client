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

    this.isUnmount = false;
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
        if (this.isUnmount === false) {
          _update(index);
          this.setState({ isWait: false });
        }
      }, delay);
    } else {
      if (this.isUnmount === false) {
        this.setState({ isWait: false });
      }
    }
  }

  componentWillUnmount() {
    this.isUnmount = true;
  }

  render() {
    const { isWait } = this.state;
    if (isWait) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            marginTop: 2,
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
            justifyContent: "flex-start",
            flexDirection: "row",
            marginTop: 2,
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
                padding: 10
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
  first_profile: {
    width: 41,
    height: 41,
    borderRadius: 25,
    marginLeft: 5,
    marginRight: 3,
    backgroundColor: "green"
  },
  second_profile: {
    width: 41,
    height: 41,
    marginLeft: 5,
    marginRight: 3
  },
  first_message: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    backgroundColor: "#eaeaea",
    maxWidth: width - 150
  },
  second_message: {
    borderRadius: 15,
    backgroundColor: "#eaeaea",
    maxWidth: width - 150
  }
});

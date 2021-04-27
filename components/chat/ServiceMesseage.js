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

import MyPieChart from "../../components/chat/MyPieChart";

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
    const {
      isBubble,
      bubbleValue,
      _isFocused
    } = this.props;

    if (isWait) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "row",
            marginTop: 20,
            marginBottom: 20,
            marginLeft: 16
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
            dotRadius={4}
            dotX={20}
            dotY={-6}
          />
        </View>
      );
    } else if (isBubble) {
      return (
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "row",
            marginTop: 3,
            marginBottom: 3,
            marginLeft: 16
          }}
        >
          <View
            style={[
              this.props.isFirst
                ? styles.first_message
                : styles.second_message,
              { padding: 10 }
            ]}
          >
            <MyPieChart
              sentiments={JSON.parse(bubbleValue)}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "row",
            marginTop: 3,
            marginBottom: 3,
            marginLeft: 16
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
              style={[
                {
                  fontSize: 16,
                  padding: 10
                },
                _isFocused
                  ? { fontWeight: "600" }
                  : {}
              ]}
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

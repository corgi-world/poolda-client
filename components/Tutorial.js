import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppIntroSlider from "react-native-app-intro-slider";

const { width, height } = Dimensions.get(
  "window"
);

const slides = [
  {
    key: "1"
  },
  {
    key: "2"
  },
  {
    key: "3"
  },
  {
    key: "4"
  }
];

export default class Tuto extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{
            backgroundColor: "transparent"
          }}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{
            backgroundColor: "transparent"
          }}
        />
      </View>
    );
  };

  _renderItem = item => {
    const index = item.index;
    if (index == 0) {
      return (
        <View style={styles.container}>
          <Image
            style={{
              width: 164,
              height: 116
            }}
            source={require("../assets/images/Logo_Text.png")}
            resizeMode={"contain"}
          />
          <View style={{ marginTop: 65 }}>
            <Text
              style={{
                fontSize: 24
              }}
            >
              어서오세요,
            </Text>
            <Text style={{ fontSize: 24 }}>
              풀다입니다.
            </Text>
          </View>
        </View>
      );
    } else if (index == 1) {
      return (
        <View style={styles.container}>
          <Image
            style={{
              width: 430,
              height: 430
            }}
            source={require("../assets/images/guide2.png")}
            resizeMode={"contain"}
          />
          <View style={{ marginTop: 50 }}>
            <Text
              style={{
                fontSize: 22,
                textAlign: "center"
              }}
            >
              오늘 하루를
            </Text>
            <Text
              style={{
                fontSize: 22,
                textAlign: "center"
              }}
            >
              풀고래에게 말씀해보세요.
            </Text>
          </View>
        </View>
      );
    } else if (index == 2) {
      return (
        <View style={styles.container}>
          <Image
            style={{
              width: 300,
              height: 300
            }}
            source={require("../assets/images/guide3.png")}
            resizeMode={"contain"}
          />
          <View style={{ marginTop: 47 }}>
            <Text
              style={{
                fontSize: 24,
                textAlign: "center"
              }}
            >
              당신의 일상과
            </Text>
            <Text
              style={{
                fontSize: 24,
                textAlign: "center"
              }}
            >
              감정을 기록해드려요.
            </Text>
          </View>
        </View>
      );
    } else if (index == 3) {
      return (
        <View style={styles.container}>
          <View
            style={{
              flex: 2,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                width: 164,
                height: 116
              }}
              source={require("../assets/images/Logo_Text.png")}
              resizeMode={"contain"}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end"
            }}
          >
            <View
              style={{
                width: width,
                height: 70,
                position: "absolute",
                right: 0,
                top: 20,
                zIndex: 5
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  marginHorizontal: 70,
                  borderRadius: 100,
                  shadowColor: "#000000",
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowRadius: 5,
                  shadowOpacity: 0.5
                }}
                onPress={this.props.tutorialDone}
              >
                <Text
                  style={{
                    fontSize: 23,
                    fontWeight: "400",
                    color: "#06A9C8",
                    fontWeight: "800",
                    textAlign: "center"
                  }}
                >
                  시작하기
                </Text>
              </TouchableOpacity>
            </View>

            <Image
              style={{
                width: width,
                height: 330
              }}
              source={require("../assets/images/guide4.png")}
              resizeMode={"contain"}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text>{item.item.key}</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        renderNextButton={this._renderNextButton}
        activeDotStyle={{
          backgroundColor: "black"
        }}
        doneLabel={""}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});

import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  AsyncStorage,
  StyleSheet,
  Button,
  Platform,
} from "react-native";

import RegisterForPushNotificationsAsync from "../../utils/Notification";

import ServerURL from "../../utils/ServerURL";
import axios from "axios";

import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  Foundation,
} from "@expo/vector-icons";

import Modal from "react-native-modal";

const { width, height } = Dimensions.get(
  "window"
);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      timeText: "",
      modalVisible: false,
    };
  }

  _onFocused = () => {};

  componentDidMount = async () => {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener(
      "didFocus",
      this._onFocused
    );

    const userInfo = await AsyncStorage.getItem(
      "userInfo"
    );
    const userObject = JSON.parse(userInfo);
    let nickname = userObject.nickname;
    let sleepTime = userObject.sleepTime;
    const date = new Date(sleepTime);
    let timeText =
      date.getHours() +
      "시 " +
      date.getMinutes() +
      "분";
    this.setState({ nickname, timeText });

    if (userObject.token === "-") {
      // let token = await RegisterForPushNotificationsAsync();
      let token = "-";
      let id = userObject.id;
      if (token == null) {
        token = "-";
      }
      let result = null;

      try {
        result = await axios.post(
          ServerURL + "user/saveToken",
          {
            token,
            id,
          },
          { timeout: 2000 }
        );
      } catch (err) {
        console.log("token axios 1");
      }
      if (result !== null) {
        const r = result.data.result;
        if (r == "OK") {
          delete result.data.userInfo.password;
          const userInfo = result.data.userInfo;
          const userInfoString = JSON.stringify(
            userInfo
          );
          await AsyncStorage.setItem(
            "userInfo",
            userInfoString
          );
          console.log("userInfo update");
        } else {
          console.log("token axios 2");
        }
      }
    }

    let b = await AsyncStorage.getItem(
      "isTestComplete"
    );

    const isTestComplete =
      b == null ? false : false; // b
    if (isTestComplete == false) {
      this._showModal();
    }
  };

  _showModal() {
    setTimeout(() => {
      console.log("show modal");
      this.setState({ modalVisible: true });
    }, 1000);
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  renderModalContent = () => (
    <View style={styles.content}>
      <Text style={styles.contentTitle}>
        처음 오셨군요!
      </Text>
      <Text style={styles.contentTitle}>
        본인의 감정을 잘 파악하는지
      </Text>
      <Text style={styles.contentTitle}>
        테스트 해보실래요?👋
      </Text>
      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => {
          this.setState({ modalVisible: false });
          this.props.navigation.navigate(
            "tas_20k"
          );
        }}
      >
        <Text>이동하기</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const { nickname, timeText } = this.state;
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Modal
          isVisible={this.state.modalVisible}
          backdropColor="black"
          backdropOpacity={0.6}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
        >
          {this.renderModalContent()}
        </Modal>

        <LinearGradient
          style={{
            flex: 5,
          }}
          colors={["#98F6E2", "#06A9C8"]}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 111,
                  height: 111,
                }}
                source={require("../../assets/images/Logo.png")}
                resizeMode={"contain"}
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginTop: 15,
                fontSize: 30,
                fontWeight: "400",
                color: "white",
                textAlign: "center",
              }}
            >
              {nickname}님,{"\n"}오늘 하루는{"\n"}
              어떠신가요?
            </Text>
          </View>
        </LinearGradient>
        <View
          style={{
            flex: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: width,
              height: 70,
              position: "absolute",
              right: 0,
              top: -35,
              zIndex: 5,
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

                ...Platform.select({
                  ios: {
                    shadowColor: "#000000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowRadius: 5,
                    shadowOpacity: 0.5,
                  },
                  android: { elevation: 10 },
                }),
              }}
              onPress={() => {
                this.props.navigation.navigate(
                  "chat"
                );
              }}
            >
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: "400",
                  color: "#06A9C8",
                  fontWeight: "800",
                  textAlign: "center",
                }}
              >
                풀고래와 대화하기
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginTop: 15,
              fontSize: 16,
              fontWeight: "400",
              color: "black",
              textAlign: "center",
            }}
          >
            지금 대화하지 않으셔도{"\n"}
            {timeText}에{"\n"}알려드릴 거예요.
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(
                "setting"
              );
            }}
          >
            <View
              style={{
                borderBottomColor: "gray",
                borderBottomWidth: 0.5,
              }}
            >
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 14,
                  color: "gray",
                }}
              >
                시간 바꾸기
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ marginLeft: 40 }}
            onPress={() => {
              this.props.navigation.navigate(
                "report"
              );
            }}
          >
            <Foundation
              size={30}
              name="graph-bar"
              color={"#06A9C8"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 40 }}
            onPress={() => {
              this.props.navigation.navigate(
                "setting"
              );
            }}
          >
            <Ionicons
              size={30}
              name="ios-settings"
              color={"#06A9C8"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

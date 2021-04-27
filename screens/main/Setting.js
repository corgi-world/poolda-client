import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  AsyncStorage
} from "react-native";

const { width, height } = Dimensions.get(
  "window"
);

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = { nickname: "", timeText: "" };
  }

  componentDidMount = async () => {
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
  };

  render() {
    const { nickname, timeText } = this.state;
    return (
      <SafeAreaView
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            width: width - 100,
            marginLeft: 50
          }}
        >
          <Text style={styles.text}>
            닉네임 변경
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 24
            }}
          >
            <TextInput
              style={[styles.textInput, {}]}
              autoCorrect={false}
              placeholder={"닉네임"}
              returnKeyType={"done"}
              pointerEvents="none"
              value={nickname}
            />
            <View style={styles.changeButton}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    color: "white"
                  }}
                >
                  변경
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.text}>
            비밀번호 변경
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 24
            }}
          >
            <TextInput
              style={[styles.textInput, {}]}
              autoCorrect={false}
              placeholder={"비밀번호"}
              returnKeyType={"done"}
            />
            <View style={styles.changeButton}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    color: "white"
                  }}
                >
                  변경
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.text}>
            알림 시각
          </Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={[styles.textInput, {}]}
              autoCorrect={false}
              placeholder={"알림 시각"}
              returnKeyType={"done"}
              pointerEvents="none"
              value={timeText}
            />
            <View style={styles.changeButton}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    color: "white"
                  }}
                >
                  변경
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={styles.touchableOpacity_big}
          >
            <Text style={styles.text_black}>
              공지사항
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableOpacity_big}
            onPress={() => {
              this.props.navigation.navigate(
                "tas_20k"
              );
            }}
          >
            <Text style={styles.text_black}>
              자가척도 테스트
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableOpacity_big}
          >
            <Text style={styles.text_orange}>
              기록 삭제
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableOpacity_big}
          >
            <Text style={styles.text_red}>
              회원 탈퇴
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  touchableOpacity_big: {
    width: 240,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 100,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.2,
    marginBottom: 24
  },
  text_black: {
    fontSize: 16,
    fontWeight: "600",
    color: "#474747"
  },
  text_orange: {
    fontSize: 16,
    fontWeight: "600",
    color: "#db3700"
  },
  text_red: {
    fontSize: 16,
    fontWeight: "600",
    color: "#db0000"
  },
  text: {
    fontSize: 16,
    marginLeft: 4,
    marginBottom: 8
  },
  textInput: {
    flex: 4,
    fontSize: 15,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#bebebe",
    borderRadius: 10,
    marginRight: 10
  },
  changeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#15badb",
    borderRadius: 18
  }
});

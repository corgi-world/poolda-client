import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TextInput,
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";

const { width, height } = Dimensions.get(
  "window"
);

import ServerURL from "../utils/ServerURL";
import axios from "axios";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimePickerVisible: false,
      selectedTimeString: "",
      id: "",
      isIdDuplicated: true,
      password: "",
      passwordCheck: "",
      nickname: "",
      sleepTime: new Date().toString()
    };
  }

  _signup = async () => {
    const c = this._checkSignup();
    if (!c) {
      return;
    }

    const {
      id,
      password,
      nickname,
      sleepTime
    } = this.state;

    let result = null;

    try {
      result = await axios.post(
        ServerURL + "user/signup",
        {
          id,
          password,
          nickname,
          sleepTime
        },
        { timeout: 2000 }
      );
    } catch (err) {}
    if (result !== null) {
      const r = result.data.result;
      if (r === "OK") {
        this._showAlert(
          "회원가입 성공",
          "확인",
          () => {
            this.props.navigation.navigate(
              "login"
            );
          }
        );
      } else {
        this._showAlert("회원가입 오류1", "확인");
      }
    } else {
      this._showAlert("회원가입 오류2", "확인");
    }
  };

  _checkSignup = state => {
    const {
      id,
      isIdDuplicated,
      password,
      passwordCheck,
      nickname,
      selectedTimeString
    } = this.state;
    const isPasswordEquals =
      password === passwordCheck;
    if (
      id == "" ||
      password == "" ||
      passwordCheck == "" ||
      nickname == "" ||
      selectedTimeString == ""
    ) {
      this._showAlert("모두 입력하세요", "확인");
      return false;
    } else if (isIdDuplicated) {
      this._showAlert(
        "아이디 중복확인을 눌러주세요",
        "확인"
      );
      return false;
    } else if (!isPasswordEquals) {
      this._showAlert(
        "비밀번호를 확인해주세요",
        "확인"
      );
      return false;
    } else {
      return true;
    }
  };

  _checkIdDuplicated = async () => {
    const { id } = this.state;
    if (id === "") {
      this._showAlert("아이디를 입력하세요");
      return;
    } else {
      let result = null;

      try {
        result = await axios.post(
          ServerURL + "user/isIdDuplicated",
          {
            id
          },
          { timeout: 2000 }
        );
      } catch (err) {}

      if (result !== null) {
        const r = result.data.result;
        const b = result.data.isIdDuplicated;
        if (r === "OK") {
          if (b) {
            this._showAlert(
              "이미 사용 중인 아이디입니다.",
              "확인"
            );
          } else {
            this._showAlert(
              "사용하실 수 있는 아이디입니다.",
              "확인"
            );
          }
          this.setState({ isIdDuplicated: b });
        } else {
          this._showAlert(
            "중복확인 오류1",
            "확인"
          );
        }
      } else {
        this._showAlert("중복확인 오류2", "확인");
      }
    }
  };

  _showAlert(text, cancelText) {
    Alert.alert(
      text,
      "",
      [
        {
          text: cancelText
        }
      ],
      { cancelable: false }
    );
  }
  _showAlert(text, cancelText, f) {
    Alert.alert(
      text,
      "",
      [
        {
          text: cancelText,
          onPress: f
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    // console.log(this.state);
    return (
      <SafeAreaView
        style={{
          flex: 1,
          width: width - 100,
          alignItems: "center",
          marginLeft: 50
        }}
      >
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
            flex: 3,
            justifyContent: "flex-start"
          }}
        >
          <Text style={styles.text}>아이디</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <TextInput
              style={[
                styles.textInput,
                { flex: 1, marginRight: 25 }
              ]}
              autoCorrect={false}
              returnKeyType={"done"}
              placeholder={"아이디"}
              onChangeText={text => {
                this.setState({ id: text });
              }}
            />
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                this._checkIdDuplicated();
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "400"
                }}
              >
                중복확인
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.text,
              { marginTop: 20 }
            ]}
          >
            비밀번호
          </Text>
          <TextInput
            style={styles.textInput}
            value={this.state.password}
            autoCorrect={false}
            returnKeyType={"done"}
            placeholder={"비밀번호"}
            secureTextEntry={true}
            onChangeText={text => {
              this.setState({ password: text });
            }}
          />

          <Text
            style={[
              styles.text,
              {
                marginTop: 20
              }
            ]}
          >
            비밀번호 확인
          </Text>
          <TextInput
            style={styles.textInput}
            value={this.state.passwordCheck}
            autoCorrect={false}
            returnKeyType={"done"}
            placeholder={"비밀번호 확인"}
            secureTextEntry={true}
            onChangeText={text => {
              this.setState({
                passwordCheck: text
              });
            }}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: 20
            }}
          >
            <View
              style={{
                flex: 1,
                marginRight: 20
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.text]}>
                  닉네임
                </Text>
                <TextInput
                  style={styles.textInput2}
                  autoCorrect={false}
                  returnKeyType={"done"}
                  placeholder={"닉네임"}
                  onChangeText={text => {
                    this.setState({
                      nickname: text
                    });
                  }}
                />
              </View>
            </View>

            <View
              style={{
                flex: 1
              }}
            >
              <Text style={[styles.text]}>
                취침 시각
              </Text>

              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    isTimePickerVisible: true
                  });
                }}
              >
                <TextInput
                  style={styles.textInput2}
                  autoCorrect={false}
                  returnKeyType={"done"}
                  placeholder={"취침 시각"}
                  pointerEvents="none"
                  value={
                    this.state.selectedTimeString
                  }
                />
              </TouchableOpacity>
            </View>

            <DateTimePicker
              mode={"time"}
              isVisible={
                this.state.isTimePickerVisible
              }
              minuteInterval={1}
              titleIOS={"선택"}
              cancelTextIOS={"취소"}
              confirmTextIOS={"선택"}
              hideTitleContainerIOS={true}
              date={
                new Date(this.state.sleepTime)
              }
              onConfirm={time => {
                var s = _toStringTime(time);

                this.setState({
                  sleepTime: time.toString(),
                  selectedTimeString: s,
                  isTimePickerVisible: false
                });
              }}
              onCancel={() => {
                this.setState({
                  isTimePickerVisible: false
                });
              }}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <TouchableOpacity
            style={{
              width: 240,
              height: 68,
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
              shadowOpacity: 0.2
            }}
            onPress={this._signup}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "400",
                color: "#06a8c8",
                fontWeight: "800",
                textAlign: "center"
              }}
            >
              시작하기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 20,
              alignItems: "center"
            }}
            onPress={() => {
              this.props.navigation.navigate(
                "login"
              );
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#474747",
                fontWeight: "600"
              }}
            >
              기존 회원 로그인
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginLeft: 4,
    marginBottom: 8
  },
  textInput: {
    width: width - 100,
    fontSize: 15,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#bebebe",
    borderRadius: 10
  },
  textInput2: {
    fontSize: 15,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#bebebe",
    borderRadius: 10
  }
});

function _toStringDate(date) {
  var s =
    date.getFullYear() +
    "년 " +
    (date.getMonth() + 1) +
    "월 " +
    date.getDate() +
    "일";

  return s;
}

function _toStringTime(time) {
  var s =
    time.getHours() +
    "시 " +
    time.getMinutes() +
    "분";

  return s;
}

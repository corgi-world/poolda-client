import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  AsyncStorage,
  Dimensions,
  Alert,
  TouchableOpacity
} from "react-native";

const { width, height } = Dimensions.get(
  "window"
);

import ServerURL from "../utils/ServerURL";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { id: "", password: "" };
  }

  _onFocused = async () => {};

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener(
      "didFocus",
      this._onFocused
    );
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _login = async () => {
    const { id, password } = this.state;

    if (id === "" || password === "") {
      this._showAlert(
        "아이디와 비밀번호를\n모두 입력하세요"
      );
      return;
    }

    let result = null;

    try {
      result = await axios.post(
        ServerURL + "user/login",
        {
          id,
          password
        },
        { timeout: 2000 }
      );
    } catch (err) {}
    if (result !== null) {
      const r = result.data.result;
      if (r === "OK") {
        delete result.data.userInfo.password;
        const userInfo = result.data.userInfo;
        const userInfoString = JSON.stringify(
          userInfo
        );
        await AsyncStorage.setItem(
          "isLogined",
          "true"
        );
        await AsyncStorage.setItem(
          "userInfo",
          userInfoString
        );

        console.log("login " + userInfo);

        this.props.navigation.navigate("main");
      } else if (r === "NO") {
        const message = result.data.message;
        this._showAlert(message, "확인");
      } else {
        this._showAlert("로그인 오류1", "확인");
      }
    } else {
      this._showAlert("로그인 오류2", "확인");
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
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center"
        }}
      >
        <View
          style={{
            flex: 1.5,
            justifyContent: "center",
            alignContent: "center"
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
            justifyContent: "flex-start"
          }}
        >
          <Text style={styles.text}>아이디</Text>
          <TextInput
            style={[
              styles._textInput,
              { marginBottom: 25 }
            ]}
            autoCorrect={false}
            placeholder={"아이디"}
            returnKeyType={"done"}
            onChangeText={text => {
              this.setState({ id: text });
            }}
          />
          <Text style={styles.text}>
            비밀번호
          </Text>
          <TextInput
            style={styles._textInput}
            autoCorrect={false}
            placeholder={"비밀번호"}
            returnKeyType={"done"}
            secureTextEntry={true}
            onChangeText={text => {
              this.setState({ password: text });
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center"
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
            onPress={this._login}
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
              로그인
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 20,
              alignItems: "center"
            }}
            onPress={() => {
              this.props.navigation.navigate(
                "signup"
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
              회원가입
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
  _textInput: {
    width: width - 100,
    fontSize: 15,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#bebebe",
    borderRadius: 10
  }
});

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Keyboard,
  AsyncStorage,
} from "react-native";

var CollectionsList = require("collections/list");

import uuidv1 from "uuid/v1";
import KeyboardSpacer from "react-native-keyboard-spacer";

import {
  MaxLevel,
  EndLevel,
  MessageScript,
  BlockScript,
  MessageDelay,
} from "../../scripts/TAS_20K_Script";

import InputBlock from "../../components/chat/InputBlock";
import MessageManager from "../../components/chat/MessageManager";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.userNickname = "";

    this.scroll = null;
    this.yOffset = null;

    this.modeEnum = {
      none: 0,
      wait: 1,
      test: 2,
    };

    this.messageTypeEnum = {
      service: 0,
      user: 1,
    };

    this.state = {
      mode: this.modeEnum.wait,
      level: 0,
      testScore: 0,
      testStart: false,

      messages: {},
    };
  }

  _updateComplete(id) {
    if (this.state.testStart) {
      this.setState({ mode: this.modeEnum.test });
    }
  }

  _setScriptUserNickname(nickname) {
    this.userNickname = nickname;
    const script = MessageScript;
    for (var i = 0; i < MaxLevel + 1; i++) {
      for (var j = 0; j < script[i].length; j++) {
        const s = script[i][j]
          .split("@@")
          .join(nickname);
        script[i][j] = s;
      }
    }
  }

  componentDidMount = async () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide.bind(this)
    );

    const userInfo = await AsyncStorage.getItem(
      "userInfo"
    );
    const userObject = JSON.parse(userInfo);
    const userNickname = userObject.nickname;

    this._setScriptUserNickname(userNickname);

    const id = uuidv1();
    const object = {
      [id]: {
        id: id,
        type: this.messageTypeEnum.service,
        isComplete: false,
        texts: MessageScript[this.state.level],
        delays: MessageDelay[this.state.level],
      },
    };

    this.setState((prevState) => {
      const newState = {
        ...prevState,
        mode: this.modeEnum.wait,
        level: 0,
        testStart: true,
        messages: {
          ...prevState.messages,
          ...object,
        },
      };

      return { ...newState };
    });
  };

  _scrollToEnd = () => {
    this.scroll.scrollToEnd({ animated: true });
  };
  _keyboardDidShow() {
    this._scrollToEnd();
  }
  _keyboardDidHide() {
    this._scrollToEnd();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <ScrollView
            ref={(scroll) => {
              this.scroll = scroll;
            }}
            style={{
              flex: 1,
              backgroundColor: "white",
            }}
            onContentSizeChange={() => {
              this._scrollToEnd();
            }}
            onScroll={(event) => {
              /*
              this.yOffset =
                event.nativeEvent.contentOffset.y;
              console.log(this.yOffset);
              console.log(
                event.nativeEvent.contentSize
                  .height
              );
              console.log(
                event.nativeEvent
                  .layoutMeasurement.height
              );*/
            }}
            onScrollEndDrag={(event) => {
              /*
              this.yOffset =
                event.nativeEvent.contentOffset.y;*/
            }}
            scrollEventThrottle={160}
          >
            {Object.values(
              this.state.messages
            ).map((message) => {
              return (
                <MessageManager
                  key={message.id}
                  id={message.id}
                  type={message.type}
                  isComplete={message.isComplete}
                  texts={message.texts}
                  delays={message.delays}
                  _updateComplete={this._updateComplete.bind(
                    this
                  )}
                />
              );
            })}
          </ScrollView>
          {this._makeInput()}
        </SafeAreaView>
        <KeyboardSpacer />
      </View>
    );
  }

  _pushedInputBlock = async (index, text) => {
    const userMessageId = uuidv1();
    const userObject = {
      [userMessageId]: {
        id: userMessageId,
        type: this.messageTypeEnum.user,
        isComplete: true,
        texts: [text],
        delays: 0,
      },
    };

    let score = 0;
    if (this.state.level != 0) {
      score = index + 1;
    }

    let script = null;

    let level = this.state.level + 1;
    if (this.state.level == MaxLevel) {
      var clone = JSON.parse(
        JSON.stringify(MessageScript[level])
      );
      let newScript = new CollectionsList();
      for (var i = 0; i < clone.length; i++) {
        newScript.add(clone[i]);
      }

      let finalScore =
        Number(this.state.testScore) +
        Number(score);

      const realScore = (
        finalScore / MaxLevel
      ).toFixed(2);
      if (realScore <= 1.9) {
        newScript.add(
          this.userNickname +
            "?????? (" +
            realScore +
            ") ????????? ?????? ????????? ??? ????????? ???????????????!"
        );
        newScript.add(
          "???????????? ?????? ?????? ????????? ????????? ??????????????? ??? ?????? ????????? ??????????????? ??? ?????????????"
        );
        newScript.add(
          "????????? ?????? ?????? ??????????????? ?????? ?????? ?????????!"
        );
      } else if (
        1.9 < realScore &&
        realScore <= 2.3
      ) {
        newScript.add(
          this.userNickname +
            "?????? (" +
            realScore +
            ") ????????? ?????? ????????? ??? ????????? ???????????????!"
        );
        newScript.add(
          "???????????? ?????? ?????? ????????? ????????? ??????????????? ??? ?????? ????????? ??????????????? ??? ?????????????"
        );
        newScript.add(
          "????????? ?????? ?????? ??????????????? ?????? ?????? ?????????!"
        );
      } else if (2.3 < realScore) {
        newScript.add(
          this.userNickname +
            "?????? (" +
            realScore +
            ") ????????? ???????????? ???????????? ?????? ????????? ?????? ???????????? ???????????? ????????? ???????????? ?????????."
        );
        newScript.add(
          "??? ???????????? ?????? ????????? ??????????????? ?????? ?????????????"
        );
      } else {
        newScript.add(
          this.userNickname +
            "?????? (" +
            realScore +
            ") ????????? ?????? ??????????????? ?????? ???????????? ????????? ???????????????."
        );
        newScript.add(
          "??? ???????????? ?????? ????????? ??????????????? ?????? ?????????????"
        );
      }

      await AsyncStorage.setItem(
        "isTestComplete",
        "true"
      );

      script = newScript.toArray();
    } else if (this.state.level == MaxLevel + 1) {
      if (index == 0) {
        this.props.navigation.navigate("chat");
        return;
      } else if (index == 1) {
        script = MessageScript[level];
      }
    } else {
      script = MessageScript[level];
    }

    const serviceMessageId = uuidv1();
    const serviceObject = {
      [serviceMessageId]: {
        id: serviceMessageId,
        type: this.messageTypeEnum.service,
        isComplete: false,
        texts: script,
        delays: MessageDelay[level],
      },
    };

    this.setState((prevState) => {
      const newState = {
        ...prevState,
        mode: this.modeEnum.wait,
        level: level,
        testScore: prevState.testScore + score,
        messages: {
          ...prevState.messages,
          ...userObject,
          ...serviceObject,
        },
      };

      return { ...newState };
    });
  };

  _makeInput = () => {
    const { mode, level } = this.state;
    if (level == MaxLevel + 2) {
      return <View />;
    }

    items = {};

    let length = BlockScript[level].length;
    let height = 39;

    if (mode === this.modeEnum.wait) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height,
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            ????????? ??????????????????!
          </Text>
        </View>
      );
    } else if (mode === this.modeEnum.test) {
      var scripts = BlockScript[level];
      for (var i = 0; i < scripts.length; i++) {
        var text = scripts[i];
        items[i] = {
          index: i,
          text,
        };
      }

      return (
        <InputBlock
          script={scripts}
          _pushedInputBlock={
            this._pushedInputBlock
          }
          _scrollToEnd={this._scrollToEnd}
        />
      );
    }
  };
}

const styles = StyleSheet.create({});

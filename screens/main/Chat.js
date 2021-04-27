import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  Keyboard,
  Text,
  TouchableOpacity,
  AsyncStorage
} from "react-native";

import uuidv1 from "uuid/v1";
import KeyboardSpacer from "react-native-keyboard-spacer";

import {
  OnboardingMessageScript,
  OnboardingMessageDelay,
  OnboardingBlockScript,
  MessageScript,
  MessageDelay,
  BlockScript
} from "../../scripts/Chat_Script_Simple";

import InputBlock from "../../components/chat/InputBlock";
import ListManager from "../../components/chat/ListManager";
import MessageManager from "../../components/chat/MessageManager";

import ServerURL from "../../utils/ServerURL";
import axios from "axios";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.isChatFirst = true;
    this.userID = "";
    this.userNickname = "";
    this.feedbackType = null;

    this.scroll = null;
    this.yOffset = null;

    this.followEnum = {
      onboarding: 0,
      main: 1,
      end: 2
    };

    this.modeEnum = {
      none: 0,
      wait: 1,
      button: 2,
      text: 3,
      list: 4
    };

    this.messageTypeEnum = {
      service: 0,
      user: 1
    };

    this.state = {
      follow: this.followEnum.onboarding,
      mode: this.modeEnum.wait,
      level: 0,

      messages: {},

      inputText: "",
      sentimentTitle: "default",

      diary_my: "",
      diary_my_sentiments: {},

      diary_other: "",
      diary_other_index: "",
      diary_other_nickname: "",
      diary_other_sentimentTitle: "default",
      diary_other_sentiments: {}
    };
  }

  _setScriptUserNickname(nickname) {
    this.userNickname = nickname;
    const script1 = MessageScript;
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < script1[i].length; j++) {
        const s = script1[i][j].split("@@").join(nickname);
        script1[i][j] = s;
      }
    }
    const script2 = OnboardingMessageScript[true];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < script2[i].length; j++) {
        const s = script2[i][j].split("@@").join(nickname);
        script2[i][j] = s;
      }
    }
    const script3 = OnboardingMessageScript[false];
    for (var i = 0; i < 1; i++) {
      for (var j = 0; j < script3[i].length; j++) {
        const s = script3[i][j].split("@@").join(nickname);
        script3[i][j] = s;
      }
    }

    const script4 = MessageScript[40];
    for (var i = 0; i < script4.length; i++) {
      const s = script4[i].split("@@").join(nickname);
      script4[i] = s;
    }
  }

  _loadLastSentiments = async id => {
    let result = null;
    let lastSelected = "";

    try {
      result = await axios.post(
        ServerURL + "chat/loadLastSentiments",
        {
          id
        },
        { timeout: 2000 }
      );
    } catch (err) {
      console.log("loadLastSentiments axios 1");
    }
    if (result !== null) {
      const r = result.data.result;
      if (r == "OK") {
        lastSelected = result.data.lastSelected;

        const obj = JSON.parse(lastSelected);
        const texts = Object.keys(obj);
        let userText = "";
        for (var i = 0; i < texts.length; i++) {
          userText += texts[i];
          if (i != texts.length - 1) {
            userText += ", ";
          }
        }

        const s = OnboardingMessageScript[this.isChatFirst][0][0]
          .split("##")
          .join(userText);

        OnboardingMessageScript[this.isChatFirst][0][0] = s;
      } else {
        console.log("loadLastSentiments axios 2");
      }
    }
  };

  componentDidMount = async () => {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide.bind(this)
    );

    const userInfo = await AsyncStorage.getItem("userInfo");
    const userObject = JSON.parse(userInfo);
    this.userID = userObject.id;
    this.userNickname = userObject.nickname;

    const icf = await AsyncStorage.getItem("isChatFirst");
    this.isChatFirst = icf == null ? true : icf;
    if (this.isChatFirst == true) {
      this.isChatFirst = true;
    } else {
      this.isChatFirst = false;
    }
    // this.isChatFirst = false;
    if (this.isChatFirst == false) {
      await this._loadLastSentiments(this.userID);
    }

    this._setScriptUserNickname(this.userNickname);

    const id = uuidv1();
    const object = {
      [id]: {
        id: id,
        type: this.messageTypeEnum.service,
        isComplete: false,
        texts: OnboardingMessageScript[this.isChatFirst][0],
        delays: OnboardingMessageDelay[this.isChatFirst][0]
      }
    };

    this.setState(prevState => {
      const newState = {
        ...prevState,
        follow: this.followEnum.onboarding,
        mode: this.modeEnum.wait,
        level: 0,
        messages: {
          ...prevState.messages,
          ...object
        }
      };

      return { ...newState };
    });
  };

  _updateComplete = async id => {
    const { follow, mode, level } = this.state;

    if (follow == this.followEnum.onboarding) {
      if (this.isChatFirst && level == 0) {
        this.setState({
          mode: this.modeEnum.button
        });
      } else {
        this.setState({
          follow: this.followEnum.main,
          mode: this.modeEnum.text,
          level: 0
        });
      }
    } else if (follow == this.followEnum.main) {
      if (level == 0) {
        this.setState({
          mode: this.modeEnum.text
        });
      } else if (level == 1) {
        let result = null;
        let sentimentTitle = null;
        const text = this.state.inputText;

        try {
          result = await axios.post(
            ServerURL + "chat/sentimentTitle",
            {
              text
            },
            { timeout: 10000 }
          );
        } catch (err) {
          console.log("sentiment axios 1");
        }
        if (result !== null) {
          const r = result.data.result;
          if (r == "OK") {
            sentimentTitle = result.data.displayName;
          } else {
            console.log("sentiment axios 2");
          }
        }

        if (sentimentTitle == null) {
          sentimentTitle = "default";
        }
        console.log(sentimentTitle);

        const diary_my = this.state.inputText;
        this.setState({
          mode: this.modeEnum.list,
          inputText: "",
          sentimentTitle,
          diary_my
        });
      } else if (
        level == 2 ||
        level == 4 ||
        level == 5 ||
        level == 7 ||
        level == 20 ||
        level == 30
      ) {
        this.setState({
          mode: this.modeEnum.button
        });
      } else if (level == 3 || level == 6) {
        this.setState({
          mode: this.modeEnum.list
        });
      } else if (level == 8) {
        this.setState({
          mode: this.modeEnum.text
        });
      } else if (level == 9 || level == 40) {
        this.setState({
          follow: this.followEnum.end,
          mode: this.modeEnum.none
        });
      }
    }
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
            flex: 1
          }}
        >
          <ScrollView
            ref={scroll => {
              this.scroll = scroll;
            }}
            style={{
              flex: 1,
              backgroundColor: "white"
            }}
            onContentSizeChange={() => {
              this._scrollToEnd();
            }}
            onScroll={event => {}}
            onScrollEndDrag={event => {}}
            scrollEventThrottle={160}
          >
            {Object.values(this.state.messages).map(message => {
              return (
                <MessageManager
                  key={message.id}
                  id={message.id}
                  type={message.type}
                  isComplete={message.isComplete}
                  texts={message.texts}
                  delays={message.delays}
                  _updateComplete={this._updateComplete.bind(this)}
                  bubbleIndex={message.bubbleIndex}
                  bubbleValue={message.bubbleValue}
                  _isFocusedIndex={message._isFocusedIndex}
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
    const { follow, mode, level } = this.state;

    const userMessageId = uuidv1();
    const userObject = {
      [userMessageId]: {
        id: userMessageId,
        type: this.messageTypeEnum.user,
        isComplete: true,
        texts: [text],
        delays: 0
      }
    };

    let nextFollow = null;
    let nextMode = null;
    let nextLevel = null;
    let nextScript = null;
    let nextDelay = null;

    let _isFocusedIndex = null;

    if (follow == this.followEnum.onboarding) {
      if (this.isChatFirst) {
        if (level == 0) {
          nextScript = OnboardingMessageScript[this.isChatFirst];
          nextDelay = OnboardingMessageDelay[this.isChatFirst];

          if (index == 0) {
            nextFollow = this.followEnum.onboarding;
            nextMode = this.modeEnum.wait;
            nextLevel = level + 1;
          } else if (index == 1) {
            nextFollow = this.followEnum.end;
            nextMode = this.modeEnum.none;
            nextLevel = 2;
          }
        }
      } else if (!this.isChatFirst) {
      }
    } else if (follow == this.followEnum.main) {
      nextFollow = this.followEnum.main;
      nextMode = this.modeEnum.wait;

      if (level == 2) {
        nextScript = MessageScript;
        nextDelay = MessageDelay;

        if (index == 0) {
          nextLevel = 4;
        } else if (index == 1) {
          nextLevel = 3;
        }
      } else if (level == 4) {
        nextScript = MessageScript;
        nextDelay = MessageDelay;

        let allow = false;
        if (index == 0) {
          nextLevel = level + 1;
          allow = true;
        } else if (index == 1) {
          nextLevel = 20;
          allow = false;
        }

        // 본인이 쓴 일기, 선택한 감정, 권한 서버로 전송, 저장
        await this._saveAndLoadDiary(allow);
        await AsyncStorage.setItem("isChatFirst", "false");
      } else if (level == 5 || level == 20) {
        nextDelay = MessageDelay;
        if (index == 0) {
          nextLevel = 6;

          const { diary_other, diary_other_nickname } = this.state;

          let clone = JSON.parse(JSON.stringify(MessageScript));
          const s1 = MessageScript[nextLevel][2]
            .split("$$")
            .join(diary_other_nickname);
          const s2 = MessageScript[nextLevel][3].split("%%").join(diary_other);
          const s3 = MessageScript[nextLevel][4]
            .split("$$")
            .join(diary_other_nickname);
          clone[nextLevel][2] = s1;
          clone[nextLevel][3] = s2;
          clone[nextLevel][4] = s3;
          nextScript = clone;

          _isFocusedIndex = 3;
        } else if (index == 1) {
          nextLevel = 30;
          nextScript = MessageScript;
        }
      } else if (level == 7 || level == 30) {
        nextScript = MessageScript;
        nextDelay = MessageDelay;
        if (index == 3) {
          nextLevel = 40;
        } else {
          nextLevel = 8;
          this.feedbackType = text;
        }
      }
    }

    const serviceMessageId = uuidv1();
    const serviceObject = {
      [serviceMessageId]: {
        id: serviceMessageId,
        type: this.messageTypeEnum.service,
        isComplete: false,
        texts: nextScript[nextLevel],
        delays: nextDelay[nextLevel],
        _isFocusedIndex
      }
    };

    this.setState(prevState => {
      const newState = {
        ...prevState,
        follow: nextFollow,
        mode: nextMode,
        level: nextLevel,
        messages: {
          ...prevState.messages,
          ...userObject,
          ...serviceObject
        }
      };

      return { ...newState };
    });
  };

  _saveAndLoadDiary = async allow => {
    const { diary_my, diary_my_sentiments, sentimentTitle } = this.state;

    const userInfo = await AsyncStorage.getItem("userInfo");
    const userObject = JSON.parse(userInfo);
    const userID = userObject.id;
    const userNickname = userObject.nickname;

    let result = null;
    try {
      result = await axios.post(
        ServerURL + "chat/saveAndLoadDiary",
        {
          userID,
          userNickname,
          diary_my,
          diary_my_sentiments,
          sentimentTitle,
          allow
        },
        { timeout: 5000 }
      );
    } catch (err) {
      console.log(err);
      console.log("saveAndLoadDiary axios 1");
    }

    let diary_other = "";
    let diary_other_index = "";
    let diary_other_nickname = "";
    let diary_other_sentimentTitle = "";
    let diary_other_sentiments = "";

    if (result !== null) {
      const r = result.data.result;
      const d = result.data;

      console.log(d);

      if (r == "OK") {
        diary_other = d.diary_other;
        diary_other_index = d.diary_other_index;
        diary_other_nickname = d.diary_other_nickname;
        diary_other_sentimentTitle = d.diary_other_sentimentTitle;
        diary_other_sentiments = d.diary_other_sentiments;
      } else {
        console.log("saveAndLoadDiary axios 2");
      }
    } else if (result == null) {
      console.log("saveAndLoadDiary axios 3");
    }

    this.setState({
      diary_other,
      diary_other_index,
      diary_other_nickname,
      diary_other_sentimentTitle,
      diary_other_sentiments
    });
  };

  _sendText = async () => {
    const { follow, mode, level, inputText } = this.state;

    const userMessageId = uuidv1();
    const userObject = {
      [userMessageId]: {
        id: userMessageId,
        type: this.messageTypeEnum.user,
        isComplete: true,
        texts: [inputText],
        delays: 0
      }
    };

    let nextFollow = null;
    let nextMode = null;
    let nextLevel = null;
    let nextScript = null;
    let nextDelay = null;

    if (level == 0) {
      nextScript = MessageScript;
      nextDelay = MessageDelay;

      nextFollow = this.followEnum.main;
      nextMode = this.modeEnum.wait;
      nextLevel = level + 1;
    } else if (level == 8) {
      nextScript = MessageScript;
      nextDelay = MessageDelay;

      nextFollow = this.followEnum.main;
      nextMode = this.modeEnum.wait;
      nextLevel = level + 1;

      const id = this.userID;
      const type = this.feedbackType;
      const text = inputText;

      let result = null;
      try {
        result = await axios.post(
          ServerURL + "chat/feedback",
          {
            id,
            type,
            text
          },
          { timeout: 5000 }
        );
      } catch (err) {
        console.log(err);
        console.log("feedback axios 1");
      }

      if (result !== null) {
        const r = result.data.result;

        console.log(r);
        if (r == "OK") {
        } else {
          console.log("feedback axios 2");
        }
      } else if (result == null) {
        console.log("feedback axios 3");
      }
    }

    const serviceMessageId = uuidv1();
    const serviceObject = {
      [serviceMessageId]: {
        id: serviceMessageId,
        type: this.messageTypeEnum.service,
        isComplete: false,
        texts: nextScript[nextLevel],
        delays: nextDelay[nextLevel]
      }
    };

    this.setState(prevState => {
      const newState = {
        ...prevState,
        follow: nextFollow,
        mode: nextMode,
        level: nextLevel,
        messages: {
          ...prevState.messages,
          ...userObject,
          ...serviceObject
        }
      };

      return { ...newState };
    });
  };

  _onSentimentSelected = async (count, texts) => {
    const { follow, isFirst, mode, level, inputText } = this.state;

    let userText = "";
    for (var i = 0; i < texts.length; i++) {
      userText += texts[i];
      if (i != texts.length - 1) {
        userText += ", ";
      }
    }

    const userMessageId = uuidv1();
    const userObject = {
      [userMessageId]: {
        id: userMessageId,
        type: this.messageTypeEnum.user,
        isComplete: true,
        texts: [userText],
        delays: 0
      }
    };

    let nextFollow = null;
    let nextMode = null;
    let nextLevel = null;
    let nextScript = null;
    let nextDelay = null;

    let selected_sentiments = {};
    for (var i = 0; i < texts.length; i++) {
      selected_sentiments[texts[i]] = 1;
    }

    let clone = JSON.parse(JSON.stringify(MessageScript));

    nextDelay = MessageDelay;

    nextFollow = this.followEnum.main;
    nextMode = this.modeEnum.wait;

    if (level == 1 || level == 3) {
      nextLevel = 2;

      const s = MessageScript[nextLevel][1].split("##").join(userText);
      clone[nextLevel][1] = s;

      nextScript = clone;

      const serviceMessageId = uuidv1();
      const serviceObject = {
        [serviceMessageId]: {
          id: serviceMessageId,
          type: this.messageTypeEnum.service,
          isComplete: false,
          texts: nextScript[nextLevel],
          delays: nextDelay[nextLevel]
        }
      };

      this.setState(prevState => {
        const newState = {
          ...prevState,
          follow: nextFollow,
          mode: nextMode,
          level: nextLevel,
          messages: {
            ...prevState.messages,
            ...userObject,
            ...serviceObject
          },
          diary_my_sentiments: selected_sentiments
        };

        return { ...newState };
      });
    } else if (level == 6) {
      nextLevel = level + 1;

      const s = MessageScript[nextLevel][0]
        .split("$$")
        .join(this.state.diary_other_nickname);
      clone[nextLevel][0] = s;

      nextScript = clone;

      const serviceMessageId = uuidv1();
      const serviceObject = {
        [serviceMessageId]: {
          id: serviceMessageId,
          type: this.messageTypeEnum.service,
          isComplete: false,
          texts: nextScript[nextLevel],
          delays: nextDelay[nextLevel],
          bubbleIndex: 1,
          bubbleValue: this.state.diary_other_sentiments
        }
      };

      this.setState(prevState => {
        const newState = {
          ...prevState,
          follow: nextFollow,
          mode: nextMode,
          level: nextLevel,
          messages: {
            ...prevState.messages,
            ...userObject,
            ...serviceObject
          }
        };

        return { ...newState };
      });

      const {
        diary_other,
        diary_other_index,
        diary_other_nickname,
        diary_other_sentimentTitle,
        diary_other_sentiments
      } = this.state;

      let result = null;
      try {
        result = await axios.post(
          ServerURL + "chat/updateOtherSentiments",
          {
            diary_other_index,
            selected_sentiments
          },
          { timeout: 5000 }
        );
      } catch (err) {
        console.log(err);
        console.log("updateOtherSentiments axios 1");
      }

      if (result !== null) {
        const r = result.data.result;

        console.log(r);
        if (r == "OK") {
        } else {
          console.log("updateOtherSentiments axios 2");
        }
      } else if (result == null) {
        console.log("updateOtherSentiments axios 3");
      }
    }
  };

  _makeInput = () => {
    const { follow, mode, level, sentimentTitle } = this.state;
    items = {};

    if (follow == this.followEnum.end) {
      return <View />;
    }

    let blockScript = null;
    if (follow == this.followEnum.onboarding) {
      blockScript = OnboardingBlockScript[this.isChatFirst];
    } else if (follow == this.followEnum.main) {
      blockScript = BlockScript;
    }

    let length = blockScript[level].length;
    let height = 39;

    if (
      follow == this.followEnum.main &&
      (level == 1 || level == 3 || level == 6)
    ) {
      height = 200;
    }

    if (mode === this.modeEnum.wait) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: height
          }}
        >
          <Text
            style={{
              fontSize: 16
            }}
          ></Text>
        </View>
      );
    } else if (mode === this.modeEnum.button) {
      var scripts = blockScript[level];
      for (var i = 0; i < scripts.length; i++) {
        var text = scripts[i];
        items[i] = {
          index: i,
          text
        };
      }

      return (
        <InputBlock
          script={scripts}
          _pushedInputBlock={this._pushedInputBlock}
          _scrollToEnd={this._scrollToEnd}
        />
      );
    } else if (mode === this.modeEnum.text) {
      return (
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={{
              fontSize: 16,
              borderWidth: 0.5,
              borderColor: "#bebebe",
              borderRadius: 10,
              backgroundColor: "white",
              padding: 10,
              paddingTop: 12,
              flex: 1,
              margin: 10
            }}
            placeholder={"편하게 말씀해주세요"}
            autoFocus={true}
            autoCorrect={false}
            multiline={true}
            value={this.state.inputText}
            onChangeText={text => {
              this._scrollToEnd();
              this.setState({ inputText: text });
            }}
          />
          <TouchableOpacity
            style={{
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#15badb",
              borderRadius: 10,
              marginRight: 10,
              marginVertical: 10
            }}
            onPress={this._sendText}
          >
            <View style={{}}>
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontWeight: "400"
                }}
              >
                전송
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (mode === this.modeEnum.list) {
      let st = "default";
      if (level == 1 || level == 3) {
        st = this.state.sentimentTitle;
      } else if (level == 6) {
        st = this.state.diary_other_sentimentTitle;
      }
      if (st == "") {
        st = "default";
      }
      console.log(st + " " + level);
      return (
        <ListManager
          sentiment={st}
          _scrollToEnd={this._scrollToEnd}
          _onSentimentSelected={this._onSentimentSelected.bind(this)}
        />
      );
    }
  };
}

const styles = StyleSheet.create({});

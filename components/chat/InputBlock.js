import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";

export default class InputBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props._scrollToEnd();
    }, 200);
  }

  render() {
    const { script } = this.props;

    let items = {};
    for (var i = 0; i < script.length; i++) {
      var text = script[i];
      items[i] = {
        index: i,
        text
      };
    }

    let buttons = [];
    buttons.push(
      Object.values(items).map(item => {
        console.log(item.text);
        return (
          <TouchableOpacity
            key={item.text}
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
              borderRadius: 30,
              borderWidth: 0.6,
              marginRight: 15,
              borderColor: "black"
            }}
            onPress={() => {
              this.props._pushedInputBlock(
                item.index,
                item.text
              );
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "black",
                fontWeight: "500"
              }}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        );
      })
    );

    if (script.length == 1) {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              borderTopWidth: 0.5,
              paddingTop: 15,
              justifyContent: "center"
            }}
          >
            {buttons}
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{
              flexDirection: "row",
              borderTopWidth: 0.5,
              paddingTop: 15,
              paddingLeft: 20
            }}
          >
            {buttons}
            <View
              style={{
                width: 20
              }}
            ></View>
          </ScrollView>
        </View>
      );
    }
  }
}

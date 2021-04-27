import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import {
  orders,
  list,
} from "../../scripts/Sentiment_Script";

import _List from "./_List";

var CollectionsList = require("collections/list");

const { width, height } = Dimensions.get(
  "window"
);

export default class List extends Component {
  constructor(props) {
    super(props);

    this.listArray = [];
    this.selectedTextList = new CollectionsList();

    this.state = {
      pageIndex: 0,
      selected: {},
      selectedCount: 0,
      selectedText: [],
    };
  }

  componentDidMount() {
    if (this.listArray == 0) {
      const sentiment = this.props.sentiment;
      const order = orders[sentiment];

      const selected = new Array(order.length);

      for (var i = 0; i < order.length; i++) {
        const index = order[i];
        const texts = list[index];
        selected[i] = new Array(texts.length);

        for (var j = 0; j < texts.length; j++) {
          selected[i][j] = false;
        }
      }

      this.setState({ selected });
      this._makeListArray(selected);
    }

    setTimeout(() => {
      this.props._scrollToEnd();
    }, 200);
  }

  render() {
    const {
      pageIndex,
      selectedCount,
      selectedText,
    } = this.state;
    const { _onSentimentSelected } = this.props;
    return (
      <View
        style={{
          width: width,
          height: 200,
          borderTopWidth: 0.5,
          borderTopColor: "gray",
        }}
      >
        <View
          style={{
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>
            {selectedCount}/3
          </Text>
        </View>
        {this.listArray == 0
          ? null
          : this.listArray[pageIndex]}
        <View
          style={{
            height: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={this._onPressMore1.bind(
                this
              )}
            >
              <Text style={{ fontSize: 20 }}>
                {"←"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                _onSentimentSelected(
                  selectedCount,
                  selectedText
                );
              }}
            >
              <Text style={{ fontSize: 20 }}>
                {"선택"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={this._onPressMore2.bind(
                this
              )}
            >
              <Text style={{ fontSize: 20 }}>
                {"→"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  _onSelect(text, index, isSelected, func) {
    const {
      pageIndex,
      selected,
      selectedCount,
      selectedText,
    } = this.state;
    selected[pageIndex][index] = isSelected;

    let newCount = selectedCount;
    if (isSelected) {
      this.selectedTextList.add(text);
      newCount += 1;
    } else {
      this.selectedTextList.delete(text);
      newCount -= 1;
    }

    this.setState({
      selected,
      selectedCount: newCount,
      selectedText: this.selectedTextList.toArray(),
    });
  }

  _makeListArray(selected) {
    const sentiment = this.props.sentiment;
    const order = orders[sentiment];

    for (var i = 0; i < order.length; i++) {
      const index = order[i];
      const texts = list[index];

      this.listArray[i] = (
        <_List
          key={i}
          texts={texts}
          selected={selected[i]}
          _onSelect={this._onSelect.bind(this)}
        />
      );
    }
  }

  _onPressMore1() {
    const { pageIndex } = this.state;
    if (pageIndex == 0) {
      return;
    }
    this.setState({ pageIndex: pageIndex - 1 });
  }
  _onPressMore2() {
    const { pageIndex } = this.state;
    const sentiment = this.props.sentiment;
    const order = orders[sentiment];
    if (pageIndex == order.length - 1) {
      return;
    }

    this.setState({ pageIndex: pageIndex + 1 });
  }
}

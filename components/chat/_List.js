import React, { Component } from "react";
import { View } from "react-native";

import ListItem from "./ListItem";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this._makeItems()}
      </View>
    );
  }

  _makeItems() {
    const { texts } = this.props;
    if (texts.length === 9) {
      return (
        <View style={{ flex: 1 }}>
          {this._make3Line(0, 1, 2)}
          {this._make3Line(3, 4, 5)}
          {this._make3Line(6, 7, 8)}
        </View>
      );
    }
  }

  _make3Line(i1, i2, i3) {
    const {
      texts,
      _onSelect,
      selected
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row"
        }}
      >
        <ListItem
          text={texts[i1]}
          index={i1}
          selected={selected[i1]}
          _onSelect={_onSelect}
        />
        <ListItem
          text={texts[i2]}
          index={i2}
          selected={selected[i2]}
          _onSelect={_onSelect}
        />
        <ListItem
          text={texts[i3]}
          index={i3}
          selected={selected[i3]}
          _onSelect={_onSelect}
        />
      </View>
    );
  }
}

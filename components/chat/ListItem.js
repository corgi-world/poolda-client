import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

export default class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isSelected: false };
  }

  componentDidMount() {
    this.setState({
      isSelected: this.props.selected
    });
  }

  render() {
    const { isSelected } = this.state;
    const {
      text,
      index,
      selected,
      _onSelect
    } = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          style={{
            borderRadius: 15,
            backgroundColor: isSelected
              ? "#15badb"
              : "white"
          }}
          onPress={() => {
            this.setState({
              isSelected: !isSelected
            });
            _onSelect(
              text,
              index,
              !isSelected,
              null
            );
          }}
        >
          <Text
            style={{
              fontSize: 15,
              padding: 10,

              color: isSelected
                ? "white"
                : "black"
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

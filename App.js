import React, { Component } from "react";
import { View, AsyncStorage } from "react-native";

import Tutorial from "./components/Tutorial";
import IndexSwitchContainer from "./navigations/IndexSwitch";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDone: false,
      isLoading: false,
    };
  }

  _tutorialDone = async () => {
    await AsyncStorage.setItem("isDone", "true");

    this.setState({
      isDone: true,
    });
  };

  async componentDidMount() {
    await AsyncStorage.clear();

    var isDone = await AsyncStorage.getItem("isDone");

    isDone = isDone === null ? false : isDone;

    this.setState({
      isDone: isDone,
      isLoading: true,
    });
  }

  render() {
    const { isDone, isLoading } = this.state;

    start = () => {
      if (isLoading) {
        if (isDone) {
          return (
            <View style={{ flex: 1 }}>
              <IndexSwitchContainer />
            </View>
          );
        } else {
          return <Tutorial tutorialDone={this._tutorialDone} />;
        }
      } else {
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: "white",
            }}
          />
        );
      }
    };

    return start();
  }
}

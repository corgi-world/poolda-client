import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

import { PieChart } from "react-native-svg-charts";

export default class MyPieChart extends Component {
  constructor(props) {
    super(props);

    this.colors = [
      "#02D1D6",
      "#52D1D6",
      "#71E1DB",
      "#7CE7DD",
      "#92F3E1"
    ];

    this.data = null;

    this.state = { test: false };
  }

  _makeData() {
    if (
      this.props.sentiments == null ||
      this.props.sentiments == {}
    ) {
      this.data = null;
      return;
    }

    this.data = [];

    const s = this.props.sentiments;
    const keysSorted = Object.keys(s).sort(
      function(a, b) {
        return s[b] - s[a];
      }.bind(this)
    );

    let count = keysSorted.length;
    if (5 < count) {
      count = 5;
    }

    for (var i = 0; i < count; i++) {
      const k = keysSorted[i];
      const v = s[k];
      this.data.push({
        key: i,
        sentiment: k,
        value: v,
        svg: { fill: this.colors[i] }
      });
    }

    this.setState({ test: true });
  }

  componentDidMount() {
    this._makeData();
  }

  render() {
    if (
      this.data == null ||
      this.data.length == 0
    ) {
      return (
        <View>
          <Text>데이터가 없어요~</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <PieChart
            style={{
              height: 105,
              width: 105
            }}
            outerRadius={"100%"}
            innerRadius={10}
            data={this.data}
          />
          <View style={styles.itemView}>
            {Object.values(this.data).map(d => {
              return (
                <View
                  key={d.key}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 2
                  }}
                >
                  <View
                    style={[
                      styles.colorView,
                      {
                        backgroundColor:
                          d.svg.fill
                      }
                    ]}
                  ></View>
                  <Text style={styles.text}>
                    {d.sentiment}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14
  },
  itemView: {
    marginLeft: 10,
    justifyContent: "center"
  },
  colorView: {
    width: 20,
    height: 20,
    marginRight: 5
  }
});

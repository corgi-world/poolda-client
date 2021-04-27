import React, { Component } from "react";
import { View, Text } from "react-native";

import ReportItem from "./ReportItem";

export default class ReportManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const {
      reportData,
      selectedDate
    } = this.props;
    if (reportData == undefined) {
      return (
        <View
          style={{
            alignItems: "center",
            marginTop: 100
          }}
        >
          <Text>데이터가 없어요</Text>
        </View>
      );
    } else {
      return (
        <View>
          {Object.values(reportData).map(
            report => {
              return (
                <ReportItem
                  key={report.key}
                  reportData={report}
                  selectedDate={selectedDate}
                />
              );
            }
          )}
        </View>
      );
    }
  }
}

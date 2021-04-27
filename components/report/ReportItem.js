import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from "react-native";

import MyPieChart from "../../components/chat/MyPieChart";

const { width, height } = Dimensions.get(
  "window"
);

export default class ReportItem extends Component {
  constructor(props) {
    super(props);

    this.dow = [
      "일",
      "월",
      "화",
      "수",
      "목",
      "금",
      "토"
    ];

    this.state = {};
  }

  render() {
    const {
      reportData,
      selectedDate
    } = this.props;
    const {
      date,
      time,
      text,
      my_sentiments,
      other_sentiments
    } = reportData;
    const others = JSON.stringify(
      other_sentiments
    );

    const d = new Date(selectedDate);
    const dd = d.getDay();

    const _dow = this.dow[dd];
    const _date = d.getDate();

    const my_sentiments_array = my_sentiments.split(
      ", "
    );

    return (
      <View
        style={{
          flex: 1,
          width: width,
          height: 344,
          borderTopWidth: 0.5
        }}
      >
        <View
          style={{
            flex: 2,
            flexDirection: "row"
          }}
        >
          <View
            style={{
              flex: 0.8,
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 10
            }}
          >
            <Text style={{ fontSize: 36 }}>
              {_date}
            </Text>
            <Text style={{ fontSize: 18 }}>
              {_dow}
            </Text>
          </View>
          <View
            style={{
              flex: 5,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={styles.text}>
              <Text
                style={{
                  fontSize: 16,
                  padding: 10,
                  fontWeight: "400",
                  color: "white"
                }}
              >
                {text}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 0.8,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
          }}
        >
          {Object.values(my_sentiments_array).map(
            sentiment => {
              return (
                <Text
                  key={sentiment}
                  style={styles.sentiment}
                >
                  {sentiment}
                </Text>
              );
            }
          )}
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginBottom: 7
            }}
          >
            다른사람이 선택한 감정
          </Text>
          <MyPieChart
            sentiments={other_sentiments}
            v={"ff"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    borderRadius: 15,
    backgroundColor: "#15badb",
    maxWidth: width - 150,
    maxHeight: 130
  },
  sentiment: {
    borderWidth: 1,
    borderColor: "#979797",
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 15,
    fontSize: 16
  }
});

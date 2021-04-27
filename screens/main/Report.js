import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  AsyncStorage,
  ScrollView
} from "react-native";
import { Calendar } from "react-native-calendars";

import ServerURL from "../../utils/ServerURL";
import axios from "axios";

import ReportManager from "../../components/report/ReportManager";

export default class Report extends Component {
  constructor(props) {
    super(props);

    this.today = new Date();
    this.todayString = this._dateToString(
      this.today
    );

    this.markedDates = {};
    this.reportData = {};

    this.state = {
      data: null,
      selected: this.todayString
    };
    this.onDayPress = this.onDayPress.bind(this);
  }

  _dateToString = date => {
    const s =
      date.getFullYear() +
      "-" +
      this._pad(date.getMonth() + 1, 2) +
      "-" +
      this._pad(date.getDate(), 2);
    return s;
  };
  _timeToString = date => {
    return (
      date.getHours() +
      "시 " +
      date.getMinutes() +
      "분"
    );
  };

  _pad(n, width) {
    n = n + "";
    return n.length >= width
      ? n
      : new Array(width - n.length + 1).join(
          "0"
        ) + n;
  }

  componentDidMount = async () => {
    const userInfo = await AsyncStorage.getItem(
      "userInfo"
    );
    const userObject = JSON.parse(userInfo);
    let id = userObject.id;

    let result = null;

    try {
      result = await axios.post(
        ServerURL + "report/get",
        {
          id
        },
        { timeout: 2000 }
      );
    } catch (err) {
      console.log("report/get error 1");
    }
    if (result !== null) {
      const r = result.data.result;
      if (r == "OK") {
        const data = result.data.data;
        this.setState({ data });
      } else {
        console.log("report/get error 2");
      }
    }
  };

  _set(data) {
    let reportData = {};

    for (var i = 0; i < data.length; i++) {
      const date = data[i].date;
      const d = new Date(date);
      const dateString = this._dateToString(d);
      const timeString = this._timeToString(d);

      const text = data[i].text;
      const sentimentTitle =
        data[i].sentimentTitle;

      const my_sentiments = JSON.parse(
        data[i].my_sentiments
      );
      const other_sentiments = JSON.parse(
        data[i].other_sentiments
      );

      const msk = Object.keys(my_sentiments);
      let my_sentiments_string = "";
      for (var j = 0; j < msk.length; j++) {
        my_sentiments_string += msk[j];
        if (j != msk.length - 1) {
          my_sentiments_string += ", ";
        }
      }

      let reportObj = {
        key: i,
        date: dateString,
        time: timeString,
        text,
        sentimentTitle,
        my_sentiments: my_sentiments_string,
        other_sentiments
      };

      if (dateString in reportData) {
      } else {
        reportData[dateString] = [];
      }
      const length =
        reportData[dateString].length;
      reportData[dateString][length] = reportObj;
    }

    const m1 = {
      key: "m1",
      color: "#06a8c8",
      selectedDotColor: "white"
    };
    const m2 = {
      key: "m2",
      color: "#00a8c8",
      selectedDotColor: "white"
    };

    const dots1 = { dots: [m1] };
    const dots2 = { dots: [m1, m2] };

    const marked = {};

    const keys = Object.keys(reportData);
    for (var i = 0; i < keys.length; i++) {
      const key = keys[i];
      const length = reportData[key].length;
      if (1 < length) {
        marked[key] = dots2;
      } else {
        marked[key] = dots1;
      }
    }

    marked[this.state.selected] = {
      selected: true,
      disableTouchEvent: true,
      selectedDotColor: "white"
    };

    this.markedDates = marked;
    this.reportData = reportData;
  }

  render() {
    const { data, selected } = this.state;
    if (data != null) {
      this._set(data);
    }

    console.log(selected);

    return (
      <SafeAreaView
        style={{ flex: 1, paddingHorizontal: 15 }}
      >
        <View
          style={{
            flex: 1
          }}
        >
          <Calendar
            style={{}}
            onDayPress={this.onDayPress}
            style={styles.calendar}
            hideExtraDays
            markingType={"multi-dot"}
            markedDates={this.markedDates}
          />
        </View>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#f0f0f0"
          }}
        >
          <ReportManager
            reportData={this.reportData[selected]}
            selectedDate={selected}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingTop: 0,
    height: 200
  },
  text: {
    textAlign: "center",
    borderColor: "#bbb",
    padding: 10,
    backgroundColor: "#eee"
  },
  container: {
    flex: 1,
    backgroundColor: "gray"
  }
});

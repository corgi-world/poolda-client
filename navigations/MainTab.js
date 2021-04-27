/* 사용하지 않음 */

import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/Main/Home";
import Report from "../screens/Main/Report";
import Setting from "../screens/Main/Setting";

const HomeStack = createStackNavigator({
  home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        header: null,
        headerTitle: null,
        headerStyle: {
          borderBottomWidth: 0
        }
      };
    }
  }
});

const ReportStack = createStackNavigator({
  report: {
    screen: Report,
    navigationOptions: ({ navigation }) => {
      return {
        header: null,
        headerTitle: null,
        headerStyle: {
          borderBottomWidth: 0
        }
      };
    }
  }
});

const SettingStack = createStackNavigator({
  setting: {
    screen: Setting,
    navigationOptions: ({ navigation }) => {
      return {
        header: null,
        headerTitle: null,
        headerStyle: {
          borderBottomWidth: 0
        }
      };
    }
  }
});

export default (MainTabNavigator = createBottomTabNavigator(
  {
    home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            size={26}
            name="ios-home"
            color={focused ? "black" : "#7f8c8d"}
          />
        )
      }
    },
    report: {
      screen: ReportStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            size={26}
            name="ios-paper"
            color={focused ? "black" : "#7f8c8d"}
          />
        )
      }
    },
    setting: {
      screen: SettingStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            size={26}
            name="ios-settings"
            color={focused ? "black" : "#7f8c8d"}
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        borderTopWidth: 0,
        backgroundColor: "white"
      }
    }
  }
));

import React from "react";
import { TouchableOpacity } from "react-native";

import {
  createStackNavigator,
  HeaderBackButton
} from "react-navigation";

import {
  Ionicons,
  Foundation
} from "@expo/vector-icons";

import Home from "../screens/main/Home";
import Report from "../screens/main/Report";
import Setting from "../screens/main/Setting";

import TAS_20K from "../screens/main/TAS_20K";
import Chat from "../screens/main/Chat";

export default MainStackNavigator = createStackNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        return {
          header: null
        };
      }
    },
    report: {
      screen: Report,
      navigationOptions: ({ navigation }) => {
        return {
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "white"
          },
          headerTintColor: "black",
          headerTitle: ""
        };
      }
    },
    setting: {
      screen: Setting,
      navigationOptions: ({ navigation }) => {
        return {
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "white"
          },
          headerTintColor: "black",
          headerTitle: ""
        };
      }
    },
    tas_20k: {
      screen: TAS_20K,
      navigationOptions: ({ navigation }) => {
        return {
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "white"
          },
          headerTintColor: "black",
          headerTitle: ""
        };
      }
    },
    chat: {
      screen: Chat,
      navigationOptions: ({ navigation }) => {
        return {
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "white"
          },
          headerTintColor: "black",
          headerTitle: "",
          headerLeft: (
            <HeaderBackButton
              tintColor={"black"}
              onPress={() => {
                navigation.navigate("home");
              }}
            />
          ),
          headerRight: (
            <TouchableOpacity
              style={{ marginRight: 20 }}
              onPress={() => {
                navigation.navigate("report");
              }}
            >
              <Foundation
                size={30}
                name="graph-bar"
                color={"black"}
              />
            </TouchableOpacity>
          )
        };
      }
    }
  },
  {
    headerMode: "screen",
    headerBackTitleVisible: false
  }
);

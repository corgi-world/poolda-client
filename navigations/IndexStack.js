import { createStackNavigator } from "react-navigation";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

export default (IndexStackNavigator = createStackNavigator(
  {
    login: {
      screen: Login,
      navigationOptions: ({ navigation }) => {
        return {
          header: null
        };
      }
    }
    /*
    signup: {
      screen: Signup,
      navigationOptions: ({ navigation }) => {
        return {
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "white"
          },
          headerTintColor: "black",
          headerTitle: "회원가입"
        };
      }
    }*/
  },
  {
    headerMode: "screen",
    headerBackTitleVisible: false
  }
));

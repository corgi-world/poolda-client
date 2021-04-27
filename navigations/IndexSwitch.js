import {
  createSwitchNavigator,
  createAppContainer
} from "react-navigation";

import IndexLoading from "../screens/IndexLoading";
import Signup from "../screens/Signup";
import IndexStackNavigator from "./IndexStack";
import MainStackNavigator from "./MainStack";

const IndexSwitch = createSwitchNavigator({
  loading: {
    screen: IndexLoading
  },
  index: {
    screen: IndexStackNavigator
  },
  signup: {
    screen: Signup
  },
  main: {
    screen: MainStackNavigator
  }
});

export default (IndexSwitchContainer = createAppContainer(
  IndexSwitch
));

import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import Login from "./src/components/Authentication/Login";
import MainTabScreen from "./src/components/Main/MainTabScreen";
// import myReducer from './src/redux/reducers/index';

var e;
const Stack = createStackNavigator();
// const store = createStore(
//   myReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

export default class App extends React.Component {
  constructor(props) {
    super(props);
    e = this;
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
            name="Login"
            component={Login}
            hideNavBar={false}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="Main"
            component={MainTabScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

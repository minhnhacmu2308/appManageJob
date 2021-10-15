import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Authentication/Login";
import MainTabScreen from "../Main/MainTabScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();

class AuthenMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }
  componentDidMount = async () => {
    let token = await AsyncStorage.getItem("TOKEN");
    console.log(token);
    this.setState({ token: token });
  };
  render() {
    return (
      <NavigationContainer>
        {this.state.token === null ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              hideNavBar={false}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainTabScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={MainTabScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              hideNavBar={false}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
}

export default AuthenMain;

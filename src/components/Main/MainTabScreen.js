import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import ApproveAccount from "../adminPage/ApproveAccount";
import ApprovePostTask from "../adminPage/ApprovePostTask";
import ApproveRequestStudent from "../adminPage/ApproveRequestStudent";
import ChangePassword from "../adminPage/ChangePassword";
import CreateAccountAdmin from "../adminPage/CreateAccountAdmin";
import CreateAccountStudent from "../adminPage/CreateAccountStudent";
import UploadAvatar from "../adminPage/UploadAvatar";
import ViewInformationStudent from "../adminPage/ViewInformationStudent";
import ViewPostTask from "../adminPage/ViewPostTask";
import ViewRecruiter from "../adminPage/ViewRecruiter";
import DetailStudent from "../adminPage/DetailStudent";
import DetailCompany from "../adminPage/DetailCompany";
import ViewVote from "../adminPage/ViewVote";
import MainViewAccount from "../adminPage/MainViewAccount";
import MainViewPost from "../adminPage/MainViewPost";
import Menu from "../Menu/Menu";
import DetailPostTask from "../adminPage/DetailPostTask";

var e;
const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default class MainTabScreen extends React.Component {
  constructor(props) {
    super(props);
    e = this;
  }
  render() {
    return (
      <Tab.Navigator
        initialRouteName="Account"
        activeColor="#e60000"
        inactiveColor="black"
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Account"
          component={AccountStackScreen}
          options={{
            tabBarLabel: "Account",
            tabBarColor: "#faf9f9",
            tabBarIcon: ({ color }) => (
              <Ionicons name="people" size={26} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Post"
          component={PostStackScreen}
          options={{
            tabBarLabel: "Post",
            tabBarColor: "#faf9f9",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="post-outline"
                size={22}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreateStackScreen}
          options={{
            tabBarLabel: "Create",
            tabBarColor: "#faf9f9",
            tabBarIcon: ({ color }) => (
              <Entypo name="squared-plus" size={22} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Rate"
          component={RateStackScreen}
          options={{
            tabBarLabel: "Rate",
            tabBarColor: "#faf9f9",
            tabBarIcon: ({ color }) => {
              return (
                <FontAwesome name="star-half-empty" size={24} color={color} />
              );
            },
          }}
        />

        <Tab.Screen
          name="Setting"
          component={SettingStackScreen}
          options={{
            tabBarLabel: "Setting",
            tabBarColor: "#faf9f9",
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const AccountStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0, // Android
        },

        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="MainViewAccount"
        component={MainViewAccount}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Detail"
        component={DetailStudent}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="DetailCompany"
        component={DetailCompany}
        options={{ headerShown: false }}
      />
      {/* <HomeStack.Screen
        name="ViewInformationStudent"
        component={ViewInformationStudent}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ViewRecruiter"
        component={ViewRecruiter}
        options={{ headerShown: false }}
      /> */}
    </HomeStack.Navigator>
  );
};

const PostStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0, // Android
        },

        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="MainViewPost"
        component={MainViewPost}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ListPostActive"
        component={ViewPostTask}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ListPostUnActive"
        component={ApprovePostTask}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="DetailPostTask"
        component={DetailPostTask}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const CreateStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0, // Android
        },

        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="ApproveAccount"
        component={ApproveAccount}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="CreateAccountAdmin"
        component={CreateAccountAdmin}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="CreateAccountStudent"
        component={CreateAccountStudent}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const RateStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0, // Android
        },

        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="ViewVote"
        component={ViewVote}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const SettingStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0, // Android
        },

        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ApproveRequestStudent"
        component={ApproveRequestStudent}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="UploadAvatar"
        component={UploadAvatar}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

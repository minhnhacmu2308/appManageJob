import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import {
  Header,
  ListItem,
  Avatar,
  SearchBar,
  Icon,
} from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { list1, list } from "../../../db/db.js";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: list,
      data1: list1,
    };
  }
  right = () => {
    return (
      <View
        style={{
          height: 30,
          width: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
    );
  };
  left = () => {
    return (
      <View
        style={{
          marginLeft: 10,
          flexDirection: "row",
          width: 200,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "black",
            marginLeft: 10,
            fontSize: 25,
          }}
        >
          Setting
        </Text>
      </View>
    );
  };
  render() {
    return (
      <View>
        <Header
          backgroundColor="white"
          leftComponent={() => this.left()}
          rightComponent={() => this.right()}
        />
        <ScrollView>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
                padding: 10,
              }}
            >
              <Image
                style={{ width: 60, height: 60, borderRadius: 50 }}
                source={{
                  uri: "https://vn-school.s3-ap-northeast-1.amazonaws.com/school/649/hoc-vien-ky-thuat-mat-ma-co-so-phia-nam-0-KDcx1I.jpg",
                }}
              />
              <View style={{ flexDirection: "column", marginLeft: 10 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "black",
                    fontSize: 20,
                  }}
                >
                  Quản trị viên
                </Text>
                <Text style={{ color: "#aaaaaa", fontSize: 16 }}>Admin</Text>
              </View>
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
              Cá Nhân
            </Text>
            {this.state.data.map((item, i) => (
              <ListItem key={i} bottomDivider>
                <Icon name={item.icon} />
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))}
            <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
              Dịch Vụ
            </Text>
            {this.state.data1.map((item, i) => (
              <ListItem key={i} bottomDivider>
                <Icon name={item.icon} />
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))}
            <View style={{ width: "100%", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Login")}
                style={styles.btnLogin}
              >
                <Text style={styles.textlogin}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Menu;
const styles = StyleSheet.create({
  btnLogin: {
    width: 300,
    height: 45,
    borderRadius: 10,
    backgroundColor: "red",
    marginTop: 25,
    justifyContent: "center",
  },
  textlogin: {
    textAlign: "center",
    color: "#ffff",
    fontWeight: "bold",
  },
});

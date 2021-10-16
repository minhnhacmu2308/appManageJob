import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";

import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createAccountAdmin } from "../../services/api/api";
import { ListItem, Avatar, Overlay } from "react-native-elements";
import { getListAdmin, deleteAccount } from "../../services/api/api";
const { width, height } = Dimensions.get("window");
var e;

class CreateAccountAdmin extends Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      email: null,
      password: "",
      secret_key: null,
      notice: false,
      visible: false,
      visible1: false,
      listAdmin: [],
      _id: "",
    };
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("TOKEN");
    const list = await getListAdmin();
    this.setState({
      secret_key: token,
      listAdmin: list,
    });
  };
  onSubmit = async () => {
    const data = {
      secret_key: this.state.secret_key,
      email: this.state.email,
      password: this.state.password,
      role: "admin",
    };
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email == null) {
      alert("Email not null");
    } else if (this.state.password == "") {
      alert("Password not null");
    } else if (reg.test(this.state.email) !== true) {
      alert("The email must be a valid email address.");
    } else if (this.state.password.length < 8) {
      alert("The password can not be less than 8.");
    } else {
      const response = await createAccountAdmin(data);
      if (response.success == true) {
        alert("Create Account Admin Success!!!");
        this.setState({
          visible: false,
          email: null,
          password: "",
          listAdmin: [...this.state.listAdmin, response.data],
        });
      } else {
        alert(response.messages);
      }
    }
  };
  deleteAccountStudent = async () => {
    console.log(this.state._id);
    let data = {
      secret_key: this.state.secret_key,
      idUser: this.state._id,
    };
    const result = await deleteAccount(data);
    if (result.status == true) {
      alert("Delete success!");
      this.setState({
        listAdmin: this.state.listAdmin.filter((d) => d._id !== this.state._id),
      });
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal transparent={true} visible={this.state.visible}>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              backgroundColor: "#000000aa",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#ffff",
                width: "90%",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <View style={{ marginLeft: 8 }}>
                <Text style={{ fontWeight: "bold" }}>Your Email Address</Text>
              </View>
              <Input
                placeholder="email@address.com"
                leftIcon={
                  <Icon name="envelope-square" size={24} color="black" />
                }
                onChangeText={(value) => this.setState({ email: value })}
                value={this.state.email}
              />
              <View style={{ marginLeft: 8 }}>
                <Text style={{ fontWeight: "bold" }}>Password</Text>
              </View>
              <Input
                placeholder="Password"
                leftIcon={<Icon name="lock" size={24} color="black" />}
                onChangeText={(value) => this.setState({ password: value })}
                secureTextEntry={true}
                value={this.state.password}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "red",
                    width: "48%",
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                  onPress={() => this.setState({ visible: false })}
                >
                  <Text
                    style={{ fontSize: 16, color: "red", fontWeight: "bold" }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    width: "48%",
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                  onPress={() => this.onSubmit()}
                >
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                  >
                    Create
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "red",
              height: 40,
              width: "90%",
              borderRadius: 5,
            }}
            onPress={() => this.setState({ visible: true })}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Create Admin
            </Text>
          </TouchableOpacity>
        </View>
        <Modal transparent={true} visible={this.state.visible1}>
          <View
            style={{
              flexDirection: "column",
              flex: 1,
              backgroundColor: "#000000aa",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={styles.enterInformation}>
              <View style={{ marginTop: 10, marginLeft: 5, marginBottom: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Do you want delete?
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#ffff",
                    borderWidth: 1,
                    borderColor: "red",
                    width: 100,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    marginRight: 5,
                  }}
                  onPress={() => this.setState({ visible1: false })}
                >
                  <Text
                    style={{ fontSize: 16, color: "red", fontWeight: "bold" }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    width: 100,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    this.deleteAccountStudent();
                    this.setState({ visible1: false });
                  }}
                >
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.listAdmin.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar
                source={{
                  uri:
                    l.gender === "male"
                      ? "https://previews.123rf.com/images/vectorkif/vectorkif1609/vectorkif160900070/65327593-student-girl-flat-style-beautiful-vector-icon-avatar.jpg"
                      : "https://c.neh.tw/thumb/f/720/m2H7H7K9m2Z5G6i8.jpg",
                }}
              />
              <ListItem.Content>
                <ListItem.Title>{l.email}</ListItem.Title>
                <ListItem.Subtitle>{l.fullName}</ListItem.Subtitle>
              </ListItem.Content>
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  height: 25,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 50,
                }}
                onPress={() => this.setState({ visible1: true, _id: l._id })}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default CreateAccountAdmin;
const styles = StyleSheet.create({
  enterInformation: {
    backgroundColor: "#FFFF",
    width: "80%",
    height: height * 0.2,
    margin: "10%",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

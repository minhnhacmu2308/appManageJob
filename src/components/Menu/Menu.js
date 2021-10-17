import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  Modal,
} from "react-native";
import {
  Header,
  ListItem,
  Avatar,
  SearchBar,
  Input,
  Icon,
} from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { list1, list } from "../../../db/db.js";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  getInformationStudent,
  UploadAvatar,
  changePassword,
  getNotice,
} from "../../services/api/api";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: list,
      data1: list1,
      secret_key: null,
      image: null,
      secret_key: null,
      localUri: null,
      visible: false,
      passwordOld: "",
      passwordNew: "",
      passwordRe: "",
      listNotice: [],
    };
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("TOKEN");
    const decode = jwt_decode(token);
    this.setState({ secret_key: token });
    const response = await getInformationStudent(decode._id);
    this.setState({ image: response.image });
  };

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
  onChangePass = async () => {
    if (this.state.passwordRe !== this.state.passwordNew) {
      alert("Two passwords do not match");
    } else if (this.state.passwordNew == "" || this.state.passwordRe == "") {
      alert("Need to fill in all the information");
    } else {
      const data = {
        secret_key: this.state.secret_key,
        passwordNew: this.state.passwordNew,
      };
      const result = await changePassword(data);
      if (result.status == true) {
        alert("ChangePasswod success!!");
        this.setState({
          passwordNew: "",
          passwordRe: "",
          visible: false,
        });
      } else {
        alert("ChangePasswod failed!!");
      }
    }
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
  openImagePickerAsync = async () => {
    let permissionResult = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (permissionResult === "granted") {
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      type: [ImagePicker.MediaTypeOptions.file],
    });
    //console.log(pickerResult);
    if (pickerResult.cancelled === true) {
      return;
    } else {
      this.setState({ localUri: pickerResult.uri });
      if (this.state.localUri != null) {
        let fileToUpload = {
          uri: this.state.localUri,
          name: "image.jpg",
          mimetype: "image/jpg",
        };
        const data = new FormData();
        console.log(data);
        data.append("secret_key", this.state.secret_key);
        data.append("image", fileToUpload);
        console.log(data);
        const response = await UploadAvatar(data);
        this.setState({ image: response });
      }
    }
  };
  render() {
    return (
      <View>
        <Header
          backgroundColor="white"
          leftComponent={() => this.left()}
          rightComponent={() => this.right()}
        />
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
                <Text style={{ fontWeight: "bold" }}>Password new</Text>
              </View>
              <Input
                placeholder="Password New"
                leftIcon={<Icon name="lock" size={24} color="black" />}
                onChangeText={(value) => this.setState({ passwordNew: value })}
                secureTextEntry={true}
                value={this.state.passwordNew}
              />
              <View style={{ marginLeft: 8 }}>
                <Text style={{ fontWeight: "bold" }}>Re Password new</Text>
              </View>
              <Input
                placeholder="Re Password New"
                leftIcon={<Icon name="lock" size={24} color="black" />}
                onChangeText={(value) => this.setState({ passwordRe: value })}
                secureTextEntry={true}
                value={this.state.passwordRe}
              />
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
                  onPress={() => this.onChangePass()}
                >
                  <Text
                    style={{ fontSize: 16, color: "white", fontWeight: "bold" }}
                  >
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
                padding: 10,
              }}
              onPress={() => this.openImagePickerAsync()}
            >
              <Image
                style={{ width: 60, height: 60, borderRadius: 50 }}
                source={{
                  uri:
                    this.state.image == null
                      ? "https://vn-school.s3-ap-northeast-1.amazonaws.com/school/649/hoc-vien-ky-thuat-mat-ma-co-so-phia-nam-0-KDcx1I.jpg"
                      : `${this.state.image}`,
                }}
              />
              <View
                style={{ position: "absolute", left: 50, top: 50, zIndex: 1 }}
              >
                <Entypo name="camera" size={20} color="black" />
              </View>
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
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
              Cá Nhân
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ListNotice")}
            >
              <ListItem bottomDivider>
                <Icon name="notifications" />
                <ListItem.Content>
                  <ListItem.Title>Thông báo</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
            {this.state.data.map((item, i) => (
              <ListItem key={i} bottomDivider>
                <Icon name={item.icon} />
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))}

            <TouchableOpacity onPress={() => this.setState({ visible: true })}>
              <ListItem bottomDivider>
                <Icon name="sync-alt" />
                <ListItem.Content>
                  <ListItem.Title>ChangePassword</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>

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
                onPress={() => {
                  AsyncStorage.removeItem("TOKEN");
                  this.props.navigation.navigate("Login");
                }}
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

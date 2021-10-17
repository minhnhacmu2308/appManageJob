import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Header, Image } from "react-native-elements";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  getInformationStudent,
  UploadAvatar,
  changePassword,
  getNotice,
} from "../../services/api/api";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ListItem, Avatar, Overlay } from "react-native-elements";

class ListNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listNotice: [],
    };
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("TOKEN");
    const decode = jwt_decode(token);
    this.setState({ secret_key: token });
    const response = await getInformationStudent(decode._id);
    this.setState({ listNotice: response.notice });
    console.log(response.notice);
  };
  left = () => {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.goBack()}
        style={{ marginLeft: 15, width: 50 }}
      >
        <Ionicons
          style={{ marginTop: 1 }}
          name="ios-arrow-back"
          size={24}
          color="red"
        />
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View>
        <Header
          centerComponent={{
            text: "CV Student",
            style: { color: "red", fontWeight: "bold" },
          }}
          leftComponent={() => this.left()}
          backgroundColor="#ffff"
        />
        {this.state.listNotice.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar
              source={{
                uri: "https://previews.123rf.com/images/vectorkif/vectorkif1609/vectorkif160900070/65327593-student-girl-flat-style-beautiful-vector-icon-avatar.jpg",
              }}
            />
            <ListItem.Content>
              <ListItem.Title>{item.idCompany}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))}
      </View>
    );
  }
}

export default ListNotice;

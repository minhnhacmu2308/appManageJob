import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  RefreshControl,
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
      refreshing: false,
    };
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("TOKEN");
    const decode = jwt_decode(token);
    this.setState({ secret_key: token });
    const response = await getInformationStudent(decode._id);
    this.setState({ listNotice: response.notice });
  };
  _onRefresh = async () => {
    const token = await AsyncStorage.getItem("TOKEN");
    const decode = jwt_decode(token);
    const response = await getInformationStudent(decode._id);
    this.setState({ listNotice: response.notice });
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
            text: "Thông báo",
            style: { color: "red", fontWeight: "bold" },
          }}
          leftComponent={() => this.left()}
          backgroundColor="#ffff"
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this._onRefresh()}
            />
          }
        >
          {this.state.listNotice.reverse().map((item, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar
                source={{
                  uri: "https://png.pngtree.com/png-vector/20190321/ourlarge/pngtree-vector-announcement-icon-png-image_856893.jpg",
                }}
              />
              <ListItem.Content>
                <ListItem.Title>Thông báo</ListItem.Title>
                <ListItem.Subtitle>{item.mes}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default ListNotice;

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { getListPostUnActive } from "../../services/api/api";
import { ListItem, Avatar, Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { comfirmPostForNtd } from "../../services/api/api";

const { width, height } = Dimensions.get("window");
var e;

class UnActive extends Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      listPostUnActive: [],
      token: null,
    };
  }

  componentDidMount = async () => {
    const list = await getListPostUnActive();
    const token = await AsyncStorage.getItem("TOKEN");
    this.setState({
      listPostUnActive: list,
      token: token,
    });
  };
  confirmPost = async (id) => {
    console.log(id);
    let data = {
      secret_key: this.state.token,
      arrIdTask: [id],
    };
    const result = await comfirmPostForNtd(data);
    if (result.status == true) {
      alert("Confirm success!");
      const list = await getListPostUnActive();
      this.setState({
        listPostUnActive: list,
      });
    }
  };
  confirmAll = async () => {
    let arr = [];
    for (let i = 0; i < this.state.listPostUnActive.length; i++) {
      arr.push(this.state.listPostUnActive[i]._id);
    }
    console.log(arr);
    let data = {
      secret_key: this.state.token,
      arrIdTask: arr,
    };
    const result = await comfirmPostForNtd(data);
    if (result.status == true) {
      alert("Confirm all success!");
      const list = await getListPostUnActive();
      this.setState({
        listPostUnActive: list,
      });
    }
  };
  render() {
    return (
      <View>
        <View style={{ alignItems: "center" }}>
          {this.state.listPostUnActive.length == 0 ? null : (
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "red",
                marginTop: 10,
                height: 40,
                width: "70%",
                borderRadius: 5,
              }}
              onPress={() => this.confirmAll()}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Confirm All
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.listPostUnActive.length == 0 ? (
            <View
              style={{
                height: 100,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ color: "red", fontWeight: "bold", fontSize: 16 }}>
                List is blank
              </Text>
            </View>
          ) : (
            this.state.listPostUnActive.map((l, i) => (
              <ListItem
                key={i}
                bottomDivider
                onPress={() => this.props.onStack(l._id)}
              >
                <Avatar
                  source={{
                    uri: "https://img.lovepik.com/photo/50081/6482.jpg_wh860.jpg",
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title>{l.name_job}</ListItem.Title>
                  <ListItem.Subtitle>{l.name_company}</ListItem.Subtitle>
                </ListItem.Content>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#33CC00",
                    height: 25,
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                  }}
                  onPress={() => this.confirmPost(l._id)}
                >
                  <Text
                    style={{ color: "white", fontSize: 10, fontWeight: "bold" }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
                <ListItem.Chevron />
              </ListItem>
            ))
          )}
        </ScrollView>
      </View>
    );
  }
}

export default UnActive;

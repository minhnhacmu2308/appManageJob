import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Button,
} from "react-native";

import { getListStudent, deleteAccount } from "../../services/api/api";
import { ListItem, Avatar, Overlay } from "react-native-elements";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
var e;

class ViewInformationStudent extends Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      listStudent: [],
      token: null,
      visible: false,
      _id: null,
    };
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("TOKEN");
    const list = await getListStudent();
    this.setState({
      listStudent: list,
      token: token,
    });
  };
  deleteAccountStudent = async () => {
    console.log(this.state._id);
    let data = {
      secret_key: this.state.token,
      idUser: this.state._id,
    };
    const result = await deleteAccount(data);
    if (result.status == true) {
      alert("Delete success!");
      const list = await getListStudent();
      this.setState({
        listStudent: list,
      });
    }
    console.log(result);
  };
  render() {
    return (
      <View>
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
                    width: "48%",
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    marginRight: 5,
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
                  onPress={() => {
                    this.deleteAccountStudent();
                    this.setState({ visible: false });
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
          {this.state.listStudent.map((l, i) => (
            <ListItem
              key={i}
              bottomDivider
              onPress={() => this.props.onStack(l._id)}
            >
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
                onPress={() => this.setState({ visible: true, _id: l._id })}
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

class RenderItem extends React.Component {
  render() {
    return (
      <View style={styles.image_container}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
              height: 55,
              width: 55,
              backgroundColor: "white",
              shadowOffset: { width: 0, height: 3 },
              shadowColor: "#e60000",
              shadowOpacity: 0.5,
              elevation: 10,
              borderColor: "#e60000",
              borderRadius: 50,
            }}
          >
            <Image
              source={{
                uri:
                  this.props.item.image == null
                    ? "https://vn-school.s3-ap-northeast-1.amazonaws.com/school/649/hoc-vien-ky-thuat-mat-ma-co-so-phia-nam-0-KDcx1I.jpg"
                    : "http:192.168.1.5:3000/image/" + this.props.item.image,
              }}
              style={styles.image}
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: "column",
              marginLeft: 10,
              alignItems: "flex-start",
              width: width - 180,
              marginTop: 10,
            }}
          >
            <Text style={[styles.name, { color: "black", fontWeight: "bold" }]}>
              {this.props.item.email}
            </Text>
            <View>
              <Text style={{ fontSize: 15 }}>
                {this.props.item.first_name} {this.props.item.last_name}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image_container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: width - 60,
    backgroundColor: "rgba(200,200,200,0.3)",
    margin: 10,
    borderWidth: 1,
    borderColor: "#e60000",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
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

export default ViewInformationStudent;

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
import { getListNtdActive } from "../../services/api/api";
import { ListItem, Avatar } from "react-native-elements";
import { comfirmAccountNtd, deleteAccount } from "../../services/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");
var e;

class ViewRecruiter extends Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      listNtd: [],
      token: null,
      visible: false,
      _id: null,
    };
  }
  componentDidMount = async () => {
    const list = await getListNtdActive();
    const token = await AsyncStorage.getItem("TOKEN");
    this.setState({
      listNtd: list,
      token: token,
    });
  };
  confirmAccountNtd = async (id) => {
    console.log(id);
    let data = {
      secret_key: this.state.token,
      arrIdCompany: [id],
    };
    const result = await comfirmAccountNtd(data);
    if (result.status == true) {
      alert("Confirm success!");
      const list = await getListNtdActive();
      this.setState({
        listNtd: list,
      });
    }
  };
  confirmAllAccount = async () => {
    let arr = [];
    for (let i = 0; i < this.state.listNtd.length; i++) {
      arr.push(this.state.listNtd[i]._id);
    }
    let data = {
      secret_key: this.state.token,
      arrIdCompany: arr,
    };
    const result = await comfirmAccountNtd(data);
    if (result.status == true) {
      alert("Confirm all success!");
      const list = await getListNtdActive();
      this.setState({
        listNtd: list,
      });
    }
  };

  deleteAccountNtd = async () => {
    console.log(this.state._id);
    let data = {
      secret_key: this.state.token,
      idUser: this.state._id,
    };
    const result = await deleteAccount(data);
    if (result.status == true) {
      alert("Delete success!");
      const list = await getListNtdActive();
      this.setState({
        listNtd: list,
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
                    width: 100,
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
                    width: 100,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    this.deleteAccountNtd();
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
        <View style={{ alignItems: "center" }}>
          {this.state.listNtd.length == 0 ? null : (
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
              onPress={() => this.confirmAllAccount()}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Confirm All
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ marginBottom: 50 }}>
            {this.state.listNtd.map((l, i) => (
              <ListItem
                key={i}
                bottomDivider
                onPress={() => this.props.onStack(l._id)}
              >
                <Avatar
                  source={{
                    uri: "https://png.pngtree.com/template/20190611/ourlarge/pngtree-company-name-logo-design-for-businessmanavataremployeesa-image_212383.jpg",
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title>{l.name_company}</ListItem.Title>
                  <ListItem.Subtitle>{l.phonenumber}</ListItem.Subtitle>
                  <View>
                    <Text style={styles.ratingText}>{l.address}</Text>
                  </View>
                </ListItem.Content>
                {l.status == 0 ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#33CC00",
                      height: 25,
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 50,
                    }}
                    onPress={() => this.confirmAccountNtd(l._id)}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      Confirm
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: "red",
                      height: 25,
                      borderRadius: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 50,
                    }}
                    onPress={() => this.setState({ _id: l._id, visible: true })}
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
                )}

                <ListItem.Chevron />
              </ListItem>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ViewRecruiter;
const styles = StyleSheet.create({
  ratingText: {
    color: "grey",
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

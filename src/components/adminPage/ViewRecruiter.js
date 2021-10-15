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
} from "react-native";
import { getListNtdActive } from "../../services/api/api";
import { ListItem, Avatar } from "react-native-elements";
import { comfirmAccountNtd } from "../../services/api/api";
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
  render() {
    return (
      <View>
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
                      backgroundColor: "red",
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
                ) : null}

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
});

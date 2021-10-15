import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Header, Image } from "react-native-elements";
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { getInformationNtd } from "../../services/api/api";

class DetailCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    };
  }

  componentDidMount = async () => {
    const id = this.props.route.params.id;
    const information = await getInformationNtd(id);
    this.setState({
      info: information,
    });
    console.log(this.state.info.list_rate.length);
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
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffff",
        }}
      >
        <Header
          centerComponent={{
            text: "Thông tin công ty",
            style: { color: "red", fontWeight: "bold" },
          }}
          leftComponent={() => this.left()}
          backgroundColor="#ffff"
        />
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: "#ffff",
              height: "100%",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffff",
              }}
            >
              <Image
                source={{
                  uri: "https://png.pngtree.com/template/20190611/ourlarge/pngtree-company-name-logo-design-for-businessmanavataremployeesa-image_212383.jpg",
                }}
                style={{ width: 350, height: 200, marginTop: 20 }}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 10 }}>
                {this.state.info.name_company}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                {" "}
                {this.state.info.phonenumber}
              </Text>
            </View>
            <View style={{ padding: 10, marginTop: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                - Mô tả :
              </Text>
              <Text
                style={{
                  lineHeight: 25,
                  marginLeft: 10,
                  marginTop: 10,
                  fontSize: 18,
                }}
              >
                + {this.state.info.company_summary}
              </Text>

              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                - Tên HR:
              </Text>
              <Text
                style={{
                  lineHeight: 25,
                  marginLeft: 10,
                  marginTop: 10,
                  fontSize: 18,
                }}
              >
                + {this.state.info.name_Hr}
              </Text>

              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                - Địa chỉ:
              </Text>
              <Text
                style={{
                  lineHeight: 25,
                  marginLeft: 10,
                  marginTop: 10,
                  fontSize: 18,
                }}
              >
                + {this.state.info.address}
              </Text>
            </View>

            <View style={{ flexDirection: "row", padding: 10, marginTop: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Đánh giá:
              </Text>
              <Text style={{ color: "red" }}>*</Text>
            </View>
            {/* {this.state.info.list_rate.map((a, index) => (
              <Text
                key={index}
                style={{
                  lineHeight: 25,
                  marginLeft: 10,
                  marginTop: 10,
                  fontSize: 18,
                }}
              >
                + {a}
              </Text>
            ))} */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default DetailCompany;
const styles = StyleSheet.create({
  btnLogin: {
    width: 300,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#3366FF",
    marginTop: 25,
    justifyContent: "center",
  },
  textlogin: {
    textAlign: "center",
    color: "#ffff",
    fontWeight: "bold",
  },
  fonttext: {
    left: 30,
    fontWeight: "bold",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 17,
  },
  fonttextinfor: {
    left: 50,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 17,
  },
});

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
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { getInformationStudent } from "../../services/api/api";

class DetailStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    };
  }

  componentDidMount = async () => {
    const id = this.props.route.params.id;
    const information = await getInformationStudent(id);
    this.setState({
      info: information,
    });
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
      <View style={{ backgroundColor: "white" }}>
        <Header
          centerComponent={{
            text: "CV Student",
            style: { color: "red", fontWeight: "bold" },
          }}
          leftComponent={() => this.left()}
          backgroundColor="#ffff"
        />
        <ScrollView>
          <View>
            <View
              style={{
                height: 200,
                width: "100%",
                backgroundColor: "red",
                borderBottomRightRadius: 60,
                borderBottomLeftRadius: 60,
              }}
            ></View>
            <View style={{ paddingLeft: 15, paddingRight: 15, marginTop: -80 }}>
              <View
                style={{
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.2,
                  marginHorizontal: 16,
                  marginVertical: 10,
                  elevation: 3,
                  borderTopColor: "#71B7B7",
                  backgroundColor: "#EEEEEE",
                  height: 600,
                  borderTopRightRadius: 50,
                  borderTopLeftRadius: 50,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 100,
                    marginTop: -60,
                  }}
                >
                  <Image
                    source={{
                      uri:
                        this.state.info.gender === "male"
                          ? "https://previews.123rf.com/images/vectorkif/vectorkif1609/vectorkif160900070/65327593-student-girl-flat-style-beautiful-vector-icon-avatar.jpg"
                          : "https://c.neh.tw/thumb/f/720/m2H7H7K9m2Z5G6i8.jpg",
                    }}
                    style={{ width: 120, height: 120, borderRadius: 100 }}
                    PlaceholderContent={<ActivityIndicator />}
                  />
                </View>
                <ScrollView>
                  <View style={{ width: "100%", marginBottom: 10 }}>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Full name:
                      </Text>
                      <Text style={{ width: "50%", fontSize: 16 }}>
                        {" "}
                        {this.state.info.fullName}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Ngày sinh:
                      </Text>
                      <Text style={{ width: "50%", fontSize: 16 }}>
                        {" "}
                        {this.state.info.birthday}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Giới tính:
                      </Text>
                      <Text style={{ width: "50%", fontSize: 16 }}>
                        {" "}
                        {this.state.info.gender}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Major:
                      </Text>
                      <Text style={{ width: "50%", fontSize: 16 }}>
                        {" "}
                        {this.state.info.major}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Skills:
                      </Text>
                      <Text style={{ width: "50%", fontSize: 16 }}>
                        {" "}
                        {this.state.info.skills}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Certification:
                      </Text>
                      <Text style={{ width: "50%", fontSize: 16 }}>
                        {" "}
                        {this.state.info.certification}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Title job:
                      </Text>
                      <Text style={{ width: "50%", fontSize: 16 }}>
                        {" "}
                        {this.state.info.title_job}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Phone number:
                      </Text>
                      <Text style={{ width: "50%", fontSize: 16 }}>
                        {" "}
                        {this.state.info.phonenumber}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Quê quán:
                      </Text>
                      <Text style={{ width: "50%", fontSize: 16 }}>
                        {" "}
                        {this.state.info.address}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Type of student:
                      </Text>
                      <Text style={{ width: "50%", fontSize: 16 }}>
                        {" "}
                        {this.state.info.type_of_student}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Objective:
                      </Text>
                      <Text style={{ width: "50%", fontSize: 16 }}>
                        {" "}
                        {this.state.info.objective}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        padding: 15,
                      }}
                    >
                      <Text
                        style={{
                          width: "50%",
                          fontWeight: "bold",
                          fontSize: 16,
                        }}
                      >
                        Tên trường:
                      </Text>
                      <Text style={{ width: "50%", fontSize: 16 }}>
                        {" "}
                        {this.state.info.name_of_school}
                      </Text>
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default DetailStudent;
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
    flex: 1,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 17,
  },
});

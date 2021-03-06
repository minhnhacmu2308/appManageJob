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
import { getInformationStudent } from "../../services/api/api";
import { Entypo } from "@expo/vector-icons";

class DetailStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      visible: false,
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
                alignItems: "flex-end",
              }}
            >
              {/* {this.state.visible == true ? (
                <TouchableOpacity
                  style={{ marginRight: 20 }}
                  onPress={() => this.setState({ visible: false })}
                >
                  <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color="#ffff"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{ marginRight: 20 }}
                  onPress={() => this.setState({ visible: true })}
                >
                  <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color="#ffff"
                  />
                </TouchableOpacity>
              )} */}

              <Modal transparent={true} visible={this.state.visible}>
                <View
                  style={{ alignItems: "flex-end", marginTop: 52, padding: 20 }}
                >
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      backgroundColor: "#ffff",
                      borderRadius: 5,
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{ width: 20, height: 20, backgroundColor: "red" }}
                    >
                      <Text style={{ color: "#ffff" }}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
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
                          ? "https://c.neh.tw/thumb/f/720/m2H7H7K9m2Z5G6i8.jpg"
                          : "https://previews.123rf.com/images/vectorkif/vectorkif1609/vectorkif160900070/65327593-student-girl-flat-style-beautiful-vector-icon-avatar.jpg",
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
                        Ng??y sinh:
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
                        Gi???i t??nh:
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
                        (+ 84) {this.state.info.phonenumber}
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
                        Qu?? qu??n:
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
                        T??n tr?????ng:
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

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
      <View>
        <Header
          centerComponent={{
            text: "CV Student",
            style: { color: "red", fontWeight: "bold" },
          }}
          leftComponent={() => this.left()}
          backgroundColor="#ffff"
        />
        <ScrollView>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingRight: 10,
              flex: 1,
              marginBottom: 80,
              backgroundColor: "#ffff",
            }}
          >
            <View style={{ marginTop: 10 }}>
              <Image
                source={{
                  uri:
                    this.state.info.gender === "male"
                      ? "https://previews.123rf.com/images/vectorkif/vectorkif1609/vectorkif160900070/65327593-student-girl-flat-style-beautiful-vector-icon-avatar.jpg"
                      : "https://c.neh.tw/thumb/f/720/m2H7H7K9m2Z5G6i8.jpg",
                }}
                style={{ width: 200, height: 200, borderRadius: 100 }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 10 }}>
              {this.state.info.fullName}
            </Text>
            <Text style={{ fontSize: 20 }}>
              {" "}
              {this.state.info.name_of_school}
            </Text>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Ngày sinh :</Text>
              <Text style={styles.fonttextinfor}>
                {" "}
                {this.state.info.birthday}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Giới tính :</Text>
              <Text style={styles.fonttextinfor}>
                {" "}
                {this.state.info.gender}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Major :</Text>
              <Text style={styles.fonttextinfor}> {this.state.info.major}</Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Skills:</Text>
              <Text style={styles.fonttextinfor}>
                {" "}
                {this.state.info.skills}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Certification:</Text>
              <Text style={styles.fonttextinfor}>
                {this.state.info.certification}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Title job:</Text>
              <Text style={styles.fonttextinfor}>
                {this.state.info.phonenumber}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Số điện thoại:</Text>
              <Text style={styles.fonttextinfor}>
                {" "}
                {this.state.info.birthday}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Quê quán:</Text>
              <Text style={styles.fonttextinfor}>
                {" "}
                {this.state.info.address}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Type of student:</Text>
              <Text style={styles.fonttextinfor}>
                {" "}
                {this.state.info.type_of_student}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Objective:</Text>
              <Text style={styles.fonttextinfor}>
                {" "}
                {this.state.info.objective}
              </Text>
            </View>
            {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
              style={styles.btnLogin}
            >
              <Text style={styles.textlogin}>LOGOUT</Text>
            </TouchableOpacity> */}
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
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 17,
  },
});

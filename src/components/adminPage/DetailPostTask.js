import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Header, Image } from "react-native-elements";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { getListPostTaskDetail } from "../../services/api/api";

const { width, height } = Dimensions.get("window");

class DetailPostTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
    };
  }

  componentDidMount = async () => {
    const id = this.props.route.params.id;
    const information = await getListPostTaskDetail(id);
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
      <View style={{backgroundColor:'white'}}>
        <Header
          centerComponent={{
            text: "Detail Post Task",
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
              marginBottom: 130,
              backgroundColor: "white",
            }}
          >
            <View style={{ marginTop: 10 }}>
              <Image
                source={{
                  uri:"https://previews.123rf.com/images/vectorkif/vectorkif1609/vectorkif160900070/65327593-student-girl-flat-style-beautiful-vector-icon-avatar.jpg"
                }}
                style={{ width: 200, height: 200, borderRadius: 100 }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 10 }}>
              {this.state.info.name_company}
            </Text>
            <Text style={{ fontSize: 20 }}>
              {" "}
              {this.state.info.name_job}
            </Text>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Description:</Text>
              <Text style={styles.fonttextinfor}>
                {this.state.info.task_description}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Benefits:</Text>
              <Text style={styles.fonttextinfor}>
                {" "}
                {this.state.info.benefits_enjoyed}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Location:</Text>
              <Text style={styles.fonttextinfor}>
                {" "}
                {this.state.info.location}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", marginTop: 20, marginBottom: 20 }}
            >
              <Text style={styles.fonttext}>Ngày hết hạn:</Text>
              <Text style={styles.fonttextinfor}>
                {" "}
                {this.state.info.expires}
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

export default DetailPostTask;
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
    left: 10,
    fontWeight: "bold",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 17,
  },
  fonttextinfor: {
    left: 10,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 17,
  },
});

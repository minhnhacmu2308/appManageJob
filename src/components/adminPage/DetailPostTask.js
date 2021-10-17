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
import { Header, Image, CheckBox } from "react-native-elements";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getListPostTaskDetail,
  approveForStudent,
} from "../../services/api/api";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

class DetailPostTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      arrApply: [],
      arrEx: [],
      token: null,
      idTask: "",
      checked: true,
      checked1: false,
    };
  }

  componentDidMount = async () => {
    const id = this.props.route.params.id;
    const information = await getListPostTaskDetail(id);
    console.log(id);
    const token = await AsyncStorage.getItem("TOKEN");
    const arr = [];
    const arr1 = [];
    for (let i = 0; i < information.list_student_apply.length; i++) {
      arr.push(information.list_student_apply[i]);
    }
    for (let i = 0; i < information.list_student_apply.length; i++) {
      arr1.push(information.list_student_apply[i]);
    }
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i].type_of_student > arr[j].type_of_student) {
          let tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
        }
      }
    }
    for (let i = 0; i < arr1.length - 1; i++) {
      for (let j = i + 1; j < arr1.length; j++) {
        if (arr1[i].experience < arr1[j].experience) {
          let tmp = arr1[i];
          arr1[i] = arr1[j];
          arr1[j] = tmp;
        }
      }
    }
    // else if (arr[i].type_of_student == arr[j].type_of_student) {
    //       if (arr[i].experience < arr[j].experience) {
    //         let tmp = arr[i].experience;
    //         arr[i].experience = arr[j].experience;
    //         arr[j].experience = tmp;
    //       }
    //     }
    console.log(arr);
    // arr.sort((a, b) => a.type_of_student < b.type_of_student ? 1:-1);
    // arr.sort((a, b) => a.experience < b.experience ? 1:-1);
    this.setState({
      info: information,
      arrApply: arr,
      arrEx: arr1,
      token: token,
      idTask: this.props.route.params.id,
    });
  };
  onApprove = async (id, idApply) => {
    const data = {
      secret_key: this.state.token,
      idTask: this.props.route.params.id,
      idUser: id,
    };

    let result = await approveForStudent(data);
    if (result.status == true) {
      alert("Approve for student success");
      this.setState({
        arrApply: this.state.arrApply.filter((d) => d._id !== idApply),
        arrEx: this.state.arrEx.filter((d) => d._id !== idApply),
      });
    }
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
  onChange = () => {
    if (this.state.checked1 == true) {
      this.setState({
        checked: true,
        checked1: false,
      });
    }
  };
  onChange1 = () => {
    if (this.state.checked == true) {
      this.setState({
        checked1: true,
        checked: false,
      });
    }
  };
  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
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
              paddingRight: 10,
              flex: 1,
              backgroundColor: "white",
            }}
          >
            <View
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://kos.edu.vn/wp-content/uploads/2020/03/jobs-hiring-help-wanter.jpg",
                }}
                style={{ width: 200, height: 200, borderRadius: 100 }}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 10 }}>
                {this.state.info.name_company}
              </Text>
              <Text style={{ fontSize: 20 }}> {this.state.info.name_job}</Text>
            </View>
            <View style={{ padding: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Text style={styles.fonttext}>Description:</Text>
                <Text style={styles.fonttextinfor}>
                  {this.state.info.task_description}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Text style={styles.fonttext}>Benefits:</Text>
                <Text style={styles.fonttextinfor}>
                  {" "}
                  {this.state.info.benefits_enjoyed}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Text style={styles.fonttext}>Location:</Text>
                <Text style={styles.fonttextinfor}>
                  {" "}
                  {this.state.info.location}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Text style={styles.fonttext}>Ngày hết hạn:</Text>
                <Text style={styles.fonttextinfor}>
                  {" "}
                  {this.state.info.expires}
                </Text>
              </View>
            </View>
          </View>
          <Text style={styles.fonttext}>Danh sách sinh viên ứng tuyển:</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <CheckBox
              title="Type of school"
              checkedColor="#33CC00"
              onPress={() => this.onChange()}
              checked={this.state.checked}
            />

            <CheckBox
              center
              title="Experience"
              checkedColor="#33CC00"
              onPress={() => this.onChange1()}
              checked={this.state.checked1}
            />
          </View>
          <View
            style={{
              width: "100%",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {this.state.checked == true
              ? this.state.arrApply.map((v, index) => {
                  return (
                    <View key={index} style={styles.item}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: "https://c.neh.tw/thumb/f/720/m2H7H7K9m2Z5G6i8.jpg",
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          flexDirection: "column",
                          marginTop: 20,
                          marginLeft: 5,
                          width: 150,
                        }}
                        onPress={() =>
                          this.props.navigation.navigate("Detail1", {
                            id: v.idStudent,
                          })
                        }
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                          {v.fullName}
                        </Text>
                        <Text style={{ fontWeight: "bold", color: "#aaaaaa" }}>
                          Nội dung: {v.text}
                        </Text>
                        <Text style={{ fontWeight: "bold", color: "#aaaaaa" }}>
                          Khóa: {v.type_of_student}
                        </Text>
                        <Text style={{ fontWeight: "bold", color: "#aaaaaa" }}>
                          Kinh nghiệm: {v.experience} năm
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.body}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => this.onApprove(v.idStudent, v._id)}
                        >
                          <AntDesign
                            name="checkcircle"
                            size={24}
                            color="#33CC00"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              : null}
            {this.state.checked1 == true
              ? this.state.arrEx.map((v, index) => {
                  return (
                    <View key={index} style={styles.item}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: "https://c.neh.tw/thumb/f/720/m2H7H7K9m2Z5G6i8.jpg",
                        }}
                      />
                      <TouchableOpacity
                        style={{
                          flexDirection: "column",
                          marginTop: 20,
                          marginLeft: 5,
                          width: 150,
                        }}
                        onPress={() =>
                          this.props.navigation.navigate("Detail1", {
                            id: v.idStudent,
                          })
                        }
                      >
                        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                          {v.fullName}
                        </Text>
                        <Text style={{ fontWeight: "bold", color: "#aaaaaa" }}>
                          Nội dung: {v.text}
                        </Text>
                        <Text style={{ fontWeight: "bold", color: "#aaaaaa" }}>
                          Khóa: {v.type_of_student}
                        </Text>
                        <Text style={{ fontWeight: "bold", color: "#aaaaaa" }}>
                          Kinh nghiệm: {v.experience} năm
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.body}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => this.onApprove(v.idStudent, v._id)}
                        >
                          <AntDesign
                            name="checkcircle"
                            size={24}
                            color="#33CC00"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                })
              : null}
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
  item: {
    width: "100%",
    height: 120,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    marginHorizontal: 16,
    marginVertical: 10,
    elevation: 3,
    borderTopColor: "#71B7B7",
    backgroundColor: "#EEEEEE",
    zIndex: 1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  body: {
    marginLeft: 10,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    height: 50,
    width: 50,
    backgroundColor: "#ffff",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#33CC00",
    alignItems: "center",
    borderRadius: 5,
  },
});

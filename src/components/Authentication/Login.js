import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 

const { width: WIDTH } = Dimensions.get("window");
var e;

class Login extends Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      showPass: true,
      press: false,
    };
  }
  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true });
    } else {
      this.setState({ showPass: true, press: false });
    }
  };
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1, backgroundColor: "white" }}
          extraHeight={200}
          enableOnAndroid
        >
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ alignItems: "center" }}>
              <View style={{ marginTop: 80 }}>
                <Image
                  source={{
                    uri: "https://vn-school.s3-ap-northeast-1.amazonaws.com/school/649/hoc-vien-ky-thuat-mat-ma-co-so-phia-nam-0-KDcx1I.jpg",
                  }}
                  style={styles.logo}
                ></Image>
              </View>
              <View style={{ justifyContent: "center" }}>
                <View>
                  <TextInput
                    style={{
                      width: 300,
                      height: 40,
                      borderRadius: 10,
                      fontSize: 16,
                      paddingLeft: 45,
                      paddingTop: -10,
                      backgroundColor: "#ffff",
                      color: "black",
                      marginHorizontal: 25,
                      marginTop: 10,
                      borderWidth: 1,
                      borderColor: "grey",
                    }}
                    placeholder={"Email"}
                    placeholderTextColor={"grey"}
                    underlineColorAndroid="transparent"
                  />
                  <View style={styles.inputIcon}>
                    <MaterialIcons
                      name="email"
                      size={24}
                      color="grey"
                    ></MaterialIcons>
                  </View>
                </View>
                <View>
                  <TextInput
                    style={{
                      width: 300,
                      height: 40,
                      borderRadius: 10,
                      fontSize: 16,
                      paddingLeft: 45,
                      paddingTop: -10,
                      backgroundColor: "#ffff",
                      color: "black",
                      marginHorizontal: 25,
                      marginTop: 10,
                      borderWidth: 1,
                      borderColor: "grey",
                    }}
                    placeholder={"Password"}
                    placeholderTextColor={"grey"}
                    underlineColorAndroid="transparent"
                    secureTextEntry={this.state.showPass}
                  ></TextInput>
                  <View style={styles.inputIcon}>
                    <FontAwesome5 name="lock" size={22} color="grey" />
                  </View>
                  <TouchableOpacity
                    style={styles.btnEye}
                    onPress={this.showPass.bind(this)}
                  >
                    <Ionicons name={this.state.press == false ? "eye-off" : "eye"} size={24} color="grey" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{marginTop:15,alignItems:'flex-end',paddingRight: 30}}>
                    <Text>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={{ paddingLeft: 25 }}>
                  <TouchableOpacity style={styles.btnLogin}>
                    <Text style={styles.textlogin}>LOGIN</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  inputIcon: {
    position: "absolute",
    top: 17,
    left: 37,
  },
  btnEye: {
    position: "absolute",
    top: 20,
    right: 37,
  },
  logo: {
    width: 300,
    height: 300,
  },
  btnLogin: {
    width: 300,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#e60000",
    marginTop: 10,
    justifyContent: "center",
  },
  textlogin: {
    textAlign: "center",
    color: "#ffff",
    fontWeight: "bold",
  },
});
export default Login;

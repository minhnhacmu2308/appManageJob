import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";

import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createAccountAdmin } from "../../services/api/api";

const { width: WIDTH } = Dimensions.get("window");
var e;

class CreateAccountAdmin extends Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      email: null,
      password: "",
      secret_key: null,
      notice: false,
    };
  }
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem("TOKEN");
    this.setState({ secret_key: token });
  };
  onSubmit = async () => {
    const data = {
      secret_key: this.state.secret_key,
      email: this.state.email,
      password: this.state.password,
      role: "admin",
    };
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.state.email==null){
        alert("Email not null")
    }
    else if(this.state.password==""){
        alert("Password not null")
    }
    else if (reg.test(this.state.email) !== true) {
      alert("The email must be a valid email address.");
    }
    else if (this.state.password.length < 8) {
      alert("The password can not be less than 8.");
    } else {
      const response = await createAccountAdmin(data);
      if(response.success==true){
          alert("Create Account Admin Success!!!");
          this.setState({
              email:null,
              password:""
          })
      }
    }
  };
  render() {
    return (
      <View style={{ flex: 1, margin: 15 }}>
        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontWeight: "bold" }}>Your Email Address</Text>
        </View>
        <Input
          placeholder="email@address.com"
          leftIcon={<Icon name="envelope-square" size={24} color="black" />}
          onChangeText={(value) => this.setState({ email: value })}
          value={this.state.email}
        />
        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontWeight: "bold" }}>Password</Text>
        </View>
        <Input
          placeholder="Password"
          leftIcon={<Icon name="lock" size={24} color="black" />}
          onChangeText={(value) => this.setState({ password: value })}
          secureTextEntry={true}
          value={this.state.password}
        />
        <View>
          <Button
            title="Create Admin"
            color="white"
            buttonStyle={{ backgroundColor: "red" }}
            onPress={() => this.onSubmit()}
          />
        </View>
      </View>
    );
  }
}

export default CreateAccountAdmin;

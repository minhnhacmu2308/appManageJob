import React, { Component } from "react";
import { View, StyleSheet, Image, Animated } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

class LoadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secret_key: null,
      LogoAnime: new Animated.Value(0),
      Logotext: new Animated.Value(0),
      loadingspinner: false,
      fontloaded: false,
    };
  }
  componentDidMount = async () => {
    let token = await AsyncStorage.getItem("TOKEN");
    await this.setState({ secret_key: token });
    console.log(this.state.secret_key);
    const switchtoAuth = () => {
      {
        this.state.secret_key === null
          ? this.props.navigation.navigate("Login")
          : this.props.navigation.navigate("Main");
      }
    };
    const { LogoAnime, Logotext } = this.state;
    Animated.parallel([
      Animated.spring(LogoAnime, {
        toValue: 1,
        tension: 10,
        friction: 2,
        duration: 1000,
        useNativeDriver: false,
      }).start(),
      Animated.timing(Logotext, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      this.setState({
        loadingspinner: true,
      });

      setTimeout(switchtoAuth, 1200);
    });
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://vn-school.s3-ap-northeast-1.amazonaws.com/school/649/hoc-vien-ky-thuat-mat-ma-co-so-phia-nam-0-KDcx1I.jpg",
          }}
          style={styles.logo}
        ></Image>
      </View>
    );
  }
}

export default LoadingPage;

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 300,
  },
});

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import { Tab, Tabs } from "native-base";
import { Header, ListItem, Avatar, SearchBar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import ViewInformationStudent from "./ViewInformationStudent";
import ViewRecruiter from "./ViewRecruiter";
import Active from "./Active";
import UnActive from "./UnActive";

const { width, height } = Dimensions.get("window");

class MainViewPost extends Component {
  constructor(props) {
    super(props);
    e = this;
  }
  left = () => {
    return (
      <View style={{ flexDirection: "row", width: 350 }}>
        <Image
          source={{
            uri: "https://vn-school.s3-ap-northeast-1.amazonaws.com/school/649/hoc-vien-ky-thuat-mat-ma-co-so-phia-nam-0-KDcx1I.jpg",
          }}
          style={styles.logo}
        ></Image>
        <View style={styles.input}>
          <AntDesign
            style={{ position: "absolute", top: 10, left: 12 }}
            name="search1"
            size={16}
            color="#000000"
          />
          <TextInput
            placeholder="Search "
            clearButtonMode="always"
            style={styles.input}
          />
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Header
          leftComponent={() => this.left()}
          backgroundColor="white"
          //   centerComponent={{
          //     text: " TRANG CHỦ ",
          //     style: { color: "white" },
          //   }}
          //   rightComponent={() => (
          //     <FontAwesome name="search" size={24} color="#ffff" />
          //   )}
        />
        <Tabs tabBarUnderlineStyle={{ backgroundColor: "#e60000" }}>
          <Tab
            tabStyle={{ backgroundColor: "white" }}
            activeTabStyle={{ backgroundColor: "white" }}
            textStyle={{ color: "black" }}
            activeTextStyle={{ color: "#e60000", fontWeight: "bold" }}
            heading="Active"
          >
            <Active
              onStack={(id) =>
                this.props.navigation.navigate("DetailPostTask", { id: id })
              }
              onStack1={(id) =>
                this.props.navigation.navigate("Detail1", { id: id })
              }
            />
          </Tab>
          <Tab
            tabStyle={{ backgroundColor: "white" }}
            activeTabStyle={{ backgroundColor: "white" }}
            textStyle={{ color: "black" }}
            activeTextStyle={{ color: "#e60000", fontWeight: "bold" }}
            heading="UnActive"
          >
            <UnActive
              onStack={(id) =>
                this.props.navigation.navigate("DetailPostTask", { id: id })
              }
            />
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header0: {
    ...Platform.select({
      // ios: {
      //   flexDirection:'row',
      //   alignItems:'center',
      //   justifyContent:'space-between',
      //   height:height*0.08,
      //   shadowOffset:{width:0,height:3},
      //   shadowOpacity:0.2,
      //   padding: 10,
      //   shadowOpacity: 0.2,
      //   elevation: 1,
      //   paddingTop:36,
      //   marginBottom:10
      // },
      android: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: height * 0.08,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        padding: 10,
        shadowOpacity: 0.2,
        elevation: 1,
        marginBottom: 10,
      },
      default: {
        // other platforms, web for example
      },
    }),
  },
  input: {
    flex: 1,
    height: 35,
    backgroundColor: "#e4e6eb",
    borderRadius: 16,
    paddingHorizontal: 10,
    marginLeft: 20,
    fontSize: 15,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: -10,
  },
});

export default MainViewPost;

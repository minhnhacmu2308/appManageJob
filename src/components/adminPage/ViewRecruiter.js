import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { getListNtdActive } from "../../services/api/api";
import { ListItem, Avatar } from "react-native-elements";

const { width, height } = Dimensions.get("window");
var e;

class ViewRecruiter extends Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      listNtd: [],
    };
  }
  componentDidMount = async () => {
    const list = await getListNtdActive();
    this.setState({
      listNtd: list,
    });
  };
  render() {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.listNtd.map((l, i) => (
            <ListItem
              key={i}
              bottomDivider
              onPress={() => this.props.onStack(l._id)}
            >
              <Avatar
                source={{
                  uri: "https://png.pngtree.com/template/20190611/ourlarge/pngtree-company-name-logo-design-for-businessmanavataremployeesa-image_212383.jpg",
                }}
              />
              <ListItem.Content>
                <ListItem.Title>{l.name_company}</ListItem.Title>
                <ListItem.Subtitle>{l.phonenumber}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default ViewRecruiter;

import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";

import { getListPostActive } from "../../services/api/api";
import { ListItem, Avatar } from "react-native-elements";

const { width, height } = Dimensions.get("window");
var e;

class Active extends Component {
  constructor(props) {
    super(props);
    e = this;
    this.state = {
      listPostActive: [],
    };
  }

  componentDidMount = async () => {
    const list = await getListPostActive();
    this.setState({
      listPostActive: list,
    });
  };

  render() {
    return (
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.state.listPostActive.map((l, i) => (
            <ListItem key={i} bottomDivider onPress={() => this.props.onStack(l._id)}>
              <Avatar
                source={{
                  uri: "https://previews.123rf.com/images/vectorkif/vectorkif1609/vectorkif160900070/65327593-student-girl-flat-style-beautiful-vector-icon-avatar.jpg",
                }}
              />
              <ListItem.Content>
                <ListItem.Title>{l.name_job}</ListItem.Title>
                <ListItem.Subtitle>{l.name_company}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default Active;

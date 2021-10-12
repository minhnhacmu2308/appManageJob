import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native'

const { width: WIDTH } = Dimensions.get('window')
var e;

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        e = this;
    }
    render() {
        return (
            <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                <Text>This is ChangePassword Screen</Text>
            </View>
        )
    }
}

export default ChangePassword;
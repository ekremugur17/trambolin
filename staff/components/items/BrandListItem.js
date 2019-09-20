import React, { Component } from 'react'
import { Text, View, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import Axios from 'axios';

export default class BrandListItem extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress(this.props.item)}>
        <View style={{
          flex: 1, height: this.props.height, width: this.props.width - 10, borderRadius: 50, margin: 5, shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5, shadowRadius: 2,
          elevation: 1
        }}>
          <ImageBackground
            source={{ uri: this.props.item.images.banner }}
            imageStyle={{ borderRadius: 25 }}
            style={{
              width: '100%',
              height: '100%'
            }} >
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

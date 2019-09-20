import React, { Component } from 'react'
import { Text, View, ImageBackground, TouchableWithoutFeedback } from 'react-native'

export default class BestSellerItem extends Component {
  render() {
    return (
      <TouchableWithoutFeedback>
        <View style={{
          flex: 1, width: this.props.width, margin: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4, shadowRadius: 2,
          elevation: 1, maxWidth: 160, maxHeight: 80
        }}>
          <ImageBackground
            source={{ uri: this.props.item.image }}
            imageStyle={{ borderRadius: 15 }}
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

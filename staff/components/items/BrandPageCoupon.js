import React, { Component } from 'react'
import { Text, View, ImageBackground, Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class BrandListItem extends Component {
  render() {
    const { value } = this.props;
    const val = value == 25 ? require('../../assets/images/screens/brandpage/25.png') : value == 50 ? require('../../assets/images/screens/brandpage/50.png') : value == 100 ? require('../../assets/images/screens/brandpage/100.png') : value == 200 ? require('../../assets/images/screens/brandpage/200.png') : value == 250 ? require('../../assets/images/screens/brandpage/250.png') : value == 500 ? require('../../assets/images/screens/brandpage/500.png') : require('../../assets/images/screens/brandpage/500.png');
    return (
      <View style={{
        flex: 1, shadowColor: '#000', marginTop: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5, shadowRadius: 2, maxWidth: 180,
        elevation: 1, marginLeft: 5, marginRight: 5, backgroundColor: '#fff', borderRadius: 7
      }}>
        <TouchableWithoutFeedback onPress={this.props.onPress}>
          <View style={{
            flex: 2, justifyContent: 'center', alignItems: 'center', shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8, shadowRadius: 3,
            elevation: 1, maxWidth: 176, maxHeight: 90, margin: 2
          }}>
            <Image source={val} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
          </View>
          <View style={{ flex: 1, maxWidth: 180, maxHeight: 90, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 16 }}>{this.props.brandName}</Text>
            <Text style={{ fontFamily: 'Poppins', fontSize: 14 }}>{`${this.props.value}\u20BA Hediye Çeki`}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View >
    )
  }
}

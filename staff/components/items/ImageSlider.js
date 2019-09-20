import React, { Component } from 'react'
import { SliderBox } from 'react-native-image-slider-box';
import { Text, View } from 'react-native'

class ImageSlider extends Component {
  render() {
    return (
      <View style={{ borderRadius: 10, overflow: 'hidden', width: this.props.width - 10, margin: 5 }}>
        <SliderBox
          images={this.props.images}
          sliderBoxHeight={this.props.height}
          dotColor='#42c0ef'
          inactiveDotColot='#faf4f1'
          paginationBoxVerticalPadding={20}
          circleLoop={false}
        />
      </View>
    )
  }
}

export default ImageSlider;
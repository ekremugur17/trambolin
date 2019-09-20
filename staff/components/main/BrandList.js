import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView, TouchableWithoutFeedback } from 'react-native';
import BrandListItem from '../items/BrandListItem';

const height = Math.round(Dimensions.get('window').height);
const width = Math.round(Dimensions.get('window').width);

class BrandList extends Component {
  render() {
    return (
      <TouchableWithoutFeedback>
        <View style={{ flexDirection: 'row' }}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} >
            {this.props.cards.map((item, index) => (<BrandListItem item={item} onPress={(item) => this.props.onPress(item)} key={index} height={(2 * height) / 7} width={width} />))}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default BrandList;
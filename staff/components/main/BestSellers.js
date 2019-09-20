import React, { Component } from 'react';
import { Text, View, Dimensions, ScrollView } from 'react-native';
import BestSellerItem from '../items/BestSellerItem';


class BestSellers extends Component {
  render() {
    return (
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} >
          {this.props.cards.map((item, index) => (<BestSellerItem item={item} key={index} width={this.props.width} />))}
        </ScrollView>
      </View>
    );
  }
}

export default BestSellers;
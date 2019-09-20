import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import BrandList from '../../components/main/BrandList';
import { connect } from 'react-redux';
import Axios from 'axios';

class DiscountPage extends Component {
  state = {
    loading: true,
    brands: []
  }

  componentDidMount() {
    this.getBrands();
  }

  getCode = async (id) => {
    const body = JSON.stringify({
      id
    });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await Axios.post('http://34.219.165.177:5000/api/code/getDiscount', body, config);
    return res.data;
  }

  getBrands = async () => {
    const brandsWithDiscounts = await Axios.get('http://34.219.165.177:5000/api/brand/getDiscountBrands');
    const final = this.props.brands.filter(item => brandsWithDiscounts.data.includes(item._id));
    const { discountPurchases } = this.props;
    let realFinal = [];
    for (let k = 0; k < final.length; k++) {
      for (let i = 0; i < discountPurchases.length; i++) {
        if (discountPurchases[i].brand == final[k].brand && discountPurchases[i].count < 2) {
          realFinal.push(final[k]);
        }
      }
    }
    this.setState({ loading: false, brands: realFinal });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}><ActivityIndicator size="large" color="#42c0ef" /></View>
      )
    } else if (this.state.brands.length == 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Wow such empty</Text>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} >
          <BrandList onPress={async (item) => {
            const code = await this.getCode(item._id);
            this.props.navigation.navigate('Discount', { brand: item, code })
          }} cards={this.state.brands} />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = ({ auth }) => (
  {
    brands: auth.storage.brands,
    discountPurchases: auth.user.discountPurchases
  }
)

export default connect(mapStateToProps)(DiscountPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  hrLine: {
    width: '100%',
    backgroundColor: '#42c0ef',
    height: 2,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    opacity: 0.6
  }
});


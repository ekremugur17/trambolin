import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableWithoutFeedback, ScrollView, Image, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { loadUser } from '../../redux/actions';
import BrandList from '../../components/main/BrandList';
import Axios from 'axios';

class Box extends React.Component {
  state = {
    loading: false,
    brands: []
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

  componentDidMount() {
    this.getBrands();
  }

  getBrands = async () => {
    const { brands, discountPurchases } = this.props;
    this.setState({ loading: true });
    await this.props.loadUser();
    const res = await Axios.get('http://34.219.165.177:5000/api/brand/getDiscountBrands');
    const stock = brands.filter(item => (res.data.includes(item._id)));
    const final = [];
    for (let k = 0; k < stock.length; k++) {
      for (let i = 0; i < discountPurchases.length; i++) {
        if (discountPurchases[i].brand === stock[k].brand && discountPurchases[i].count < 2) {
          final.push(stock[k]);
        }
      }
    }
    this.setState({ brands: final, loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}><ActivityIndicator size="large" color="#42c0ef" /></View>
      )
    }
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
        {this.state.brands.length === 0 && (
          <View>
            <Text style={{ marginTop: 20 }}>Koca bir hiçlik...</Text>
          </View>
        )}
        <BrandList onPress={async (item) => {
          const code = await this.getCode(item._id);
          setTimeout(() => {
            this.getBrands();
            this.props.loadUser();
          }, 5000);
          this.props.navigation.navigate('Discount', { brand: item, code });
        }} cards={this.state.brands} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    opacity: 0.6,
    zIndex: 9999
  }
});

const mapStateToProps = ({ auth }) => ({
  brands: auth.storage.brands,
  discountPurchases: auth.user.discountPurchases
})

export default connect(mapStateToProps, { loadUser })(Box);
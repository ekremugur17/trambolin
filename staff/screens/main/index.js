import React, { Component } from 'react';
import { Text, ScrollView, View, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import ImageSlider from '../../components/items/ImageSlider';
import BestSellers from '../../components/main/BestSellers';
import BrandPage from '../../components/main/BrandPage';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class Main extends Component {
  state = {
    images: [],
    coupons: [],
    discounts: []
  }

  componentDidMount() {
    const { mainSlider, couponSlider, discountSlider } = this.props.assets;
    const images = [mainSlider.first, mainSlider.second, mainSlider.third];
    const coupons = [{ image: couponSlider.first }, { image: couponSlider.second }, { image: couponSlider.third }, { image: couponSlider.fourth }];
    const discounts = [{ image: discountSlider.first }, { image: discountSlider.second }, { image: discountSlider.third }];
    this.setState({ images, coupons, discounts });
  }

  loadedView = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={{
          height: (6 * height) / 9, shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8, shadowRadius: 2,
          elevation: 1
        }}>
          <ImageSlider images={this.state.images} height={'100%'} width={width} />
        </View>
        <View style={{
          height: (height / 5), marginTop: 10, backgroundColor: '#fff', shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3, shadowRadius: 2,
          elevation: 1, marginLeft: 10, marginRight: 10, borderRadius: 5
        }}>
          <View style={{ justifyContent: 'center', marginLeft: 10, marginTop: 15 }}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#111', fontSize: 20 }}>Popüler Markalar</Text>
          </View>
          <BestSellers cards={this.state.coupons} width={width / 3} />
        </View>
        <View style={{
          height: (height / 5), marginTop: 15, backgroundColor: '#fff', shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3, shadowRadius: 2,
          elevation: 1, marginLeft: 10, marginRight: 10, borderRadius: 5
        }} >
          <View style={{ justifyContent: 'center', marginLeft: 10, marginTop: 15 }}>
            <Text style={{ fontFamily: 'Poppins-Medium', color: '#111', fontSize: 20 }}>Sevilen Çekler</Text>
          </View>
          <BestSellers cards={this.state.discounts} width={(2 * width) / 5} />
        </View>
        <View style={{ marginBottom: 15 }}></View>
      </View>
    </ScrollView>
  )

  render() {
    return (
      this.state.brand ? <BrandPage brand={this.state.brand} /> : <this.loadedView />
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
    assets: auth.storage
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  }
});


export default connect(mapStateToProps)(Main);
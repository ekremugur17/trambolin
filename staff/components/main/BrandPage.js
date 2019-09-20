import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Dimensions, ImageBackground, ActivityIndicator, Button } from 'react-native';
import Axios from 'axios';
import Icon from '@expo/vector-icons/Ionicons';
import BrandPageCoupon from '../items/BrandPageCoupon';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import { loadUser } from '../../redux/actions';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

class BrandPage extends Component {
  static navigationOptions = ({ navigation }) => (
    {
      headerRight: null,
      headerLeft: <Icon style={{ paddingLeft: 15 }} color='#222222' onPress={() => navigation.goBack()} name='ios-arrow-back' size={30} />
    }
  )
  state = {
    coupons: [{ status: false, value: 25 }, { status: false, value: 50 }, { status: false, value: 100 }, { status: false, value: 200 }, { status: false, value: 250 }, { status: false, value: 500 }],
    loaded: false,
    visibleModal: null,
    error: '',
    finalCards: []
  };

  async componentDidMount() {
    await this.props.loadUser();
    await this.checkCodes();
    await this.setCards();
  }

  checkCodes = async () => {
    const brand = this.props.navigation.getParam('brand', null);
    if (brand) {
      const body = JSON.stringify({
        id: brand._id
      });
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const res = await Axios.post('http://34.219.165.177:5000/api/code/checkCoupon', body, config);
      this.setState({ coupons: res.data.coupons, loaded: true });
    }
  }

  getCode = async (id, value) => {
    const body = JSON.stringify({
      id,
      value
    });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await Axios.post('http://34.219.165.177:5000/api/code/getCoupon', body, config);
    return res.data;
  }

  setCards = () => {
    const brand = this.props.navigation.getParam('brand', null);
    let i = 0;
    let array = [];
    let result = [];
    for (let k = 0; k < this.state.coupons.length; k++) {
      if (this.state.coupons[k].status) {
        i++;
        array.push(this.state.coupons[k].value);
        if (i == 2) {
          result.push(array);
          i = 0;
          array = [];
          // this.setState({ length: this.state.length + 1 })
        }
      }
      if (k == this.state.coupons.length - 1 && array.length != 0) {
        result.push(array);
        // this.setState({ length: this.state.length + 1 })
      }
    }
    let final = result.map((item, index) =>
      <View style={{ flexDirection: 'row' }} key={index}>
        {(item.map((item, index) =>
          <BrandPageCoupon
            onPress={async () => this.setState({ visibleModal: 'purchasement', purchaseAmount: item })}
            key={index}
            brandName={brand.brand}
            value={item}
            height={height / 7}
            width={width / 2} />))}
      </View>)
    this.setState({ finalCards: final });
  }

  isPaymentSuccessfull = async (value) => {
    const brand = this.props.navigation.getParam('brand', null);
    const body = JSON.stringify({
      subMerchantKey: brand.subMerchantKey,
      value
    });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await Axios.post('http://34.219.165.177:5000/api/payment/withRegistered', body, config);
    if (res.err) return false;
    if (res.data.result.status == 'success') return true;
    else return false;
  }

  renderModalContent = () => {
    const brand = this.props.navigation.getParam('brand', null);
    return (<View style={styles.content}>
      <Text style={styles.contentTitle}>{brand.description}</Text>
      <Button
        onPress={() => this.setState({ visibleModal: null })}
        title="Geri Dön"
      />
    </View>)
  };

  renderPurchaseContent = () => {
    const brand = this.props.navigation.getParam('brand', null);
    return (<View style={styles.content}>
      <Text style={styles.contentTitle}>Satın alma işlemine devam etmek istediğinize emin misiniz?</Text>
      <Text>Bu işlem geri döndürülemez.</Text>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Button
          onPress={() => this.setState({ visibleModal: null, purchaseAmount: null })}
          title="Geri Dön"
        />
        <Button
          onPress={async () => {
            await this.setState({ visibleModal: null, error: '' });
            setTimeout(async () => {
              if (this.props.credits < this.state.purchaseAmount) {
                await this.setState({ visibleModal: 'error', error: 'Yetersiz bakiye' })
                return
              }
              if (this.isPaymentSuccessfull(this.state.purchaseAmount)) {
                this.props.navigation.navigate('Purchase', {
                  brand,
                  code: await this.getCode(brand._id, this.state.purchaseAmount),
                  amount: this.state.purchaseAmount
                })
              } else if (!payStatus) {
                await this.setState({ visibleModal: 'error', error: 'Ödeme başarısız oldu. Yöneticinizle iletişime geçiniz.' })
                return
              } else {
                await this.setState({ visibleModal: 'error', error: 'Beklenmeyen bir hata oluştu. Lütfen destek hattımızla iletişime geçin.' })
                return
              }
            }, 300)
          }}
          title="Devam Et"
        />
      </View>
    </View>)
  };

  renderErrorContent = () => {
    return (<View style={styles.content}>
      <Text style={styles.contentTitle}>{this.state.error}</Text>
      <Button
        onPress={() => this.setState({ visibleModal: null })}
        title="Geri Dön"
      />
    </View>)
  };

  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };

  handleScrollTo = p => {
    if (this.scrollViewRef) {
      this.scrollViewRef.scrollTo(p);
    }
  };

  render() {
    const brand = this.props.navigation.getParam('brand', null);
    return (
      <View>
        <View>
          <Modal
            isVisible={this.state.visibleModal === 'sliding'}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
          >
            {this.renderModalContent()}
          </Modal>
        </View>
        <View>
          <Modal
            isVisible={this.state.visibleModal === 'purchasement'}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
          >
            {this.renderPurchaseContent()}
          </Modal>
        </View>
        <View>
          <Modal
            isVisible={this.state.visibleModal === 'error'}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
          >
            {this.renderErrorContent()}
          </Modal>
        </View>
        {this.state.loaded && <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{
            height: (5 * height) / 7, width: width - 10, borderRadius: 50, margin: 5, shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8, shadowRadius: 3,
            elevation: 1
          }}>
            <ImageBackground
              source={{ uri: brand.images.detail }}
              imageStyle={{ borderRadius: 25 }}
              style={{
                width: '100%',
                height: '100%'
              }} >
            </ImageBackground>
            <View>
              <Text onPress={() => this.setState({ visibleModal: 'sliding' })} style={{ textDecorationLine: 'underline', color: '#fff', fontFamily: 'Poppins', fontSize: 12, position: 'absolute', right: 20, bottom: 10 }}>
                Daha fazla bilgi al
              </Text>
            </View>
          </View>
          <View style={{
            marginTop: 15, backgroundColor: '#fff', shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8, shadowRadius: 3,
            elevation: 1, marginLeft: 10, marginRight: 10, borderRadius: 10
          }} >
            <View style={{ justifyContent: 'center', marginLeft: 10, marginTop: 5 }}>
              <Text style={{ fontFamily: 'Poppins-Medium', color: '#111', fontSize: 20 }}>{"Hediye Çekleri"}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {this.state.loaded && this.state.finalCards}
              {this.state.finalCards.length == 0 && <Text style={{ fontFamily: 'Poppins-Medium', color: '#111', fontSize: 20, margin: 10 }}>Bu markaya ait hediye kodu stokları tükenmiş :(</Text>}
            </View>
            <View style={{ marginBottom: 10 }}></View>
          </View>
          <View style={{ marginBottom: 10 }}></View>
        </ScrollView>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 300,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
  customBackdrop: {
    flex: 1,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
  },
  customBackdropText: {
    marginTop: 10,
    fontSize: 17,
  },
  button: {
    backgroundColor: '#4ba37b',
    width: 100,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 100
  }
});

const mapStateToProps = ({ auth }) => ({
  credits: auth.user.credits
})

export default connect(mapStateToProps, { loadUser })(BrandPage);
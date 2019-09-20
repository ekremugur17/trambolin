import React, { Component } from 'react';
import { Text, Image, View, ScrollView, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import QRCode from 'react-native-qrcode-svg';
import Barcode from 'react-native-barcode-builder';
import { loadUser } from '../../redux/actions';
import Axios from 'axios';
import Modal from "react-native-modal";

class Profile extends Component {
  static navigationOptions = ({ navigation }) => (
    {
      headerRight: null,
      headerLeft: <Ionicons style={{ paddingLeft: 15 }} color='#222222' onPress={() => navigation.pop()} name='ios-arrow-back' size={30} />
    }
  )

  async componentDidMount() {
    const brand = this.props.navigation.getParam('brand', { brand: '404' });
    const code = this.props.navigation.getParam('code', '404');
    const amount = this.props.navigation.getParam('amount', 0);
    const body = JSON.stringify({
      brand,
      code,
      amount
    })
    await Axios.post('http://34.219.165.177:5000/api/purchase/gift', body, { headers: { 'Content-Type': 'application/json' } });
    await this.props.loadUser();
  }

  state = {
    barcode: false,
    qr: false,
    numeric: false,
    visibleModal: false
  }

  renderModalContent = () => {
    return (<View style={styles.content}>
      <Text>{this.props.code ? this.props.code.code.terms : 'Lütfen destek hattımızla iletişime geçiniz'}</Text>
      <Button
        onPress={() => this.setState({ visibleModal: null })}
        title="Geri Dön"
      />
    </View>)
  };

  toggleModal = () => this.setState({ visibleModal: 'sliding' });

  profileView = (props) => {
    const { brand, amount, code } = props;
    console.log(code);
    const val = amount == 25 ? require('../../assets/images/screens/brandpage/25.png') : amount == 50 ? require('../../assets/images/screens/brandpage/50.png') : amount == 100 ? require('../../assets/images/screens/brandpage/100.png') : amount == 200 ? require('../../assets/images/screens/brandpage/200.png') : amount == 250 ? require('../../assets/images/screens/brandpage/250.png') : amount == 500 ? require('../../assets/images/screens/brandpage/500.png') : require('../../assets/images/screens/brandpage/500.png');
    return (
      <View style={{ flex: 1 }}>
        <View>
          <Modal
            isVisible={this.state.visibleModal === 'sliding'}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
          >
            {this.renderModalContent()}
          </Modal>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{
            height: 150, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#fff',
            borderBottomColor: '#d9d9d9', borderBottomWidth: 1
          }}>
            <View style={{ flex: 3, margin: 5, borderRadius: 10, overflow: 'hidden' }}>
              <Image source={val} style={{ height: '80%', width: '100%' }} resizeMode='contain' />
            </View>
            <View style={{ flex: 2, justifyContent: 'space-between', alignItems: 'center', marginLeft: 0 }}>
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, textTransform: 'capitalize', color: '#111' }}>{brand.brand}</Text>
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#abaaaa' }}>{`${amount}\u20BA Hediye Çeki`}</Text>
              <Text onPress={this.toggleModal} style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#42c0ef', textDecorationLine: 'underline' }}>Kullanım Koşulları</Text>
            </View>
          </View>
          <View style={{
            height: this.state.qr ? 270 : 50, alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
            shadowColor: '#000', backgroundColor: '#fff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5, shadowRadius: 2,
            elevation: 1,
          }}>
            <TouchableWithoutFeedback onPress={() => this.setState({ qr: !this.state.qr })} style={{ padding: 10, width: '100%', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <AntDesign style={{ paddingLeft: 15, color: '#42c0ef' }} name='qrcode' size={30} />
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#111', marginLeft: 5 }}>QR Kod</Text>
                <Ionicons style={{ paddingLeft: 15, color: '#42c0ef' }} name='ios-arrow-down' size={30} />
              </View>
            </TouchableWithoutFeedback>
            {/* <Image source={{ uri: 'https://i.hizliresim.com/JVWnZE.png' }} style={{ height: 200, width: 200 }} /> */}
            <View style={{ alignItems: 'center' }}>
              {this.state.qr && <QRCode
                value={code.code}
                size={200}
              />}
            </View>
          </View>
          <View style={{
            height: this.state.numeric ? 200 : 50, alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
            shadowColor: '#000', backgroundColor: '#fff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5, shadowRadius: 2,
            elevation: 1,
          }}>
            <TouchableWithoutFeedback onPress={() => this.setState({ numeric: !this.state.numeric })} style={{ padding: 10, width: '100%', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons style={{ paddingLeft: 15, color: '#42c0ef' }} name='numeric' size={30} />
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#111', marginLeft: 5 }}>Numerik Kod</Text>
                <Ionicons style={{ paddingLeft: 15, color: '#42c0ef' }} name='ios-arrow-down' size={30} />
              </View>
              {this.state.numeric && <Text style={{ fontFamily: 'Poppins-Medium', lineHeight: 150, color: '#111', fontSize: 54 }} >
                {code.code}
              </Text>}
            </TouchableWithoutFeedback>
          </View>
          <View style={{
            height: this.state.barcode ? 180 : 50, alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
            shadowColor: '#000', backgroundColor: '#fff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5, shadowRadius: 2,
            elevation: 1,
          }}>
            <TouchableWithoutFeedback onPress={() => this.setState({ barcode: !this.state.barcode })} style={{ padding: 10, width: '100%', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AntDesign style={{ paddingLeft: 15, color: '#42c0ef' }} name='barcode' size={30} />
                <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#111', marginLeft: 5 }}>Barkod</Text>
                <Ionicons style={{ paddingLeft: 15, color: '#42c0ef' }} name='ios-arrow-down' size={30} />
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {this.state.barcode && <Barcode value={code.code} text='' format="CODE128" />}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    )
  }

  render() {
    const brand = this.props.navigation.getParam('brand', { brand: '404' });
    const amount = this.props.navigation.getParam('amount', 0);
    const code = this.props.navigation.getParam('code', '404');
    return (
      <this.profileView brand={brand} amount={amount} code={code} />
    )
  }
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  }
});

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user
  };
}

export default connect(mapStateToProps, { loadUser })(Profile);
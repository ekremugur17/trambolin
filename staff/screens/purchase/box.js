import React, { Component } from 'react';
import { Text, Image, View, ScrollView, AsyncStorage, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import QRCode from 'react-native-qrcode-svg';
import Barcode from 'react-native-barcode-builder';
import Axios from 'axios';
import { loadUser } from '../../redux/actions';


class Profile extends Component {
  static navigationOptions = ({ navigation }) => (
    {
      headerRight: null,
      headerLeft: <Ionicons style={{ paddingLeft: 15 }} color='#222222' onPress={() => navigation.pop()} name='ios-arrow-back' size={30} />
    }
  )

  state = {
    barcode: false,
    qr: false,
    numeric: false,
    title: null,
    code: null,
    image: null,
    info: null,
    loaded: false
  }

  async componentDidMount() {
    const appData = await Axios.post('http://34.219.165.177:5000/api/app', { "name": this.props.type }, { headers: { 'Content-Type': 'application/json' } });
    let data;
    switch (this.props.type) {
      case 'ticket':
        data = await Axios.get('http://34.219.165.177:5000/api/code/getTicketCoupon');
        break;
      case 'discount':
        data = await Axios.get('http://34.219.165.177:5000/api/code/getDiscountCoupon');
        break;
      case 'coffee':
        data = await Axios.get('http://34.219.165.177:5000/api/code/getCoffeeCoupon');
        break;
      default:
        data = null;
    }
    if (!data) alert('Please contact with our customer support services');
    const { first, second, third } = appData.data;
    const { code } = data.data;
    this.setState({ code, image: first, title: second, info: third, loaded: true });
    const body = JSON.stringify({
      content: this.props.type,
      code
    });
    await Axios.post('http://34.219.165.177:5000/api/purchase/box', body, { headers: { 'Content-Type': 'application/json' } });
  }

  profileView = (props) => {
    const { code, title, image, info } = this.state;
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {!this.state.loaded && <View style={styles.loading}><ActivityIndicator size="large" color="#42c0ef" /></View>}
        <View style={{
          height: 150, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#fff',
          borderBottomColor: '#d9d9d9', borderBottomWidth: 1
        }}>
          <View style={{ flex: 2, margin: 5, borderRadius: 10, overflow: 'hidden' }}>
            <Image source={{ uri: image }} style={{ height: '80%', width: '100%' }} resizeMode='contain' />
          </View>
          <View style={{ flex: 2, justifyContent: 'space-between', alignItems: 'center', marginLeft: 0 }}>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, textTransform: 'capitalize', color: '#111' }}>{title}</Text>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#abaaaa' }}>{info}</Text>
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
          <View style={{ alignItems: 'center' }}>
            {this.state.qr && <QRCode
              value={code}
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
              {code}
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
              {this.state.barcode && <Barcode value={code} text='' format="CODE128" />}
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{
          justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
          shadowColor: '#000', backgroundColor: '#fff',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5, shadowRadius: 2,
          elevation: 1, borderRadius: 10, flexDirection: 'row'
        }}>
          <TouchableWithoutFeedback
            onPress={this.props.onPress} style={{ padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                textTransform: 'uppercase', paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium'
              }}
            >
              GERİ Dön
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    )
  }

  render() {
    return (
      <this.profileView />
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
    opacity: 1,
    zIndex: 1111
  }
});

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user
  };
}

export default connect(mapStateToProps, { loadUser })(Profile);
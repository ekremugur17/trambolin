import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableWithoutFeedback, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { loadUser } from '../../redux/actions';
import Axios from 'axios';
import Modal from "react-native-modal";
import BoxCouponPage from '../purchase/box';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';


class BarcodeScannerExample extends React.Component {
  state = {
    boxPurchase: false,
    error: '',
    visibleModal: null,
    type: null,
    boxStatus: this.props.status,
    quota: {
      ...this.props.quota
    }
  };

  componentDidMount() {
    this.getQuota();
  }

  getQuota = async () => {
    const res = await Axios.get('http://34.219.165.177:5000/api/staff/box/quota');
    this.setState({
      quota: {
        ...res.data
      }
    });
  }
  renderModalContent = () => {
    return (<View style={styles.content}>
      <Text style={styles.contentTitle}>{this.state.error}</Text>
      <Button
        onPress={() => this.setState({ visibleModal: null, scanned: false, error: '' })}
        title="Geri Dön"
      />
    </View>)
  };

  handleItemClick = async (type) => {
    const { coffee, ticket, discount } = this.state.quota;
    switch (type) {
      case 'coffee':
        if (coffee == 0) {
          this.setState({ visibleModal: 'error', error: 'Kahve hakkiniz kalmamis!' })
          return
        } else {
          await Axios.post('http://34.219.165.177:5000/api/staff/box/useCoffee');
        }
        break;
      case 'ticket':
        if (ticket == 0) {
          this.setState({ visibleModal: 'error', error: 'Bilet hakkiniz kalmamis!' })
          return
        } else {
          await Axios.post('http://34.219.165.177:5000/api/staff/box/useTicket');
        }
        break;
      case 'discount':
        if (discount == 0) {
          this.setState({ visibleModal: 'error', error: 'Indirim hakkiniz kalmamis!' })
          return
        } else {
          await Axios.post('http://34.219.165.177:5000/api/staff/box/useDiscount');
        }
        break;
      default:
        break;
    }
    this.setState({ boxPurchase: true, type });
  }

  renderErrorContent = () => {
    return (<View style={styles.content}>
      <Text style={styles.contentTitle}>{this.state.error}</Text>
      <Button
        onPress={() => this.setState({ visibleModal: null })}
        title="Geri Dön"
      />
    </View>)
  };

  render() {
    const { boxStatus, boxPurchase, type } = this.state;
    if (!boxStatus) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, color: '#42c0ef' }}>Yöneticinizin kararıyla </Text>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 16, color: '#42c0ef' }}>kutu servislerimizden yararlanamıyorsunuz</Text>
        </View>
      )
    }
    if (boxPurchase) {
      return (
        <BoxCouponPage onPress={async () => {
          await this.props.loadUser();
          this.setState({ boxPurchase: false, type: null })
        }} type={type} />
      )
    }
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View>
          <Modal
            isVisible={this.state.visibleModal === 'error'}
            animationIn="slideInLeft"
            animationOut="slideOutRight"
          >
            {this.renderErrorContent()}
          </Modal>
        </View>
        <View style={{
          maxHeight: 180, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#fff',
          borderBottomColor: '#d9d9d9', borderBottomWidth: 1
        }}>
          <View style={{ flex: 1, margin: 15, borderRadius: 10, overflow: 'hidden' }}>
            <Image source={require('../../assets/images/screens/profile/app.png')} style={{ width: '100%', height: '100%' }} />
          </View>
        </View>
        <View style={{
          justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
          shadowColor: '#000', backgroundColor: '#fff',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5, shadowRadius: 2,
          elevation: 1, borderRadius: 10
        }}>
          <TouchableWithoutFeedback onPress={() => this.handleItemClick('coffee')}>
            <View style={{ padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons style={{ paddingLeft: 15, color: '#42c0ef' }} name='coffee' size={30} />
              <Text style={{ paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium', width: '80%' }}>
                Kahve
            </Text>
              <Ionicons style={{ paddingRight: 15, color: this.state.quota.coffee > 0 ? '#42c0ef' : 'red' }} name='ios-arrow-forward' size={30} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.handleItemClick('ticket')}>
            <View style={{ padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              <Entypo style={{ paddingLeft: 15, color: '#42c0ef' }} name='ticket' size={30} />
              <Text style={{ paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium', width: '80%' }}>
                Sinema Bileti
            </Text>
              <Ionicons style={{ paddingRight: 15, color: this.state.quota.ticket > 0 ? '#42c0ef' : 'red' }} name='ios-arrow-forward' size={30} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.handleItemClick('discount')}>
            <View style={{ padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome style={{ paddingLeft: 15, color: '#42c0ef' }} name='cart-arrow-down' size={30} />
              <Text style={{ paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium', width: '80%' }}>
                Ozel Indirimler
            </Text>
              <Ionicons style={{ paddingRight: 15, color: this.state.quota.discount > 0 ? '#42c0ef' : 'red' }} name='ios-arrow-forward' size={30} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    );
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
  quota: auth.user.box.quota,
  status: auth.user.box.status
});

export default connect(mapStateToProps, { loadUser })(BarcodeScannerExample);
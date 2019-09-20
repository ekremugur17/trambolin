import React from 'react';
import { StyleSheet, View, Text, AsyncStorage, Image, Dimensions, ActivityIndicator } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { connect } from 'react-redux';
import axios from 'axios';

class Landing extends React.Component {
  state = {
    showLanding: false
  }

  async componentDidMount() {
    const userToken = await AsyncStorage.getItem('userToken');
    const body = JSON.stringify({ id: userToken });
    if (userToken) {
      const res = await axios.post('http://34.219.165.177:5000/api/staff/doesExist', body, { headers: { 'Content-Type': 'application/json' } });
      if (res.data) {
        if (!this.props.isValidated) {
          this.props.navigation.navigate('CompleteProfile');
        } else this.props.navigation.navigate('Dashboard');
        return
      }
    }
    const landingToken = await AsyncStorage.getItem('LandingToken');
    if (landingToken) {
      this.props.navigation.navigate('Login');
      return
    }
    this.setState({ showLanding: true })
  }

  _onDone = () => {
    AsyncStorage.setItem('LandingToken', 'set');
    this.props.navigation.navigate('Login');
  };

  _onSkip = () => {
    AsyncStorage.setItem('LandingToken', 'set');
    this.props.navigation.navigate('Login');
  };
  render() {
    return (
      this.state.showLanding ? <AppIntroSlider
        slides={slides}
        onDone={this._onDone}
        showSkipButton={true}
        onSkip={this._onSkip}
      /> : <View style={styles.loading}><ActivityIndicator size="large" color="#42c0ef" /></View>
    )
  }
}


const styles = StyleSheet.create({
  image: {
    width: 256,
    height: 256,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginTop: 16,
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
    opacity: 0.6,
    zIndex: 9999
  }
});

const slides = [
  {
    key: 's1',
    title: 'HEMEN KAYDINI TAMAMLA',
    text: '2 adımlı üyelik sistemiyle güvende kal',
    titleStyle: styles.title,
    textStyle: styles.text,
    image: {
      uri:
        'https://i.hizliresim.com/kMMvOv.png',
    },
    imageStyle: styles.image,
    backgroundColor: '#3395ff',
  },
  {
    key: 's2',
    title: 'BAKİYE KAZANMAYA BAŞLA',
    titleStyle: styles.title,
    textStyle: styles.text,
    text: 'Ya da yöneticini sana bakiye vermeye ikna et!',
    image: {
      uri:
        'https://i.hizliresim.com/gPPo2b.png',
    },
    imageStyle: styles.image,
    backgroundColor: '#32cd57',
  },
  {
    key: 's3',
    title: 'DİLEDİĞİN GİBİ HARCA',
    titleStyle: styles.title,
    text: 'Onlarca mağaza arasında dilediğince harca',
    textStyle: styles.text,
    image: {
      uri: 'https://i.hizliresim.com/p55P6z.png',
    },
    imageStyle: styles.image,
    backgroundColor: '#febe29',
  }
];

const mapStateToProps = ({ auth }) => {
  return ({
    isValidated: auth.user ? auth.user.validation : false
  })
}

export default connect(mapStateToProps)(Landing);
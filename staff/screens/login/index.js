import React, { Component } from 'react';
import { Text, View, Dimensions, Button, TextInput, StyleSheet, ActivityIndicator, Keyboard, Image, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { login, loadUser, logout } from '../../redux/actions';
import { connect } from 'react-redux';
import KeyboardListener from 'react-native-keyboard-listener';

class Login extends Component {
  state = {
    email: '',
    password: '',
    loginProcess: true,
    keyboardOpen: false,
    imageFlex: 2
  }

  onLogin = async () => {
    if (this.state.loginProcess) return;
    Keyboard.dismiss();
    this.setState({ loginProcess: true });
    await this.props.login(this.state);
    if (!this.props.isValidated && this.props.isAuthenicated) {
      this.props.navigation.navigate('CompleteProfile');
    }
    else if (this.props.isAuthenicated) {
      this.props.navigation.navigate('Dashboard');
    }
    else {
      this.setState({ loginProcess: false })
    }
  }

  componentDidMount() {
    const logout = this.props.navigation.getParam('logout', null);
    const valid = this.props.navigation.getParam('valid', null);
    if (logout) {
      this.props.logout();
      this.setState({ loginProcess: false });
    } else if (valid) {
      if (!this.props.isValidated && this.props.isAuthenicated) {
        this.props.navigation.navigate('CompleteProfile');
      } else if (this.props.isAuthenicated) {
        this.props.navigation.navigate('Dashboard');
      }
    } else {
      this.setState({ loginProcess: false })
    }
  }

  renderView = () => (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='height' enabled>
      <KeyboardListener
        onDidShow={() => { this.setState({ keyboardOpen: true, imageFlex: 1 }) }}
        onDidHide={() => { this.setState({ keyboardOpen: false, imageFlex: 2 }) }}
      />
      <View style={{ flex: this.state.imageFlex }}>
        <Image style={{ width: '100%', height: '110%' }} source={require('../../assets/images/screens/login/applogin.png')} />
      </View>
      <View style={{ flex: 3, borderRadius: 25, zIndex: 2, backgroundColor: '#fff' }}>
        <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 28, fontFamily: 'Poppins-Bold' }}>Hoşgeldin!</Text>
          <Text style={{ fontSize: 20, fontFamily: 'Poppins' }}>Hesabına giriş yap</Text>
        </View>
        <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '80%' }}>
            <View style={styles.input}>
              <TextInput autoCapitalize='none' onChangeText={(text) => this.setState({ email: text })} style={{ color: '#111', fontSize: 16, fontFamily: 'Poppins' }} placeholder='E-posta' paddingHorizontal={10} />
            </View>
            <View style={styles.input}>
              <TextInput autoCapitalize='none' secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} style={{ color: '#111', fontSize: 16, fontFamily: 'Poppins' }} placeholder='Şifre' paddingHorizontal={10} />
            </View>
          </View>
          <Text onPress={() => { this.onLogin() }} style={{ overflow: 'hidden', borderRadius: 20, color: '#fff', textAlign: 'center', fontSize: 20, fontFamily: 'Poppins', backgroundColor: '#42c0ef', width: '80%', marginTop: 5, paddingVertical: 3 }}>Giriş Yap</Text>
        </View>
        <View style={{ height: 50, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Forgot')} >
            <Text style={{ fontSize: 16, fontFamily: 'Poppins', color: '#a1e0f7' }}>Şifremi Unuttum</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      {this.state.loginProcess && <View style={styles.loading}><ActivityIndicator size="large" color="#42c0ef" /></View>}
    </KeyboardAvoidingView>
  )

  render() {
    return (
      <this.renderView />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 26,
    padding: 5,
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Poppins',
    backgroundColor: '#f5f5f5',
    marginBottom: 10
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



const mapStateToProps = ({ auth }) => {
  return {
    isAuthenicated: auth.isAuthenicated,
    isValidated: auth.user ? auth.user.validation : false
  }
}

export default connect(mapStateToProps, { login, loadUser, logout })(Login);
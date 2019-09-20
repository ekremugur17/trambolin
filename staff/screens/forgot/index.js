import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableWithoutFeedback, ActivityIndicator, TextInput, StyleSheet, AsyncStorage, Platform, Keyboard, Image, Linking, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Icon from '@expo/vector-icons/Ionicons';

class CompleteProfile extends Component {
  state = {
    screen: 'email',
    email: '',
    password: '',
    code: '',
    inputCode: '',
    error: null,
    loading: false,
    phone: '',
    success: null
  }

  onEmail = async () => {
    this.setState({ loading: true, error: null });
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { email } = this.state;
    if (!re.test(email)) {
      this.setState({ error: 'Lütfen geçerli bir e-posta adresi giriniz', loading: false });
      setTimeout(() => this.setState({ error: null }), 5000);
      return;
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ email });
    const resp = await axios.post('http://34.219.165.177:5000/api/staff/forgotPasswordCode', body, config);
    if (resp.data === 'error') {
      this.setState({ error: 'E-posta adresinizi doğru girdiğinize emin olunuz', loading: false });
      setTimeout(() => this.setState({ error: null }), 5000);
      return;
    } else {
      const body2 = JSON.stringify({ phone: resp.data.phone, code: resp.data.code });
      const sms = await axios.post('http://34.219.165.177:5000/api/sms/forgotPassword', body2, config);
      this.setState({ code: resp.data.code, phone: resp.data.phone, screen: 'code', loading: false });
    }
  }

  onReset = async () => {
    this.setState({ loading: true, error: null });
    const { password, code, email, inputCode } = this.state;
    if (code !== inputCode) {
      this.setState({ error: 'Geçersiz bir onaylama kodu girdiniz', loading: false });
      setTimeout(() => this.setState({ error: null }), 5000);
      return;
    } else if (password.length < 6) {
      this.setState({ error: 'Yeni parolanız en az 6 karakter uzunluğunda olmalıdır', loading: false });
      setTimeout(() => this.setState({ error: null }), 5000);
      return;
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ password, email });
    await axios.post('http://34.219.165.177:5000/api/staff/forgotPassword', body, config);
    this.setState({ success: 'Şifreniz başarıyla sıfırlandı', error: null, loading: false })
  }

  renderEmailView = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {this.state.loading && (
        <View style={styles.loading}><ActivityIndicator size="large" color="#42c0ef" /></View>
      )}
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Image source={require('../../assets/images/screens/login/password.png')} />
            <Text style={{ fontSize: 28, fontFamily: 'Poppins' }}>Şifremi Unuttum</Text>
            <View style={{ width: '80%', margin: 15 }}>
              {this.state.error && (
                <Text style={{ color: 'red', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins', marginBottom: 10 }}>{this.state.error}</Text>
              )}
              <View style={styles.input}>
                <TextInput autoCapitalize='none' onChangeText={(text) => this.setState({ email: text })} style={{ color: '#111', fontSize: 16, fontFamily: 'Poppins' }} placeholder='E-posta' paddingHorizontal={10} />
              </View>
              <Text onPress={() => this.onEmail()} style={{ marginTop: 10, overflow: 'hidden', borderRadius: 20, color: '#fff', textAlign: 'center', fontSize: 20, fontFamily: 'Poppins', backgroundColor: '#42c0ef' }}>İlerle</Text>
              <Text onPress={() => this.props.navigation.navigate('Login')} style={{ marginTop: 10, overflow: 'hidden', borderRadius: 20, color: '#fff', textAlign: 'center', fontSize: 20, fontFamily: 'Poppins', backgroundColor: '#42c0ef' }}>Geri Dön</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )

  renderCodeView = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {this.state.loading && (
        <View style={styles.loading}><ActivityIndicator size="large" color="#42c0ef" /></View>
      )}
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Image source={require('../../assets/images/screens/login/password.png')} />
            <Text style={{ fontSize: 28, fontFamily: 'Poppins' }}>Şifremi Unuttum</Text>
            <View style={{ width: '80%', margin: 15 }}>
              <Text style={{ color: '#111', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins', marginBottom: 10 }}>Telefonunuza gelen onaylama kodunu aşağıya girerek şifrenizi sıfırlayabilirsiniz</Text>
              {this.state.error && (
                <Text style={{ color: 'red', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins', marginBottom: 10 }}>{this.state.error}</Text>
              )}
              {this.state.success && (
                <Text style={{ color: 'green', textAlign: 'center', fontSize: 16, fontFamily: 'Poppins', marginBottom: 10 }}>{this.state.success}</Text>
              )}
              <View style={styles.input}>
                <TextInput autoCapitalize='none' secureTextEntry={true} onChangeText={(text) => this.setState({ inputCode: text })} style={{ color: '#111', fontSize: 16, fontFamily: 'Poppins' }} placeholder='Onaylama Kodu' paddingHorizontal={10} />
              </View>
              <View style={styles.input}>
                <TextInput autoCapitalize='none' secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} style={{ color: '#111', fontSize: 16, fontFamily: 'Poppins' }} placeholder='Şifre' paddingHorizontal={10} />
              </View>
              <Text onPress={() => this.onReset()} style={{ marginTop: 10, overflow: 'hidden', borderRadius: 20, color: '#fff', textAlign: 'center', fontSize: 20, fontFamily: 'Poppins', backgroundColor: '#42c0ef' }}>Sıfırla</Text>
              <Text onPress={() => this.setState({ screen: 'email' })} style={{ marginTop: 10, overflow: 'hidden', borderRadius: 20, color: '#fff', textAlign: 'center', fontSize: 20, fontFamily: 'Poppins', backgroundColor: '#42c0ef' }}>Geri Dön</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )

  render() {
    switch (this.state.screen) {
      case 'email':
        return (
          <this.renderEmailView />
        )
      case 'code':
        return (
          <this.renderCodeView />
        )
      default:
        return <this.renderEmailView />

    }
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
    opacity: 0.6
  },
  input: {
    borderRadius: 26,
    padding: 5,
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Poppins',
    marginBottom: 10,
    backgroundColor: '#f5f5f5'
  },
  sozlesme: {
    width: '100%',
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center'
  }, container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
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

export default connect()(CompleteProfile);
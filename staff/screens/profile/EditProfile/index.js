import React, { Component } from 'react';
import { Text, View, Image, TextInput, Platform, Keyboard, StyleSheet, ActivityIndicator, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { loadUser } from '../../../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


class EditProfile extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return ({
      headerLeft: <Ionicons style={{ paddingLeft: 15 }} color='#222222' onPress={() => params.activeScreen == 'main' ? navigation.pop() : params.handleBack()} name='ios-arrow-back' size={30} />,
      headerRight: null
    })
  };

  state = {
    submitProcess: false,
    oldPassword: '',
    newPassword: '',
    verifyPassword: '',
    activeScreen: 'main',
    error: null,
    success: null
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleBack: () => this.handleBack(),
      activeScreen: this.state.activeScreen
    })
  }

  handleBack = () => {
    this.props.navigation.setParams({
      activeScreen: 'main'
    })
    this.setState({ activeScreen: 'main' });
  }

  updateEmail = async () => {
    this.setState({ submitProcess: true });
    const { email } = this.state;
    if (!validateEmail(email)) {
      this.setState({ error: 'Girdiğiniz e-posta adresi geçersiz', email: '', success: null, submitProcess: false });
      setTimeout(() => this.setState({ error: null }), 4000);
      return
    }
    const body = JSON.stringify({
      email
    });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const resp = await axios.post('http://34.219.165.177:5000/api/staff/resetEmail', body, config);
    if (resp.data == 'success') this.setState({ email: '', success: 'E-postanız başarıyla değiştirildi', error: null, submitProcess: false })
    else this.setState({ email: '', success: null, error: 'İşlem gerçekleştirilemedi, lütfen destek ekibimizle iletişime geçiniz', submitProcess: false })
    setTimeout(() => this.setState({ error: null, success: null }), 4000);
  }

  updatePhone = async () => {
    this.setState({ submitProcess: true });
    const { phone } = this.state;
    const body = JSON.stringify({
      phone
    });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const resp = await axios.post('http://34.219.165.177:5000/api/staff/resetPhone', body, config);
    if (resp.data == 'success') this.setState({ phone: '', success: 'Telefon numaranız başarıyla değiştirildi', error: null, submitProcess: false })
    else if (resp.data == 'failure') this.setState({ phone: '', success: null, error: 'Telefon numaranızı boşluk kullanmadan doğru şekilde giriniz giriniz', submitProcess: false })
    else this.setState({ phone: '', success: null, error: 'İşlem gerçekleştirilemedi, lütfen destek ekibimizle iletişime geçiniz', submitProcess: false })
    setTimeout(() => this.setState({ error: null, success: null }), 4000);
  }

  updatePassword = async () => {
    this.setState({ submitProcess: true });
    const { newPassword, verifyPassword, oldPassword } = this.state;
    if (newPassword != verifyPassword) {
      this.setState({ error: 'Girdiğiniz şifreler birbiriyle uyuşmuyor', submitProcess: false, oldPassword: '', newPassword: '', verifyPassword: '', success: null })
      setTimeout(() => this.setState({ error: null }), 4000);
      return
    } else if (newPassword.length < 6) {
      this.setState({ error: 'Yeni şifreniz en az 6 karakterden oluşmalıdır', submitProcess: false, oldPassword: '', newPassword: '', verifyPassword: '', success: null })
      setTimeout(() => this.setState({ error: null }), 4000);
      return
    }
    const body = JSON.stringify({
      newPassword,
      oldPassword
    });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const resp = await axios.post('http://34.219.165.177:5000/api/staff/resetPassword', body, config);
    if (resp.data == 'success') this.setState({ oldPassword: '', newPassword: '', verifyPassword: '', success: 'Şifreniz başarıyla değiştirildi', error: null, submitProcess: false })
    else if (resp.data == 'failure') this.setState({ email: '', success: null, error: 'Eski şifrenizi yanlış girdiniz', submitProcess: false })
    else this.setState({ oldPassword: '', newPassword: '', verifyPassword: '', success: null, error: 'İşlem gerçekleştirilemedi, lütfen destek ekibimizle iletişime geçiniz', submitProcess: false })
    setTimeout(() => this.setState({ error: null, success: null }), 4000);
  }

  emailView = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Image source={require('../../../assets/images/screens/login/email.png')} />
            <Text style={{ marginTop: 10, fontSize: 20, fontFamily: 'Poppins' }}>E-postanı değiştir!</Text>
            {this.state.success ? <Text style={{ marginTop: 10, fontSize: 14, fontFamily: 'Poppins-Medium', color: '#4BB543' }}>{this.state.success}</Text> : null}
            {this.state.error ? <Text style={{ marginTop: 10, fontSize: 14, fontFamily: 'Poppins-Medium', color: 'red' }}>{this.state.error}</Text> : null}
            <View style={{ width: '80%', margin: 15 }}>
              <View style={styles.input}>
                <TextInput value={this.state.email} autoCapitalize='none' onChangeText={(text) => this.setState({ email: text })} style={{ color: '#111', fontSize: 16, fontFamily: 'Poppins' }} placeholder='E-posta' paddingHorizontal={10} />
              </View>
              <Text onPress={() => this.updateEmail()} style={{ marginBottom: 35, overflow: 'hidden', borderRadius: 20, color: '#fff', textAlign: 'center', fontSize: 20, fontFamily: 'Poppins', backgroundColor: '#42c0ef' }}>Güncelle</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )

  phoneView = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Image source={require('../../../assets/images/screens/login/call.png')} />
            <Text style={{ marginTop: 10, fontSize: 20, fontFamily: 'Poppins' }}>Telefon numaranı değiştir</Text>
            {this.state.success ? <Text style={{ marginTop: 10, fontSize: 14, fontFamily: 'Poppins-Medium', color: '#4BB543' }}>{this.state.success}</Text> : null}
            {this.state.error ? <Text style={{ marginTop: 10, fontSize: 14, fontFamily: 'Poppins-Medium', color: 'red' }}>{this.state.error}</Text> : null}
            <View style={{ width: '80%', margin: 15 }}>
              <View style={styles.input}>
                <TextInput value={this.state.phone} autoCapitalize='none' onChangeText={(text) => this.setState({ phone: text })} style={{ color: '#111', fontSize: 16, fontFamily: 'Poppins' }} placeholder='Telefon numarası' paddingHorizontal={10} />
              </View>
              <Text onPress={() => this.updatePhone()} style={{ marginBottom: 35, overflow: 'hidden', borderRadius: 20, color: '#fff', textAlign: 'center', fontSize: 20, fontFamily: 'Poppins', backgroundColor: '#42c0ef' }}>Güncelle</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )

  passwordView = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Image source={require('../../../assets/images/screens/login/password.png')} />
            <Text style={{ marginTop: 10, fontSize: 20, fontFamily: 'Poppins', marginBottom: 5 }}>Şifreni değiştir</Text>
            {this.state.success ? <Text style={{ marginTop: 10, fontSize: 14, fontFamily: 'Poppins-Medium', color: '#4BB543' }}>{this.state.success}</Text> : null}
            {this.state.error ? <Text style={{ marginTop: 10, fontSize: 14, fontFamily: 'Poppins-Medium', color: 'red' }}>{this.state.error}</Text> : null}
            <View style={{ width: '80%' }}>
              <View style={styles.input}>
                <TextInput autoCapitalize='none' value={this.state.oldPhone} secureTextEntry={true} onChangeText={(text) => this.setState({ oldPassword: text })} style={{ color: '#111', fontSize: 16, fontFamily: 'Poppins' }} placeholder='Eski Şifre' paddingHorizontal={10} />
              </View>
              <View style={styles.input}>
                <TextInput autoCapitalize='none' value={this.state.newPhone} secureTextEntry={true} onChangeText={(text) => this.setState({ newPassword: text })} style={{ color: '#111', fontSize: 16, fontFamily: 'Poppins' }} placeholder='Yeni Şifre' paddingHorizontal={10} />
              </View>
              <View style={styles.input}>
                <TextInput autoCapitalize='none' value={this.state.verifyPhone} secureTextEntry={true} onChangeText={(text) => this.setState({ verifyPassword: text })} style={{ color: '#111', fontSize: 16, fontFamily: 'Poppins' }} placeholder='Yeni Şifre Tekrar' paddingHorizontal={10} />
              </View>
              <Text onPress={() => this.updatePassword()} style={{ marginTop: 10, marginBottom: 35, overflow: 'hidden', borderRadius: 20, color: '#fff', textAlign: 'center', fontSize: 20, fontFamily: 'Poppins', backgroundColor: '#42c0ef' }}>Güncelle</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )

  renderView = (props) => {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Image source={require('../../../assets/images/screens/login/users.png')} />
              <Text style={{ fontSize: 28, fontFamily: 'Poppins' }}>Profilini Düzenle</Text>
              <View style={{
                justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
                shadowColor: '#000', backgroundColor: '#fff',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5, shadowRadius: 2,
                elevation: 1, borderRadius: 10
              }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    this.setState({ activeScreen: 'password' });
                    this.props.navigation.setParams({
                      activeScreen: 'password'
                    })
                  }}
                  style={{ margin: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons style={{ paddingLeft: 15, color: '#42c0ef' }} name='ios-key' size={30} />
                    <Text style={{ paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium', width: '80%' }}>
                      Şifreni Değiştir
                    </Text>
                    <Ionicons style={{ paddingRight: 15, color: '#42c0ef' }} name='ios-arrow-forward' size={30} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={{
                justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
                shadowColor: '#000', backgroundColor: '#fff',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5, shadowRadius: 2,
                elevation: 1, borderRadius: 10
              }}><TouchableWithoutFeedback
                onPress={() => {
                  this.setState({ activeScreen: 'phone' });
                  this.props.navigation.setParams({
                    activeScreen: 'phone'
                  })
                }
                }
                style={{ margin: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo style={{ paddingLeft: 15, color: '#42c0ef' }} name='phone' size={30} />
                    <Text style={{ paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium', width: '80%' }}>
                      Telefon Numaranı Değiştir
                    </Text>
                    <Ionicons style={{ paddingRight: 15, color: '#42c0ef' }} name='ios-arrow-forward' size={30} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={{
                justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
                shadowColor: '#000', backgroundColor: '#fff',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5, shadowRadius: 2,
                elevation: 1, borderRadius: 10
              }}><TouchableWithoutFeedback
                onPress={() => {
                  this.setState({ activeScreen: 'email' });
                  this.props.navigation.setParams({
                    activeScreen: 'email'
                  })
                }}
                style={{ margin: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ marginTop: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Entypo style={{ paddingLeft: 15, color: '#42c0ef' }} name='email' size={30} />
                    <Text style={{ paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium', width: '80%' }}>
                      E-postanı Değiştir
                    </Text>
                    <Ionicons style={{ paddingRight: 15, color: '#42c0ef' }} name='ios-arrow-forward' size={30} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </KeyboardAvoidingView>
    )
  }

  render() {
    if (this.state.submitProcess) {
      return (
        <View style={styles.loading}><ActivityIndicator size="large" color="#42c0ef" /></View>
      )
    }
    switch (this.state.activeScreen) {
      case 'main':
        return (
          <this.renderView />
        );
      case 'password':
        return (
          <this.passwordView />
        );
      case 'phone':
        return (
          <this.phoneView />
        );
      case 'email':
        return (
          <this.emailView />
        )
      default:
        return (
          <this.renderView />
        )
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
    margin: 10,
    padding: 5,
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Poppins',
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
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
});

const mapStateToProps = ({ auth }) => (
  {
    user: auth.user
  }
)

export default connect(mapStateToProps, { loadUser })(EditProfile);
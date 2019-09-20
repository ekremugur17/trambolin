import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableWithoutFeedback, Picker, ActivityIndicator, TextInput, StyleSheet, AsyncStorage, Platform, Keyboard, Image, Linking, KeyboardAvoidingView } from 'react-native';
import { loadUser } from '../../../redux/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
import ModalSelector from 'react-native-modal-selector'

const sexes = [
  { key: 0, value: 'Erkek', label: 'Erkek' },
  { key: 1, value: 'Kadın', label: 'Kadın' },
  { key: 2, value: 'Diğer', label: 'Diğer' },
]


class CompleteProfile extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: null,
    headerRight: null
  });

  state = {
    submitProcess: false,
    password: '',
    birth: '',
    work: '',
    sex: 'Cinsiyetiniz'
  }


  onSubmit = async () => {
    this.setState({ submitProcess: true });
    const { password, sex, birth, work } = this.state;
    if (password == '' || sex == 'Cinsiyetiniz' || birth == '' || work == '') {
      alert('Lütfen tüm alanları doldurunuz');
      return
    }
    const token = await AsyncStorage.getItem('userToken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      }
    }
    const body = JSON.stringify({ sex, password, birth, work });
    try {
      await axios.post('http://34.219.165.177:5000/api/auth/staff/complete', body, config);
      await this.props.loadUser();
      this.props.navigation.navigate('Dashboard');
    } catch (error) {
      alert('Something went wrong');
    }
    this.setState({ submitProcess: false });
  }

  renderView = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Image source={require('../../../assets/images/screens/login/route.png')} />
            <Text style={{ fontSize: 28, fontFamily: 'Poppins' }}>Son bir adım...</Text>
            <Text style={{ fontSize: 20, fontFamily: 'Poppins' }}>Şifreni değiştir!</Text>
            <View style={{ width: '80%', margin: 15 }}>
              <View style={styles.input}>
                <TextInput autoCapitalize='none' secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })} style={{ color: '#111', fontSize: 16, fontFamily: 'Poppins' }} placeholder='Şifre' paddingHorizontal={10} />
              </View>
              <ModalSelector
                data={sexes}
                initValue="Cinsiyetiniz"
                accessible={true}
                scrollViewAccessibilityLabel={'Seçenekler'}
                cancelButtonAccessibilityLabel={'İptal'}
                cancelText='İptal'
                onChange={(option) => { this.setState({ sex: option.label }) }}>
                <View style={styles.input}>
                  <TextInput
                    style={{ color: '#111', fontSize: 16, fontFamily: 'Poppins' }}
                    paddingHorizontal={10}
                    editable={false}
                    placeholder="Cinsiyetiniz"
                    value={this.state.sex} />
                </View>
              </ModalSelector>
              <DatePicker
                style={{ width: '100%', marginBottom: 10 }}
                date={this.state.birth} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Doğum tarihiniz"
                format="DD-MM-YYYY"
                minDate="01-01-1900"
                maxDate="01-01-2019"
                confirmBtnText="Onayla"
                cancelBtnText="İptal"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => { this.setState({ birth: date }) }}
              />
              <DatePicker
                style={{ width: '100%', marginBottom: 10 }}
                date={this.state.work} //initial date from state
                mode="date" //The enum of date, datetime and time
                placeholder="Çalışmaya başlama tarihiniz"
                format="DD-MM-YYYY"
                minDate="01-01-1900"
                maxDate="01-01-2019"
                confirmBtnText="Onayla"
                cancelBtnText="İptal"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                onDateChange={(date) => { this.setState({ work: date }) }}
              />
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ margin: 5, fontFamily: 'Poppins-Medium', fontSize: 16, color: '#111', textAlign: 'center' }}>
                  Profilinizi tamamlayarak <Text onPress={() => Linking.openURL('https://trambolin.co/gizlilik-politikasi/')} style={{ color: '#42c0ef' }}>Gizlilik Politikası</Text> ve <Text onPress={() => Linking.openURL('https://trambolin.co/trambolin-kullanici-sozlesmesi/')} style={{ color: '#42c0ef' }}>Kullanıcı Sözleşmesi</Text>'ni kabul ettiğinizi belirtmiş olursunuz.
            </Text>
              </View>
              <Text onPress={() => this.onSubmit()} style={{ marginBottom: 35, overflow: 'hidden', borderRadius: 20, color: '#fff', textAlign: 'center', fontSize: 20, fontFamily: 'Poppins', backgroundColor: '#42c0ef' }}>Tamamla</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )

  render() {
    if (this.state.submitProcess) {
      return (
        <View style={styles.loading}><ActivityIndicator size="large" color="#42c0ef" /></View>
      )
    }
    return (
      <this.renderView />
    );
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
    backgroundColor: '#f5f5f5',
    marginBottom: 10
  },
  input2: {
    borderRadius: 26,
    padding: 5,
    backgroundColor: '#f5f5f5',
    marginBottom: 10
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
});

const mapStateToProps = ({ auth }) => (
  {
    user: auth.user
  }
)

export default connect(mapStateToProps, { loadUser })(CompleteProfile);
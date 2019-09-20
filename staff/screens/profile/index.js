import React, { Component } from 'react';
import { Text, Image, View, ScrollView, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LastPurchaseItem } from '../../components/items/LastPurchaseItem';
import { DepartmentFriendItem } from '../../components/items/DepartmentFriendItem';
import { SocialMessageItem } from '../../components/items/SocialMessageItem';
import axios from 'axios';
import { logout } from '../../redux/actions';


class Profile extends Component {
  state = {
    activeScreen: 'profile',
    loginProcess: false,
    ticketText: '',
    msg: null,
    messages: [],
    coworkers: [],
    history: [],
    loading: false
  }

  static navigationOptions = ({ navigation }) => (
    {
      headerLeft: <Ionicons style={{ paddingLeft: 15 }} color='#222222' onPress={() => navigation.navigate('Keşfet')} name='ios-arrow-back' size={30} />
    }
  )

  componentDidMount() {
    this.loadMessages();
    this.loadPast();
    this.loadCoworkers();
  }

  submitTicket = async () => {
    if (this.state.ticketText === '') {
      this.setState({ msg: 'Boş bir mesaj göndermek istediğine emin misin?' })
      setTimeout(() => this.setState({ msg: null }), 2000);
      return;
    }
    this.setState({ loading: true });
    const body = JSON.stringify({
      message: this.state.ticketText
    });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    await axios.post('http://34.219.165.177:5000/api/message/supportTicket', body, config);
    this.setState({ ticketText: '', msg: 'En kısa zamanda sana Gerİ döneceğiz!', loading: false });
    setTimeout(() => this.setState({ msg: null }), 2000);
  }

  loadCoworkers = async () => {
    const body = JSON.stringify({
      department: this.props.user.department
    })
    const coworkers = await axios.post('http://34.219.165.177:5000/api/staff/getDepartmentFriends', body, { headers: { 'Content-Type': 'application/json' } });
    this.setState({ coworkers: coworkers.data });
  }

  loadPast = async () => {
    const purchases = await axios.get('http://34.219.165.177:5000/api/purchase/getPast');
    this.setState({ history: purchases.data });
  }

  loadMessages = async () => {
    const body = JSON.stringify({
      supervisor: this.props.user.supervisor
    });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const messages = await axios.post('http://34.219.165.177:5000/api/message/getDirect', body, config);
    this.setState({ messages: messages.data.messages ? messages.data.messages : [] });
  }

  logout = async () => {
    this.props.navigation.navigate('Login', { logout: true });
  }

  messagesView = (props) => {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => this.setState({ activeScreen: 'profile' })}>
          <View style={{
            justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
            shadowColor: '#000', backgroundColor: '#fff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5, shadowRadius: 2,
            elevation: 1, borderRadius: 10, flexDirection: 'row'
          }}>
            <TouchableWithoutFeedback onPress={() => this.setState({ activeScreen: 'profile' })} style={{ backgroundColor: '#fff', padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{
                textTransform: 'uppercase', paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium'
              }}>
                Gerİ Dön
            </Text>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
        <View style={{
          justifyContent: 'center', alignItems: 'center', marginTop: 10, marginLeft: 10, marginRight: 10, backgroundColor: '#fff', borderRadius: 10,
          shadowColor: '#000', backgroundColor: '#fff',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5, shadowRadius: 2,
          elevation: 1, borderRadius: 10
        }}><Text style={{ paddingLeft: 15, margin: 7, fontSize: 20, fontFamily: 'Poppins-Medium' }}>
            {this.state.messages.length == 0 ? 'HİÇ MESAJINIZ YOK' : 'Mesajlar'}
          </Text>
        </View>
        {this.state.messages.map((item, index) => {
          return (
            <SocialMessageItem key={index} receiver={item.receiverInfo} department={item.department} date={item.date} message={item.message} />
          )
        })}
      </ScrollView>
    )
  }

  supportView = (props) => {
    if (this.state.loading) return <View style={styles.loading}><ActivityIndicator size="large" color="#42c0ef" /></View>;
    else return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.textAreaContainer} >
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Çekinmeden yazın..."
            placeholderTextColor="grey"
            value={this.state.ticketText}
            numberOfLines={10}
            multiline={true}
            onChangeText={(text) => this.setState({ ticketText: text })}
          />
        </View>
        {this.state.msg && <View style={{
          justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
          shadowColor: '#000', backgroundColor: '#fff',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5, shadowRadius: 2,
          elevation: 1, borderRadius: 10, flexDirection: 'row'
        }}>
          <TouchableWithoutFeedback style={{ backgroundColor: '#fff', padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{
              textTransform: 'capitalize', paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium', color: '#42c0ef'
            }}>
              {this.state.msg}
            </Text>
          </TouchableWithoutFeedback>
        </View>}
        <TouchableWithoutFeedback onPress={() => this.submitTicket()}>
          <View style={{
            justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
            shadowColor: '#000', backgroundColor: '#fff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5, shadowRadius: 2,
            elevation: 1, borderRadius: 10, flexDirection: 'row'
          }}>
            <TouchableWithoutFeedback onPress={() => this.submitTicket()} style={{ backgroundColor: '#fff', padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{
                textTransform: 'uppercase', paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium'
              }}>
                Gönder
            </Text>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback><TouchableWithoutFeedback onPress={() => this.setState({ activeScreen: 'profile' })}>
          <View style={{
            justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
            shadowColor: '#000', backgroundColor: '#fff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5, shadowRadius: 2,
            elevation: 1, borderRadius: 10, flexDirection: 'row'
          }}>
            <TouchableWithoutFeedback onPress={() => this.setState({ activeScreen: 'profile' })} style={{ backgroundColor: '#fff', padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{
                textTransform: 'uppercase', paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium'
              }}>
                Gerİ dön
            </Text>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    )
  }

  historyView = (props) => {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => this.setState({ activeScreen: 'profile' })}>
          <View style={{
            justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
            shadowColor: '#000', backgroundColor: '#fff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5, shadowRadius: 2,
            elevation: 1, borderRadius: 10, flexDirection: 'row'
          }}>
            <TouchableWithoutFeedback onPress={() => this.setState({ activeScreen: 'profile' })} style={{ backgroundColor: '#fff', padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{
                textTransform: 'uppercase', paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium'
              }}>
                Gerİ dön
            </Text>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
        {this.state.history.map(item => <LastPurchaseItem key={item._id} brand={item.brand} content={item.content} code={item.code} date={item.date} />
        )}
      </ScrollView>
    )
  }

  departmentView = (props) => {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={() => this.setState({ activeScreen: 'profile' })}>
          <View style={{
            justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
            shadowColor: '#000', backgroundColor: '#fff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5, shadowRadius: 2,
            elevation: 1, borderRadius: 10, flexDirection: 'row'
          }}>
            <TouchableWithoutFeedback onPress={() => this.setState({ activeScreen: 'profile' })} style={{ padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{
                textTransform: 'uppercase', paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium'
              }}>
                Gerİ dön
            </Text>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
        {this.state.coworkers.map((item, index) => <DepartmentFriendItem key={index} user={item} />)}
      </ScrollView>
    )
  }

  profileView = (props) => {
    const { avatar, name, email, credits } = props.user;
    const lastURL = avatar[0] == 'h' ? avatar : 'http://' + avatar.slice(2, avatar.length);
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View style={{
            height: 150, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#fff',
            borderBottomColor: '#d9d9d9', borderBottomWidth: 1
          }}>
            <View style={{ flex: 1, margin: 15, borderRadius: 10, overflow: 'hidden' }}>
              <Image source={{ uri: lastURL }} style={{ height: '100%', width: '100%' }} />
            </View>
            <View style={{ flex: 2, justifyContent: 'space-between', alignItems: 'flex-start', marginLeft: 10 }}>
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, textTransform: 'capitalize', color: '#111' }}>{name}</Text>
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, textTransform: 'lowercase', color: '#d6d6d9' }}>{email}</Text>
              <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 18, textTransform: 'capitalize', color: '#111', marginBottom: 15 }}>{`Bakiye: ${credits}`}</Text>
              <Text onPress={() => this.props.navigation.navigate('EditProfile')} style={{ fontFamily: 'Poppins-Medium', fontSize: 12, backgroundColor: '#42c0ef', paddingTop: 2, paddingBottom: 2, paddingRight: 10, paddingLeft: 10, borderRadius: 12, color: '#fff', overflow: 'hidden' }}>Profili Düzenle</Text>
            </View>
          </View>
          <View style={{
            justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
            shadowColor: '#000', backgroundColor: '#fff',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5, shadowRadius: 2,
            elevation: 1, borderRadius: 10
          }}>
            <TouchableWithoutFeedback onPress={() => this.setState({ activeScreen: 'messages' })} style={{ padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons style={{ paddingLeft: 15, color: '#42c0ef' }} name='ios-mail' size={30} />
              <Text style={{ paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium', width: '80%' }}>
                Özel Mesajlar
            </Text>
              <Ionicons style={{ paddingRight: 15, color: '#42c0ef' }} name='ios-arrow-forward' size={30} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({ activeScreen: 'department' })} style={{ padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons style={{ paddingLeft: 15, color: '#42c0ef' }} name='group-work' size={30} />
              <Text style={{ paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium', width: '80%' }}>
                Departmanım
            </Text>
              <Ionicons style={{ paddingRight: 15, color: '#42c0ef' }} name='ios-arrow-forward' size={30} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({ activeScreen: 'history' })} style={{ padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              <Entypo style={{ paddingLeft: 15, color: '#42c0ef' }} name='shopping-bag' size={30} />
              <Text style={{ paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium', width: '80%' }}>
                Geçmiş Alışverişlerim
            </Text>
              <Ionicons style={{ paddingRight: 15, color: '#42c0ef' }} name='ios-arrow-forward' size={30} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({ activeScreen: 'support' })} style={{ padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome style={{ paddingLeft: 15, color: '#42c0ef' }} name='support' size={30} />
              <Text style={{ paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium', width: '80%' }}>
                Destek ve Geri Bildirim
            </Text>
              <Ionicons style={{ paddingRight: 15, color: '#42c0ef' }} name='ios-arrow-forward' size={30} />
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={() => this.logout()}>
            <View style={{
              justifyContent: 'center', alignItems: 'center', margin: 10, backgroundColor: '#fff', borderRadius: 10,
              shadowColor: '#000', backgroundColor: '#fff',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5, shadowRadius: 2,
              elevation: 1, borderRadius: 10
            }}>
              <TouchableWithoutFeedback onPress={() => this.logout()} style={{ padding: 10, width: '100%', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{
                  textTransform: 'uppercase', paddingLeft: 15, fontSize: 14, fontFamily: 'Poppins-Medium', color: 'red'
                }}>
                  Çıkış yap
            </Text>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        {this.state.loginProcess && <View style={styles.loading}><ActivityIndicator size="large" color="#42c0ef" /></View>}
      </View>
    )
  }

  render() {
    switch (this.state.activeScreen) {
      case 'messages':
        return (
          <this.messagesView />
        )
      case 'profile':
        return (
          <this.profileView user={this.props.user} />
        )
      case 'history':
        return (
          <this.historyView />
        )
      case 'support':
        return (
          <this.supportView />
        )
      case 'department':
        return (
          <this.departmentView />
        )
      default:
        return (
          <this.profileView user={this.props.user} />
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
  textAreaContainer: {
    borderColor: '#42c0ef',
    borderWidth: 1,
    margin: 10,
    borderRadius: 15
  },
  textArea: {
    height: 150,
    borderRadius: 10,
    margin: 10,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    justifyContent: "flex-start"
  }
});

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user
  };
}

export default connect(mapStateToProps, { logout })(Profile);
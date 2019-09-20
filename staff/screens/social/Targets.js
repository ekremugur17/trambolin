import React, { Component } from 'react';
import { ScrollView, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { SocialMessageItem } from '../../components/items/SocialMessageItem';
import axios from 'axios';

class Profile extends Component {
  state = {
    personal: [],
    department: [],
    loading: true
  }

  componentDidMount() {
    if (this.props.user.validation) this.loadMessages();
  }

  loadMessages = async () => {
    const body = JSON.stringify({
      supervisor: this.props.user.supervisor,
      department: this.props.user.department
    });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('http://34.219.165.177:5000/api/message/target/getPersonal', body, config);
    const res2 = await axios.post('http://34.219.165.177:5000/api/message/target/getDepartment', body, config);
    await this.setState({ loading: false, personel: res.data.messages ? res.data.messages : [], department: res2.data.messages ? res2.data.messages : [] });
  }

  SocialView = (props) => {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{
          justifyContent: 'center', alignItems: 'center', marginTop: 10, marginLeft: 10, marginRight: 10, backgroundColor: '#fff', borderRadius: 10,
          shadowColor: '#000', backgroundColor: '#fff',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5, shadowRadius: 2,
          elevation: 1, borderRadius: 10
        }}><Text style={{ paddingLeft: 15, margin: 7, fontSize: 20, fontFamily: 'Poppins-Medium' }}>
            Departman Hedefleri
        </Text>
        </View>
        {this.state.department.map((item, index) => {
          return (
            <SocialMessageItem key={index} receiver={item.receiverInfo} department={item.department} date={item.date} message={item.message} />
          )
        })}
        <View style={{
          justifyContent: 'center', alignItems: 'center', marginTop: 10, marginLeft: 10, marginRight: 10, backgroundColor: '#fff', borderRadius: 10,
          shadowColor: '#000', backgroundColor: '#fff',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5, shadowRadius: 2,
          elevation: 1, borderRadius: 10
        }}><Text style={{ paddingLeft: 15, margin: 7, fontSize: 20, fontFamily: 'Poppins-Medium' }}>
            Kişisel Hedefler
        </Text>
        </View>
        {this.state.personal.map((item, index) => {
          return (
            <SocialMessageItem key={index} receiver={item.receiverInfo} department={item.department} date={item.date} message={item.message} />
          )
        })}
      </ScrollView>
    )
  }

  render() {
    if (!this.state.loading) return (<this.SocialView />)
    else return (
      <View style={styles.loading}><ActivityIndicator size="large" color="#42c0ef" /></View>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user
  };
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
  }
})

export default connect(mapStateToProps)(Profile);
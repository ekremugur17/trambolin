import React, { Component } from 'react';
import { ScrollView, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { SocialMessageItem } from '../../components/items/SocialMessageItem';
import axios from 'axios';

class Profile extends Component {
  state = {
    messages: [],
    depMessages: [],
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
    const res = await axios.post('http://34.219.165.177:5000/api/message/getPublic', body, config);
    const res2 = await axios.post('http://34.219.165.177:5000/api/message/getDepartment', body, config);
    await this.setState({ loading: false, messages: res.data.messages ? res.data.messages : [], depMessages: res2.data.messages ? res2.data.messages : [] });
  }

  SocialView = (props) => {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {this.state.messages.reverse().map((item, index) => {
          return (
            <SocialMessageItem public={true} key={index} receiver={item.receiverInfo} department={item.department} date={item.date} message={item.message} />
          )
        })}
        {this.state.depMessages.reverse().map((item, index) => {
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
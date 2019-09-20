import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

export const DepartmentFriendItem = (props) => {
  const { user } = props;
  const lastURL = user.avatar[0] == 'h' ? user.avatar : 'http://' + user.avatar.slice(2, user.avatar.length);

  return (
    <View style={{
      alignItems: 'center', margin: 10, height: 150,
      shadowColor: '#000', backgroundColor: '#fff',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5, shadowRadius: 2,
      elevation: 1, borderRadius: 10, flexDirection: 'row'
    }}>
      <View style={{ flex: 4 }}>
        <View style={{ flex: 1, margin: 5, borderRadius: 10, overflow: 'hidden' }}>
          <Image source={{ uri: lastURL }} resizeMode='cover' style={{ flex: 1 }} />
        </View>
      </View>
      <View style={{ flex: 6, marginTop: 15, marginBottom: 15, marginLeft: 10, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: 'Poppins-Medium', textTransform: 'capitalize', fontSize: 14, color: '#787880' }}>{user.name}</Text>
        <Text style={{ fontFamily: 'Poppins-Medium', textTransform: 'uppercase', fontSize: 14, color: '#b6b6bb' }}>{user.department}</Text>
        <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#b6b6bb' }}>{user.email}</Text>
      </View>
    </View>
  )
}
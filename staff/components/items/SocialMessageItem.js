import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');
const avatarWidth = (3 * (width - 50)) / 10;

export const SocialMessageItem = (props) => {
  const { receiver, message, date } = props;
  const lastURL = receiver.avatar[0] == 'h' ? receiver.avatar : 'http://' + receiver.avatar.slice(2, receiver.avatar.length);

  return (
    <View style={{
      alignItems: 'center', marginHorizontal: 10, marginTop: 10,
      shadowColor: '#000', backgroundColor: '#fff',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5, shadowRadius: 2,
      elevation: 1, borderRadius: 10, flexDirection: 'row'
    }}>
      <View style={{ flex: 3 }}>
        <Image source={{ uri: lastURL }} resizeMode='cover' style={{ margin: 10, width: avatarWidth, height: avatarWidth, borderRadius: avatarWidth / 2 }} />
      </View>
      <View style={{ flex: 7, marginTop: 15, marginBottom: 15, marginLeft: 20 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontFamily: 'Poppins-Medium', textTransform: 'capitalize', fontSize: 14, color: '#787880' }}>{receiver.name}</Text>
            <Text style={{ fontFamily: 'Poppins-Medium', textTransform: 'uppercase', fontSize: 14, color: '#787880' }}>{receiver.department}</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#b6b6bb', marginRight: 10 }}>{getLastDate(date)}</Text>
            {props.public && <Icon size={30} name="public" color='#111' />}
          </View>
        </View>
        <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 15, flexWrap: 'wrap' }}>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14 }}>{message}</Text>
        </View>
      </View>
    </View>
  )
}

getLastDate = (date) => {
  const x = Date.now();
  const nowDate = new Date(x);
  const oldDate = new Date(date);
  const oldMonth = oldDate.getMonth();
  const newMonth = nowDate.getMonth();
  const oldDay = oldDate.getDate();
  const newDay = nowDate.getDate();
  const oldMin = oldDate.getMinutes();
  const newMin = nowDate.getMinutes();
  const oldHour = oldDate.getHours();
  const newHour = nowDate.getHours();

  const resMonth = newMonth - oldMonth;
  const resDay = newDay - oldDay;
  const resHour = newHour - oldHour;
  const resMin = newMin - oldMin;

  let str = '';
  if (resMonth > 0) str += `${resMonth} ay`;
  else if (resMonth == 0 && resDay > 0) str += `${resDay} gün`;
  else if (resDay == 0 && resHour > 0) str += `${resHour} saat`;
  else if (resHour == 0 && resMin > 0) str += `${resMin} dakika`;
  else str += 'Az'
  str += ' önce';
  return str;
}
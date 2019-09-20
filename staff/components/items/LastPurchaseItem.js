import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

export const LastPurchaseItem = (props) => {
  const { brand, content, code, date } = props;
  return (
    <View style={{
      alignItems: 'center', margin: 10, maxHeight: 150, minHeight: 100,
      shadowColor: '#000', backgroundColor: '#fff',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5, shadowRadius: 2,
      elevation: 1, borderRadius: 10, flexDirection: 'row'
    }}>
      <View style={{ flex: 5 }}>
        {brand && <View style={{ flex: 1, margin: 5, borderRadius: 10, overflow: 'hidden' }}>
          <Image source={{ uri: brand.images.banner }} resizeMode='contain' style={{ flex: 1 }} />
        </View>}
        {!brand && <View style={{ flex: 1, margin: 5, borderRadius: 10, overflow: 'hidden' }}>
          <Image source={{ uri: 'https://i.hizliresim.com/r0XYJz.png' }} resizeMode='contain' style={{ flex: 1 }} />
        </View>}
      </View>
      <View style={{ flex: 7, marginTop: 15, marginBottom: 15, marginLeft: 10 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontFamily: 'Poppins-Medium', textTransform: 'capitalize', fontSize: 14, color: '#787880' }}>{brand ? brand.brand : content}</Text>
          </View>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14, color: '#b6b6bb', marginRight: 10 }}>{getLastDate(date)}</Text>
        </View>
        <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 15, flexWrap: 'wrap' }}>
          <Text style={{ fontFamily: 'Poppins-Medium', fontSize: 14 }}>{code}</Text>
        </View>
      </View>
    </View>
  )
}

getLastDate = (date) => {
  const nowDate = new Date;
  const oldDate = new Date(date);
  const oldMonth = oldDate.getMonth();
  const newMonth = nowDate.getMonth();
  const oldDay = oldDate.getDay();
  const newDay = nowDate.getDay();
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
import React, { Component } from 'React';
import _ from 'lodash';
import { Item, Input, Icon, Button as NButton, Content, CardItem, Left, Body, Right, Card, Text as NText } from 'native-base';
import { Header, LabelText, Text } from 'components';
import { Image, StyleSheet, FlatList, View, ScrollView, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import commonStyle, { fontSizes } from 'common/themes/styles';
import { w, m, h } from 'common/helpers';
import Colors from 'common/themes/colors';
import images from 'images';
import ReactNativePickerModule from 'react-native-picker-module';

const getLabel = label => {
  const changedLabel = label.charAt(0).toUpperCase() + label.slice(1);

  if (changedLabel.indexOf('Name') === -1) {
    return changedLabel;
  }
  else if (changedLabel.indexOf('phone') !== -1) {
    return changedLabel + ' Number'
  }

  return changedLabel.slice(0, 4) + ' ' + changedLabel.slice(4);
}

const genders = [
  "Male",
  "Female"
];

export default class UserProfile extends Component {
  state = {
    gender: 0,
    userProfile: {
      fullName: 'Yevheniia Konstantynova',
      userName: 'ms.constant',
      about: 'No one likes to have teeth that are not bright and white. Teeth are a very important aspect for the overall appearance of a person. Looking good and appearing presentable is very important in today’s competitive world.',
      email: 'yevheniia@ux-energy.com',
      phone: '+1 (23) 456 78 90',
      gender: 'Female'
    }
  }

  goToBack = () => {
    this.props.navigation.goBack();
  }

  onCheckMsg = () => {
    this.props.navigation.navigate('MessagesScreen');
  }

  onChangeText = (name, text) => {
    const { userProfile } = this.state;
    userProfile[name] = text;
    this.setState({userProfile});
  }

  onSelectGender = gender => {
    const { userProfile } = this.state;
    userProfile['gender'] = gender;
    this.setState({userProfile});
  }

  onLogout = () => {
    this.props.navigation.navigate('Auth');
  }

  render() {
    const { userProfile } = this.state;

    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="position">
        <ScrollView showsVerticalScrollIndicator={false} >
          <Header 
            onLeftIconPress={() => {return}}
            leftIcon="magnifier"
            leftIconSize={{width: m(23), height: m(23)}}
            onRightIconPress={this.onCheckMsg}
            // leftIcon="back_arrow"
            title="Feed"
            rightIcon="message"
            badgeNumber={5}
          />
          <Image 
            source={images['cover_photo']}
            style={{
              width: w(376),
              height: h(200)
          }}/>
          <Image 
            source={images['user_avatar']}
            style={{
              width: m(50),
              height: m(50),
              position: 'absolute',
              alignSelf: 'center',
              top: h(220)
            }}
          />
          
          <View style={styles.container}>
            <Text
              text="Yevheniia Konstantynova"
              size={fontSizes.bigger}
              color={Colors.black.dark}
              semiBold
              style={{
                textAlign: 'center',
                marginTop: h(23)
              }}
            />
            <View style={{marginTop: h(20)}}>
              {_.map(['fullName', 'userName', 'about'], (item, key) => {
                return(
                  <LabelText
                    key={key} 
                    name={item}
                    label={getLabel(item)}
                    text={userProfile[item]}
                    placeholder="Please input your infomation..."
                    onChangeText={this.onChangeText}
                    style={{marginBottom: h(25)}}
                  />
                )
              })}
            </View>
            <TouchableOpacity onPress={() => this.onLogout()}>
              <Text 
                text="LOGOUT"
                semiBold
                style={{
                  letterSpacing: w(0.4),
                  marginBottom: h(34)
                }}
              />
            </TouchableOpacity>
            <Text 
              text="Personal Information"
              size={fontSizes.bigger}
              color={Colors.black.heavy}
              semiBold
              style={{letterSpacing: w(0.4)}}
            />
            <View style={{marginTop: h(20)}}>
              {_.map(['email', 'phone'], (item, key) => {
                return(
                  <LabelText
                    keyboardType={item === 'email' ? 'default' : 'numeric'}
                    key={key} 
                    name={item}
                    label={getLabel(item)}
                    text={userProfile[item]}
                    placeholder="Please input your infomation..."
                    onChangeText={this.onChangeText}
                    style={{marginBottom: h(25)}}
                  />
                )
              })}
            </View>
            <TouchableOpacity onPress={() => {this.pickerRef.show()}}>
              <LabelText 
                editable={false}
                onTouch={() => this.pickerRef.show()}
                name={'gender'}
                onChangeText={() => {return}}
                label={'Gender'}
                text={userProfile['gender']}
                placeholder="Please input your infomation..."
                dropdown
              />
            </TouchableOpacity>

            <ReactNativePickerModule
              pickerRef={e => this.pickerRef = e}
              value={this.state.selectedValue}
              title={"Select the Gender"}
              items={genders}
              onValueChange={index => this.onSelectGender(index)}/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  ...commonStyle,
});

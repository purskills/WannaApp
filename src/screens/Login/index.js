import React, { Component } from 'React';
import { View } from 'native-base';
import { Image, StyleSheet } from 'react-native';
import images from 'images';
import { w, m, h } from 'common/helpers';
import { connect } from 'react-redux';
import { Text, Button } from 'components';
import commonStyle, { fontSizes } from 'common/themes/styles';
import Colors from 'common/themes/colors';
import _ from 'lodash';

const termsDesText = [
  {text: 'Terms of Service', commnect: ', '},
  {text: 'Payments Terms of Service', commnect: ', '},
  {text: 'Privacy Policy', commnect: ', and '},
  {text: 'Nondiscrimination Policy', commnect: '.'}
];

export default class Login extends Component {

  onLoginWithInsta = () => {
    this.props.navigation.navigate('ChooseTypeScreen');
  }

  render() {
    const { logo } = images;
    
    return (
      <View style={[
          styles.container, 
          {marginTop: h(70)}]}
      >
        <Image
          source={logo}
          style={{
            alignSelf: 'center',
            width: m(64),
            height: m(64)
          }}
        /> 
        <Text 
          color={Colors.primary.base} 
          textAlign="center" 
          size={fontSizes.bigger} 
          text="WANNA SPLIT" 
          bold 
          style={{marginTop: h(20)}} 
        />
        <View style={{
            flexDirection: 'row', 
            marginTop: h(50)}}
        >
          <Text 
            color={Colors.primary.base} 
            size={fontSizes.extrem} 
            family="AmericanTypewriter" 
            text="Coffe" 
          />
          <View style={{
            borderBottomWidth: h(3),
            borderColor: Colors.primary.base}}
          >
            <Text 
              color={Colors.primary.base} 
              size={fontSizes.extrem} 
              family="AmericanTypewriter" 
              text="e" />
          </View>
          <Text  
            size={fontSizes.extrem} 
            text="'s" 
            medium 
            color={Colors.black.base} />
        </View>
        <Text 
          size={fontSizes.large} 
          text="Better Shared" 
          medium 
          color={Colors.black.base} 
        />
        <Button 
          size={fontSizes.medium} 
          height={m(56)}
          width='100%'
          backgroundColor={Colors.primary.base}
          borderColor={Colors.primary.base}
          semiBold 
          text="Continue with Instagram" 
          leftIcon="insta" 
          style={{marginTop: h(45)}}
          onPress={this.onLoginWithInsta} 
        />
        <Button 
          size={fontSizes.medium} 
          height={m(56)} 
          width='100%'
          semiBold 
          borderWidth={m(1)}
          text="See how it works" 
          color={Colors.primary.base} 
          style={{marginTop: h(15)}} 
        />
        <View style={{
            flexDirection: 'row', 
            marginTop: h(70)}}
        >
          <Text 
            text="By clicking Continue with Instagram, I agree to   " 
            style={{lineHeight: h(21)}} 
          > 
            {
              _.map(termsDesText, (item, key) => {
                return (
                  <Text key={key} >
                    <Text 
                      text={item.text} 
                      color={Colors.primary.light} 
                    />
                    <Text text={item.commnect} />
                  </Text>
                ) 
              })
            }
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: w(30)
  }
});
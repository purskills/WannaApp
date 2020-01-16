import React, { Component } from 'react';
import { Button as NButton, Text, View } from 'native-base';
import { w, h, m } from 'common/helpers';
import { Image } from 'react-native';
import images from 'images';
import Colors from 'common/themes/colors';

export default class Button extends Component {
  render() {
    const {
      text = "",
      leftIcon = "",
      size = m(14),
      backgroundColor = Colors.white.base,
      borderColor = '#DFDFE2',
      borderWidth = m(2),
      color = '#FFF',
      style = {},
      height,
      width,
      paddingHorizontal = 0,
      borderRadius = m(50),
      bold,
      onPress = () => {},
      fontFamily = this.props.semiBold ? 'Montserrat-SemiBold' : 'Montserrat' ,
      ...rest
    } = this.props;

    return(
      <NButton style={{
          backgroundColor,
          borderColor,
          width,
          height,
          borderWidth,
          borderRadius,
          justifyContent: 'center',
          ...style
        }}
        onPress={() => onPress()}
        {...rest}
      >
        <View style={{
            flexDirection: 'row', 
            alignItems: 'center',
            paddingHorizontal
          }}
        >
          {images[leftIcon] && (
            <Image source={images[leftIcon]} 
              style={{
                width: m(size),
                height: m(size),
                marginRight: w(5)
              }} 
            />
          )}
          <Text style={{
              color,
              fontSize: size,
              fontFamily,
              fontWeight: bold ? 'bold' : '400'
          }}>
            {text}
          </Text>
        </View>
      </NButton>
    )
  }
}
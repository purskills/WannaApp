import React, { Component } from 'React';
import { Text as NText } from 'native-base';
import { StyleSheet } from 'react-native';
import { w, m, h } from 'common/helpers';
import { fontSizes } from 'common/themes/styles';
import Colors from 'common/themes/colors';

export default class Text extends Component {
  render() {
    const {
      text = "",
      size = fontSizes.base,
      color = Colors.grey.base,
      family = this.props.semiBold ? 'Montserrat-SemiBold' : this.props.medium ? 'Montserrat-Medium' : 'Montserrat',
      textAlign = 'left',
      bold,
      style = {},
      children,
      ...rest
    } = this.props;

    return (
      <NText
        style={{
          fontSize: size,
          color,
          fontFamily: family,
          fontWeight: bold ? 'bold' : '400',
          textAlign,
          ...style
        }}
        {...rest}
        >
          {text}
          {children}
      </NText>
    )
  }
}

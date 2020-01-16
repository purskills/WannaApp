import React, { Component } from 'React';
import { Image } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import { View, Text } from 'react-native';
import Colors from 'common/themes/colors';
import { fontSizes } from 'common/themes/styles';
import { w, m, h } from 'common/helpers';
import images from 'images';

export default class Badge extends Component {
  render() {
    const { 
      count, 
      style, 
      size,
      type = 'text',
      color = Colors.white.base,
      borderColor = Colors.blue.base,
      backgroundColor = Colors.blue.base,
      contentContainerStyle
    } = this.props;

    return(
      // <View style={{
      //     flex: 1,
      //     flexDirection: 'row',
      //     alignItems: 'flex-end',
      //     justifyContent: 'flex-start',
      //     alignSelf: 'flex-start'
      //   }}
      // >
      <View style={contentContainerStyle}>
        <IconBadge
          BadgeElement={
              type === 'text' ?
                <Text style={{
                  color: color, 
                  fontSize: fontSizes.small, 
                  fontWeight: 'bold'
                }}>
                  {count}
                </Text>
              : <Image 
                  source={images['tick']}
                  style={{
                    marginBottom: h(3),
                    width: m(15),
                    height: m(15)
                  }}
                />
          }
          IconBadgeStyle={{
            borderWidth: 1,
            borderColor: borderColor,
            borderRadius: m(size) / 2,
            width: m(size),
            height: m(size),
            backgroundColor: backgroundColor,
            ...style
          }}
          Hidden={!count}
          />
      </View>
    )
  }
}
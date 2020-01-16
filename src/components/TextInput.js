import React, { Component} from 'React';
import images from 'images';
import { Image, TextInput as Input } from 'react-native';
import { View } from 'native-base';
import Colors from 'common/themes/colors';
import { fontSizes } from 'common/themes/styles';
import { w, h, m } from 'common/helpers';
import { TouchableOpacity } from 'react-native';

export default class TextInput extends Component {
  render() {
    const {
      leftIcon = "",
      leftIconSize = 0,
      leftIconPadding = 0,
      rightIcon = "",
      rightIconSize = 0,
      placeholder = "",
      text = "",
      style = {},
      placeholderColor = Colors.grey.lighter,
      borderNone
    } = this.props;
    return (
      <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: borderNone ? 0 : h(20),
          borderColor: Colors.grey.lightest,
          borderBottomWidth: borderNone ? 0 : m(1),
          ...style
        }}
      >
        <View style={{flexDirection: 'row', flex: 0.9}}>
          <Image 
            source={images[leftIcon]}
            style={{
              width: m(leftIconSize),
              height: m(leftIconSize),
              marginRight: w(leftIconPadding),
            }}
          />
          <Input 
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            style={{
              flex: 1,
              fontFamily: 'Montserrat',
              fontSize: fontSizes.base
            }}
          />
        </View>
        <View style={{flex: 0.1}}>
          <TouchableOpacity>
            <Image 
              source={images[rightIcon]}
              style={{
                width: m(rightIconSize),
                height: m(rightIconSize),
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
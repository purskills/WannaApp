import React, { Component} from 'React';
import { TextInput as Input, Image } from 'react-native';
import { View } from 'native-base';
import Colors from 'common/themes/colors';
import { fontSizes } from 'common/themes/styles';
import { w, h, m } from 'common/helpers';
import { Text } from 'components';
import images from 'images';

export default class LabelText extends Component {
  
  onChangeText = text => {
    const { name } = this.props;
    this.props.onChangeText(name, text);
  }

  render() {
    const {
      label = "",
      name = "",
      placeholder = "",
      text = "",
      size = fontSizes.base,
      style = {},
      color = Colors.black.heavy,
      dropdown,
      editable = true,
      onTouch = () => {},
      fontFamily = this.props.semiBold ? 'Montserrat-SemiBold' : 'Montserrat',
      placeholderColor = Colors.grey.lighter,
      keyboardType = 'default'
    } = this.props;

    return (
      <View style={{...style}}>
        <Text 
          text={label}
          color={Colors.grey.lighter}
          style={{marginBottom: h(14)}}
        />
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderColor: Colors.grey.lightest,
          borderBottomWidth: m(1),
          paddingBottom: h(5),
          alignItems: 'center'
        }}>
          <Input
            keyboardType={keyboardType}
            onTouchStart={() => onTouch()}
            editable={editable}
            value={text} 
            name={name}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            style={{
              fontFamily: fontFamily,
              fontSize: size,
              color: color,
            }}
            multiline={true}
            onChangeText={text => this.onChangeText(text)}
          />
          {dropdown &&
            <Image 
              source={images['down_arrow']}
              style={{
                width: m(10),
                height: m(6),
              }}
            />
          }
        </View>
      </View>
    )
  }
}
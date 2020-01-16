import React, { Component } from 'React';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Item, Input, Icon, Button as NButton, Content, CardItem, Left, Body, Right, Card, Text as NText, Col } from 'native-base';
import images from 'images';
import { w, m, h, isIphoneX } from 'common/helpers';
import { Svg, Ellipse, Circle, Path, G } from 'react-native-svg';
import { Text, Button } from 'components';
import Colors from 'common/themes/colors';
import { fontSizes } from 'common/themes/styles';
import _ from 'lodash';
import colors from '../common/themes/colors';
const { width, height } = Dimensions.get('window');

export default class SearchBox extends Component {
  state = {
    text: '',
    focus: false
  }

  onFocusSearchBox = () => {
    this.setState({focus: true});
  }

  render() {
    const { 
      text,
      focus 
    } = this.state;

    return (
    
      /* {text === '' && !focus ? 
        (
          <TouchableWithoutFeedback onPress={this.onFocusSearchBox}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.grey.lightest,
                height: m(32),
                borderRadius: 5
              }}
            >
              <Image 
                source={images['search']}
                style={{
                  width: m(10),
                  height: m(10),
                  marginRight: w(4)
                }}
              />
              <Text 
                text="Search"
                size={fontSizes.small}
                color={Colors.grey.medium}
              />
            </View>
          </TouchableWithoutFeedback>
        ) : */
        <>
         
          <TextInput 
            style={{
              backgroundColor: Colors.grey.lightest,
              height: m(32),
              borderRadius: 5,
              paddingHorizontal: w(5)
            }}
            onFocus={this.onFocusSearchBox}
          />
           {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: m(78),
              left: width / 2 - 25
            }}
          >
            <Image 
              source={images['search']}
              style={{
                width: m(10),
                height: m(10),
                marginRight: w(4)
              }}
            />
            <Text 
              text="Search"
              size={fontSizes.small}
              color={Colors.grey.medium}
            />
          </View> */}
        </>
    )
  }
}
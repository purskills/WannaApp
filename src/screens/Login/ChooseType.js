import React, { Component } from 'React';
import { Header, Text, Button } from 'components';
import { View, Button as NButton, Icon } from 'native-base';
import { Image, StyleSheet, AsyncStorage } from 'react-native';
// import { AsyncStorage } from '@react-native-community/async-storage';
import commonStyle, { fontSizes } from 'common/themes/styles';
import { w, m, h } from 'common/helpers';
import Colors from 'common/themes/colors';
import _ from 'lodash';
import images from 'images';

export default class ChooseType extends Component {
    state = {
      type: "Person"
    }

    goToBack = () => {
      this.props.navigation.goBack();
    }

    onChooseType = type => {
      this.setState({ type }); 
    }

    onSubmitType = async () => {
      const { type } = this.state;
      try {
        await AsyncStorage.setItem('type', type);
        console.log('setted item');
      } catch (error) {
        // Error saving data
        console.log('error', error);
      }
      
      this.props.navigation.navigate('ChooseInterestsScreen');
    }

    render() {
      const { type } = this.state;

      return (
        <View style={{flex: 1}}>
          <Header 
            onLeftIconPress={this.goToBack}
            onRightIconPress={this.onSubmitType}
            leftIcon="back_arrow"
            title="Person or Brand"
            rightText="Skip" 
          />
         
          <View style={[
            styles.container, 
            {marginTop: h(23)}]}
          >
            <Text 
              text="Are you a person or brand?"
              size={fontSizes.bigger}
              semiBold
              color={Colors.black.dark}
            />
            <Text 
              text="Brands will have slightly different functionality  in post composition."
              color={Colors.grey.medium}
              style={{marginTop: h(13)}}
            />
            <View style={{flexDirection: 'row', marginTop: h(17)}}>
              {_.map(['Person', 'Brand'], (item, key) => {
                  return (
                    <Button 
                      key={key}
                      text={item}
                      paddingHorizontal={w(31)}
                      height={m(40)}
                      onPress={() => this.onChooseType(item)}
                      style={{marginRight: w(20)}}
                      {...type === item ? styles.active : styles.unactive}
                    />
              )})}
            </View>
          </View>
          <NButton   
              style={{
                  position: 'absolute',
                  right: w(30),
                  bottom: h(28),
                  borderRadius : m(50),
                  width : m(56),
                  height : m(56),
                  justifyContent: 'center',
                  alignItems: 'center'
              }}
              onPress={this.onSubmitType}
          >
            <Image 
              source={images['forward_arrow']}
              style={{
                width: m(26),
                height: m(19)
              }}
            />
        </NButton>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  ...commonStyle,
  active: {
    color: Colors.primary.base,
    borderColor: Colors.primary.light,
    backgroundColor: Colors.primary.lighter
  },
  unactive: {
    color: Colors.grey.lighter
  }
})
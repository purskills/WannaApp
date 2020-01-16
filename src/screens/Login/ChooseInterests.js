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

export default class ChooseInterests extends Component {
    state = {
      type: "Person",
      interests: [
        [
          {name: 'Fitness', checked: false},
          {name: 'Beauty', checked: false},
          {name: 'Cars', checked: false}
        ],
        [
          {name: 'Fashion', checked: false},
          {name: 'Gadgets', checked: false}
        ],
        [
          {name: 'Food', checked: false},
          {name: 'Sport', checked: false},
          {name: 'Travel', checked: false}
        ],
        [
          {name: 'Education', checked: false},
          {name: 'Media', checked: false}
        ]
      ]
    }

    goToBack = () => {
      this.props.navigation.goBack();
    }

    onChooseInterests = interestName => {
      _.map(this.state.interests, interest => {
          let result = _.find(interest, { name: interestName });

          if (result) {
            result.checked = !result.checked;
            this.forceUpdate()
          }
      })
    }

    onSubmitInterests = async () => {
      let screen = '';
      screen = await AsyncStorage.getItem('type') === 'Person' ? 'FollowPeopleScreen' : 'FollowBrandsScreen';
      this.props.navigation.navigate(screen);
    }

    render() {
      const { type, interests } = this.state;
      return (
        <View style={{flex: 1}}>
          <Header 
            onLeftIconPress={this.goToBack}
            onRightIconPress={this.onSubmitInterests}
            leftIcon="back_arrow"
            title="Interests"
            rightText="Skip" 
          />
         
          <View style={[
            styles.container, 
            {marginTop: h(23)}]}
          >
            <Text 
              text="What interests you?"
              size={fontSizes.bigger}
              semiBold
              color={Colors.black.dark}
            />
            <Text 
              text="Choose a couple things you’d like follow that people are splitting nearby."
              color={Colors.grey.medium}
              style={{marginTop: h(13)}}
            />
            <View style={{marginTop: h(9)}}>
              {_.map(interests, (interest, index) => {
                  return (
                    <View
                        key={index}
                        style={{
                        flexDirection: 'row', 
                        marginTop: h(8),
                        marginLeft: index % 2 === 1 ? w(16) : 0  
                      }}
                    >
                      {_.map(interest, (item, key) => {
                          return (
                            <Button 
                              key={key}
                              text={item.name}
                              paddingHorizontal={w(29)}
                              height={m(40)}
                              onPress={() => this.onChooseInterests(item.name)}
                              style={{marginRight: w(8)}}
                              {...item.checked === true ? styles.active : styles.unactive}
                            />
                        )})}
                    </View>
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
              onPress={this.onSubmitInterests}
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
    borderWidth: m(2),
    backgroundColor: Colors.primary.lighter
  },
  unactive: {
    borderWidth: m(2),
    color: Colors.grey.lighter
  }
})
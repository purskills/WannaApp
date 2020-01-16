import React, { Component } from 'React';
import _ from 'lodash';
import { Item, Input, Icon, Button as NButton, Content } from 'native-base';
import { Header, TextInput, Text, Button } from 'components';
import { Image, StyleSheet, FlatList, View, ScrollView } from 'react-native';
import commonStyle, { fontSizes } from 'common/themes/styles';
import { w, m, h } from 'common/helpers';
import Colors from 'common/themes/colors';
import images from 'images';

class BrandList extends Component {
  render() {
    const {
      id,
      image,
      name,
      userName,
      follow
    } = this.props.brandInfo;

    return (
      <View style={{
          flex: 1,
          flexDirection: 'row',
          height: m(56),
          marginTop: h(16),
          alignItems: 'center'
        }}
      >
        <View style={{flex: 0.7, flexDirection: 'row'}}>
          <Image
            source={images[image]}
            style={{
              width: m(56),
              height: m(56),
              marginRight: w(16)
            }}
          />
          <View style={{justifyContent: 'center'}}>
            <Text 
              text={name}
              color={Colors.grey.medium}
            />
            <Text 
              text={userName}
              size={fontSizes.small}
              color={Colors.grey.lighter}
            />
          </View>
        </View>
        <View style={{flex: 0.3}}>
          <Button 
            text="Follow"
            height={m(40)}
            width="100%"
            onPress={() => this.props.onFollow(id)}
            {...follow === true ? styles.active : styles.unactive}
          />
        </View>
      </View>
    )
  }
}

export default class FollowBrands extends Component {

  state = {
    brands: [
      {id: 1, image: 'cannon', name: 'Cannon', userName: 'canon_inc', follow: false},
      {id: 2, image: 'hm', name: 'hm', userName: 'H&M', follow: false},
      {id: 3, image: 'gucci', name: 'Gucci', userName: 'gucciinternational', follow: false},
      {id: 4, image: 'timerland', name: 'Timberland', userName: 'timberlandusa', follow: false},
      {id: 5, image: 'jimmy', name: 'Jimmy Choo', userName: 'iwantchoo', follow: false},
      {id: 6, image: 'ferrari', name: 'ferrari', userName: 'ferrariit', follow: false},
      {id: 7, image: 'mac', name: 'MAC', userName: 'm.a.c.', follow: false}
    ]
  }

  goToBack = () => {
    this.props.navigation.goBack();
  }

  onFollowBrand = selectedId => {
    const { brands } = this.state;
    const index = _.findIndex(brands, {id: selectedId});
    brands[index].follow = !brands[index].follow;
    this.setState({ brands });
  }
  _renderItem = brand => {
    return (
      <BrandList
        onFollow={this.onFollowBrand}
        brandInfo={brand.item}
      />
    )
  }

  onSubmitType = () => {
    this.props.navigation.navigate('Main');
  }

  render() {
    const { brands } = this.state;

    return(
      <View style={{flex: 1}}>
        <Header 
          onLeftIconPress={this.goToBack}
          onRightIconPress={this.onSubmitType}
          leftIcon="back_arrow"
          title="Follow Brands"
          rightText="Skip" 
        />
          <View style={[
            styles.container,
            {marginTop: h(26)}
          ]}
          >
            <TextInput 
                leftIcon="magnifier"
                leftIconSize={18}
                leftIconPadding={14}
                placeholder="Type to search brands"
            />
            <FlatList
              data={brands}
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString() }
              renderItem={this._renderItem}
            />
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
    borderWidth: m(2),
    backgroundColor: Colors.primary.lighter
  },
  unactive: {
    borderWidth: m(2),
    color: Colors.grey.lighter
  }
})
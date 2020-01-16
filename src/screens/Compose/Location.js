import React, { Component } from 'React';
import _ from 'lodash';
import { Item, Input, Icon, Button as NButton, Content, CardItem, Left, Body, Right, Card, Text as NText, Col } from 'native-base';
import { Header, Text, SearchBox, FeedCard, Badge } from 'components';
import { Image, StyleSheet, FlatList, View, ScrollView, Dimensions, TouchableOpacity, TextInput, Picker } from 'react-native';
import commonStyle, { fontSizes } from 'common/themes/styles';
import { w, m, h } from 'common/helpers';
import Colors from 'common/themes/colors';
import images from 'images';

const { width: screenWidth } = Dimensions.get('window');

class LocationList extends Component {
  render() {
    const { location } = this.props;

    return (
      <TouchableOpacity onPress={() => this.props.selectLocation(location.id)}>
        <View 
          style={{
            justifyContent: 'center',
            paddingVertical: h(10) 
        }}>
          <Text
            text={location.place}
            color={Colors.grey.medium}
            style={{marginBottom: h(5)}}
          />
          <Text
            text={location.city}
            color={Colors.grey.lighter}
            size={fontSizes.small}
          />
        </View>
      </TouchableOpacity>
    )
  }
}

export default class Invite extends Component {
  state = {
    locations: [
      {id: 1, place: 'New York City, USA', city: 'New York'},
      {id: 2, place: 'New York', city: 'New York City'},
      {id: 3, place: 'New York, Florida', city: 'New York'},
      {id: 4, place: 'Maxim Gorky Park', city: 'Kharkov'},
      {id: 5, place: 'East New York, Brooklyn', city: 'Brooklyn'},
      {id: 6, place: 'New City, New York', city: 'New city'}
    ],
    tickAll: false,
    showCompleteButton: false
  }
  _renderItem = location => {
    return (
      <LocationList 
        location={location.item}
        selectLocation={this.onSelectLocation}
      />
    ) 
  }

  onSelectLocation = id => {
    console.log('id', id);
    this.props.navigation.navigate('ComposeScreen');
  }

  goToBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { 
      locations
    } = this.state;
  
    return (
      <View style={[styles.container, {flex: 1}]}>
        <View style={{
          height: m(50),
          marginTop: h(20),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <TouchableOpacity 
            style={{flex: 0.2}}
            onPress={this.goToBack}
          >
            <Image 
              source={images['select_location']}
              style={{
                width: m(20),
                height: m(20)
              }}
            />
          </TouchableOpacity>
          <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
            <Text 
              text="Locations"
              size={fontSizes.big}
              color={Colors.black.base}
            />
          </View>
          <TouchableOpacity 
            style={{
              flex: 0.2, 
              alignItems: 'flex-end'
            }}
            onPress={this.goToBack}  
          >
            <Text 
              text="Cancel"
              color={Colors.grey.medium}
            />
          </TouchableOpacity>
        </View>
        <SearchBox />
        <FlatList 
          data={locations}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...commonStyle
});
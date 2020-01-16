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

class ListOfPeople extends Component {
  render() {
    const { person } = this.props;

    return (
      <View 
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: h(13) 
      }}>
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Image 
            source={images[person.image]}
            style={{
              width: m(48),
              height: m(48)
            }}
          />
          <Text
            text={person.name}
            color={Colors.grey.medium}
            style={{marginLeft: w(16)}}
          />
        </View>
        <TouchableOpacity onPress={() => this.props.tickPerson(person.id)}>
          <Image 
              source={person.ticked ? images['option_ticked'] : images['option_unticked']}
              style={{
                width: m(24),
                height: m(24)
              }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default class Invite extends Component {
  state = {
    people: [
      {id: 1, image: 'inv_brown', name: 'a_smith', ticked: false},
      {id: 2, image: 'inv_david', name: 'olivia178', ticked: false},
      {id: 3, image: 'inv_megan', name: 'megan_2892', ticked: false},
      {id: 4, image: 'inv_olivial', name: 'julia_brown11', ticked: false},
      {id: 5, image: 'inv_peter', name: 'peter_7888', ticked: false},
      {id: 6, image: 'inv_smith', name: 'cooper_david002', ticked: false}
    ],
    tickAll: false,
    showCompleteButton: false
  }
  _renderItem = person => {
    return (
      <ListOfPeople 
        person={person.item}
        tickPerson={this.onTickPerson} 
      />
    ) 
  }

  onInviteAll = () => {
    const { people, tickAll } = this.state;

    _.map(people, (person, key) => {
      return person.ticked = !tickAll;
    });

    this.forceUpdate();
    this.setState(prevState => ({
      tickAll: !prevState.tickAll,
      showCompleteButton: prevState.tickAll === false
    }));
  }

  onTickPerson = id => {
    const { people } = this.state;
    const index = _.findIndex(people, {id: id});
    people[index].ticked = !people[index].ticked;
    this.setState({ people }, () => {
      this.setState({showCompleteButton: _.findIndex(people, {ticked: true}) !== -1})
    });
  }

  goToBack = () => {
    this.props.navigation.goBack();
  }

  onCompleteInvite = () => {
    this.props.navigation.navigate('ComposeScreen');
  }

  render() {
    const { 
      people, 
      tickAll,
      showCompleteButton 
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
              source={images['back_arrow_ios']}
              style={{
                width: m(7),
                height: m(13)
              }}
            />
          </TouchableOpacity>
          <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
            <Text 
              text="Invite"
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
        <View 
          style={{
            flexDirection: 'row', 
            justifyContent: 'space-between',
            borderBottomWidth: 1,
            borderColor: Colors.grey.lightest,
            paddingVertical: h(25),
            marginBottom: h(20)
        }}>
          <Text 
            text="Invite everyone"
            color={Colors.primary.base}
            size={fontSizes.bigger}
            semiBold
          />
          <TouchableOpacity onPress={this.onInviteAll}>
            <Image
              source={tickAll ? images['option_ticked'] : images['option_unticked']}
              style={{
                width: m(24),
                height: m(24)
              }}
            />
          </TouchableOpacity>
        </View>
        <FlatList 
          data={people}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={this._renderItem}
        />
        {showCompleteButton && (
          <NButton
            style={{
              position: 'absolute',
              bottom: 0,
              borderRadius: 0,
              height: m(55),
              width: screenWidth,
              justifyContent: 'center'
            }}
            onPress={this.onCompleteInvite}
          >
            <Text 
              text="Done"
              size={fontSizes.bigger}
              color={Colors.white.base}
              semiBold
            />
          </NButton>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...commonStyle
});
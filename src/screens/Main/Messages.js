import React, { Component } from 'React';
import { FlatList, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Header, Text, TextInput, Badge } from 'components';
import commonStyle, { fontSizes } from 'common/themes/styles';
import { w, m, h } from 'common/helpers';
import Colors from 'common/themes/colors';
import images from 'images';
import { Container } from 'native-base';

const MsgList = props => {
  return (
    <View style={{
          borderBottomWidth: 1,
          borderColor: Colors.grey.lightest,
          paddingVertical: h(16),
          backgroundColor: props.message.unReadMsg ? Colors.grey.extremlight : Colors.white.base
        }}
      >
      <View style={{
          marginHorizontal: w(15),
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <View style={{
            flex: 0.8,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Image 
            source={images[props.message.avatar]}
            style={{
              width: m(48),
              height: m(48),
              marginRight: w(7)
            }}
          />
          <View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingBottom: h(6)
              }}
            > 
              <Text 
                text={props.message.name}
                color={Colors.grey.medium}
                style={{marginRight: w(30)}}
              />
              <Badge 
                count={props.message.unReadMsg}
                size={19}
              />
            </View>
            <Text 
              text={props.message.briefMsg}
            />
          </View>
        </View>
        <View style={{
            flex: 0.2, 
            alignItems: 'flex-end'
          }}
        >
          <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: h(6)
            }}
          >
            <Image
              source={images['clock_small']}
              style={{
                width: m(10),
                height: m(11),
                marginRight: w(10)
              }}
            />
            <Text 
              text={props.message.activeTime}
              size={fontSizes.small}
              color={props.message.activeStatus === true ? Colors.grey.medium : Colors.grey.lighter}
              style={{textTransform: 'uppercase'}}
            />
          </View>
          <Text
            text={props.message.lastSeenTime}
            size={fontSizes.small}
            color={Colors.grey.lightest}
          />
        </View>
      </View>
    </View>
  )
}

export default class Messages extends Component {
  state = {
    messages: [
      { 
        id: 1,
        avatar: "msg_avatar1",
        name: "John Stevenson Jr.",
        briefMsg: "Love the refresh and I'm pret…",
        activeTime: "10:15 Min",
        lastSeenTime: "9:27 AM",
        activeStatus: true,
        unReadMsg: 3
      },
      { 
        id: 2,
        avatar: "msg_avatar2",
        name: "Karl Morrison",
        briefMsg: "Thrill Friends And Family…",
        activeTime: "1 day",
        lastSeenTime: "A day ago",
        activeStatus: true
      },
      { 
        id: 3,
        avatar: "msg_avatar3",
        name: "Elsie Figueroa",
        briefMsg: "Love the refresh and I'm pret…",
        activeTime: "Over",
        lastSeenTime: "27 May",
        activeStatus: false
      },
      { 
        id: 4,
        avatar: "msg_avatar4",
        name: "Sadie Curry",
        briefMsg: "Thrill Friends And Family…",
        activeTime: "Over",
        lastSeenTime: "14 May",
        activeStatus: false
      },
      { 
        id: 5,
        avatar: "msg_avatar5",
        name: "Rosetta Walton",
        briefMsg: "Location sent",
        activeTime: "Over",
        lastSeenTime: "26 Apr",
        activeStatus: false
      }
    ]
  }

  onAddMsg = () => {

  }

  onPressMessage = () => {
    this.props.navigation.navigate('ChatRoomScreen');
  }

  goToBack = () => {
    this.props.navigation.goBack();
  }

  _renderItem = message => {
    return (
      <TouchableOpacity onPress={() => this.onPressMessage()}>
        <MsgList message={message.item} />
      </TouchableOpacity>
      
    ) 
  }

  render() {
    const { messages } = this.state;

    return (
      <View style={{flex: 1}}>
        <Header 
          onLeftIconPress={this.goToBack}
          onRightIconPress={this.onAddMsg}
          leftIcon="back_arrow"
          title="Messages"
          rightIcon="add"
          rightIconSize={{
            width: m(30),
            height: m(30)
          }}
        />
        <FlatList
          data={messages}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={this._renderItem}
        />
      </View>
    )
  }
}
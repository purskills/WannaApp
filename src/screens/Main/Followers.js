import React, { Component } from 'React';
import _ from 'lodash';
import { Item, Input, Icon, Button as NButton, Content } from 'native-base';
import { Header, TextInput, Text, Button } from 'components';
import { Image, StyleSheet, FlatList, View, ScrollView } from 'react-native';
import commonStyle, { fontSizes } from 'common/themes/styles';
import { w, m, h } from 'common/helpers';
import Colors from 'common/themes/colors';
import images from 'images';

class FriendList extends Component {
  render() {
    const {
      id,
      image,
      name,
      userName,
      follow
    } = this.props.friendInfo;

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

export default class Followers extends Component {

  state = {
    friends: [
      {id: 1, image: 'grace', name: 'Grace Morrison', userName: 'morrison_grace', follow: false},
      {id: 2, image: 'sarah', name: 'Sarah McGuire', userName: 'sarah_sarah', follow: false},
      {id: 3, image: 'chad', name: 'Chad Patrick', userName: 'patrickstylishone', follow: false},
      {id: 4, image: 'wesley', name: 'Wesley Yates', userName: 'wesleyyaaa', follow: false},
      {id: 5, image: 'marie', name: 'Marie Crawford', userName: 'ms.crawford', follow: false},
      {id: 6, image: 'ruth', name: 'Ruth Tate', userName: 'ruthtate', follow: false}
    ]
  }

  goToBack = () => {
    this.props.navigation.goBack();
  }

  onFollowFriend = selectedId => {
    const { friends } = this.state;
    const index = _.findIndex(friends, {id: selectedId});
    friends[index].follow = !friends[index].follow;
    this.setState({ friends });
  }

  _renderItem = friend => {
    return (
      <FriendList
        onFollow={this.onFollowFriend}
        friendInfo={friend.item}
      />
    )
  }

  onSubmitType = () => {
    this.props.navigation.navigate('Main');
  }

  render() {
    const { friends } = this.state;

    return(
      <View style={{flex: 1}}>
        <Header 
          onLeftIconPress={this.goToBack}
          leftIcon="back_arrow"
          title="Follow Friends"
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
                placeholder="Type to search friends"
            />
            <FlatList
              data={friends}
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString() }
              renderItem={this._renderItem}
            />
          </View>
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
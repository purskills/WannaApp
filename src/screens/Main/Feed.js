import React, { Component } from 'React';
import _ from 'lodash';
import { Item, Input, Icon, Button as NButton, Content, CardItem, Left, Body, Right, Card, Text as NText } from 'native-base';
import { Header, TextInput, Text, Button, FeedCard, Badge } from 'components';
import { Image, StyleSheet, FlatList, View, ScrollView, Dimensions } from 'react-native';
import commonStyle, { fontSizes } from 'common/themes/styles';
import { w, m, h } from 'common/helpers';
import Colors from 'common/themes/colors';

const { width, height } = Dimensions.get('window');

export default class Feed extends Component {

  state = {
    feeds: [
      {
        splitImage: "feed_coffee",
        ownerAvatar: "split_owner",
        ownerName: "John Stevenson Jr.",
        cost: "$5",
        numberOfPeople: " * 2 People",
        splitTitle: "Let's share a coffee",
        splitType: "Person",
        splitComment: "Just saw #CK has sale for 75%, and I’m going  to use it! #WannaSplit ? #calvinklein",
        splitStatus: 'active',
        time: "10:15 min"
      },
      {
        splitImage: "feed_brand",
        ownerAvatar: "split_owner_brand",
        ownerBrandAvatar: "brand_CK",
        ownerName: "Mark Greer",
        brandName: 'CalvinKlein',
        cost: "$0.5",
        numberOfPeople: " * 1k People",
        splitTitle: "Let’s share Calvin Klein sales!",
        splitType: "Brand",
        splitComment: "Just saw #CK has sale for 75%, and I’m going  to use it! #WannaSplit ? #calvinklein",
        splitStatus: 'active',
        time: "7 days"
      }
    ]
  }

  goToBack = () => {
    this.props.navigation.goBack();
  }

  onCheckMsg = () => {
    this.props.navigation.navigate('MessagesScreen');
  }

  onPressDescIcon = iconName => {
    if (iconName === 'comment') {
      this.props.navigation.navigate('CommentsScreen');
    }
  }

  onSplit = splitType => {
    this.props.navigation.navigate('ChatRoomScreen');
  }

  onPressAvatar = splitType => {
    let nextScreen = '';
    nextScreen = (splitType === 'Person') ? 'UserFollowScreen' : 'BrandFollowScreen';
    this.props.navigation.navigate(nextScreen);
  }

  render() {
    const { feeds } = this.state;

    return(
      <View style={{flex: 1}}>
        <Header 
          onLeftIconPress={this.goToBack}
          onRightIconPress={this.onCheckMsg}
          leftIcon="magnifier"
          leftIconSize={{width: m(23), height: m(23)}}
          title="Feed"
          rightIcon="message"
          badgeNumber={5}
        />
          <ScrollView style={[
            styles.container,
            {marginTop: h(26)}
            ]}
            showsVerticalScrollIndicator={false}
          > 
          {
            _.map(feeds, (feed, key) => {
              return (
                <FeedCard 
                  key={key}
                  onPressDescIcon={this.onPressDescIcon}
                  splitImage={feed.splitImage}
                  ownerAvatar={feed.ownerAvatar}
                  ownerBrandAvatar={feed.ownerBrandAvatar}
                  ownerName={feed.ownerName}
                  brandName={feed.brandName}
                  cost={feed.cost}
                  numberOfPeople={feed.numberOfPeople}
                  splitTitle={feed.splitTitle}
                  splitType={feed.splitType}
                  splitComment={feed.splitComment}
                  splitStatus={feed.splitStatus}
                  time={feed.time}
                  onPressSplit={this.onSplit}
                  onPressAvatar={this.onPressAvatar}
                />
              )
            })
          }
          </ScrollView>
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
  },
  halfCircle: {
    position: 'absolute',
    top: 30,
    left: (width - 30) / 2 - 35,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 0
  },
  cardStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  }
})
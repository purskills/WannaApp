import React, { Component } from 'React';
import { FlatList, View, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Header, Text, TextInput } from 'components';
import commonStyle, { fontSizes } from 'common/themes/styles';
import { w, m, h } from 'common/helpers';
import Colors from 'common/themes/colors';
import images from 'images';
import { Container } from 'native-base';

const CommentList = props => {

  return (
    <View style={{
        borderBottomWidth: 1,
        borderColor: Colors.grey.lightest,
        paddingBottom: h(12),
        marginBottom: h(12)
      }}
    >
      <View style={{
        paddingLeft: w(15),
        paddingRight: w(15),
      }}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{
            flexDirection: 'row', 
            alignItems: 'center'
            }}
          >
            <Image
              source={images[props.comment.avatar]}
              style={{
                width: m(32),
                height: m(32)
              }}
            />
            <Text
              text={props.comment.name}
              color={Colors.grey.dark}
              style={{
                marginLeft: w(8)
              }}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              text={props.comment.cost}
              color={Colors.primary.base}
              medium
            />
            <Text
              text={props.comment.numberOfPeople}
              color={Colors.grey.dark}
              medium
            />
          </View>
        </View>
        {props.comment.splitTitle && (
          <Text 
            text={props.comment.splitTitle}
            color={Colors.grey.dark}
            size={fontSizes.medium}
            style={{marginTop: h(9)}}
            medium
          />
        )}
        <Text 
          text={props.comment.comment}
          color={Colors.grey.dark}
          style={{marginTop: h(9)}}
        />
        <Text 
          text={props.comment.time}
          size={fontSizes.smallest}
          color={Colors.grey.lighter}
          style={{marginTop: h(5)}}
        />
      </View>
    </View>
  )
}

export default class Comments extends Component {
  state = {
    comments: [
      {
        id: 1,
        avatar: 'split_owner',
        name: 'John Stevenson Jr.',
        cost: '-$10',
        numberOfPeople: ' / 2 People',
        splitTitle: 'Let’s share a coffee',
        comment: 'Just saw #Starbucks has a 2 for 1 deal, I’m around for 10 mins. #WannaSplit ? #coffee',
        time: '23 min'
      },
      {
        id: 2,
        avatar: 'alex',
        name: 'Alexander Walton',
        comment: 'Heey, great idea, man. I really don’t get an idea why do they make such proposals! But now I think it’s great!',
        time: '12 min'
      }
    ]
  }

  goToBack = () => {
    this.props.navigation.goBack();
  }

  onCheckMsg = () => {
    this.props.navigation.navigate('MessagesScreen');
  }

  _renderItem = comment => {
    return <CommentList comment={comment.item} />
  }

  render() {
    const { comments } = this.state;

    return(
      <Container>
        <View style={{flex: 1}}>
          <Header 
            onLeftIconPress={this.goToBack}
            onRightIconPress={this.onCheckMsg}
            leftIcon="back_arrow"
            title="Comments"
            rightIcon="message"
            badgeNumber={5}
          />
          <ScrollView 
            style={{marginTop: h(26)}}
            showsVerticalScrollIndicator={false}
          >
            <FlatList
              data={comments}
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString() }
              renderItem={this._renderItem}
            /> 
          </ScrollView>
        </View>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={ 0 } contentContainerStyle={{ display: 'none' }}>
          <TextInput 
            leftIcon="user"
            rightIcon="send"
            rightIconSize={23}
            leftIconSize={32}
            leftIconPadding={8}
            placeholder="Add your comment…"
            borderNone
            style={{
              paddingLeft: w(15),
              paddingRight: w(15),
              paddingBottom: h(15),
              paddingTop: h(15)
            }}
          />
        </KeyboardAvoidingView>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  ...commonStyle
});
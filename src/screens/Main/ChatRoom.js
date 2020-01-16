import React, { Component } from 'React';
import { FlatList, View, StyleSheet, Image, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Header, Text, TextInput, Button, LabelText } from 'components';
import commonStyle, { fontSizes } from 'common/themes/styles';
import { w, m, h } from 'common/helpers';
import Colors from 'common/themes/colors';
import images from 'images';
import { Container, Left, Right } from 'native-base';
import Modal from 'react-native-modal';
import ReactNativePickerModule from 'react-native-picker-module';

const JHON = 676;
const LINA = 654;

const LeftSection = props => {
  const { message } = props;

  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 0.2}}>
        <Image 
          source={images[message.avatar]}
          style={{
            width: m(48),
            height: m(48)
          }}
        />
      </View>
      <View style={{flex: 0.7}}>
        <View style={{flexDirection: 'row'}}>
          <Text 
            text={message.time}
            size={fontSizes.small}
            color={Colors.grey.lighter}
            style={{marginRight: w(5)}}
          />
          <Image 
            source={images['msg_read_tick']}
            style={{
              width: m(11),
              height: m(11)
            }}
          />
        </View>
        <View style={{
          backgroundColor: Colors.white.lightest,
          borderColor: Colors.white.medium,
          borderWidth: 1,
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          padding: 10
        }}>
          <Text
            text={message.messages}
            color={Colors.black.base}
          />
        </View>
      </View>
    </View>
  )
}

const RightSection = props => {
  const { message } = props;

  return(
    <View style={{flexDirection: 'row'}}>
      <View style={{flex: 0.1}}/>
      <View style={{flex: 0.7}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text 
            text={message.time}
            size={fontSizes.small}
            color={Colors.grey.lighter}
            style={{marginRight: w(5)}}
          />
          <Image 
            source={images['msg_read_tick']}
            style={{
              width: m(11),
              height: m(11)
            }}
          />
        </View>
        <View style={{
          backgroundColor: Colors.white.dark,
          borderColor: Colors.white.heavy,
          borderWidth: 1,
          borderTopLeftRadius: 15,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          padding: 10,
        }}>
          <Text
            text={message.messages}
            color={Colors.black.base}
          />
        </View>
      </View>
      <View style={{flex: 0.2, alignItems: 'flex-end'}}>
        <Image 
          source={images[message.avatar]}
          style={{
            width: m(48),
            height: m(48)
          }}
        />
      </View>
    </View>
  )

}
class MessageContent extends Component {
  render() {
    const { message } = this.props;
    return (
      <View style={{paddingBottom: h(35)}}>
        {message.fromUser === JHON ? (
          <LeftSection message={message} />
        ) : (
          <RightSection message={message} />
        )}
      </View>
    )
  }
}

class Invoice extends Component {
  render() {
    return (
      <View 
        style={{
          paddingHorizontal: w(15),
          marginTop: h(15)   
        }}>
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: h(7)
        }}>
          <Text 
            text="Let’s share a coffee"
            color={Colors.grey.dark}
            size={fontSizes.bigger}
            medium
          />
          <View 
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}>
            <Image 
              source={images['clock']}
              style={{
                width: m(20),
                height: m(20),
                marginRight: w(8)
              }}
            />
            <Text 
              text="10:15 min"
              color={Colors.grey.dark}
              bold
            />
          </View>
        </View>
        <Text 
          text="Just saw #Starbucks has a 2 for 1 deal, I’m around for 10 mins. #WannaSplit ? #coffee"
          color={Colors.white.light}
          style={{marginBottom: h(7)}}
        />
        <View 
          style={{
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: h(15)
        }}>
          <View style={{flexDirection: 'row'}}>
            <Text 
              text="$5"
              color={Colors.primary.base}
              medium
            />
            <Text 
              text=" * 2 People"
              color={Colors.grey.dark}
              medium
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text 
              text="$5"
              color={Colors.primary.base}
              medium
            />
            <Text 
              text=" per Person"
              color={Colors.grey.dark}
              medium
            />
          </View>
        </View>
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Image 
            source={images['msg_avatar1']}
            style={{
              width: m(32),
              height: m(32)
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Image 
              source={images['msg_avatar5']}
              style={{
                width: m(32),
                height: m(32)
              }}
            />
            <Image 
              source={images['msg_avatar4']}
              style={{
                width: m(32),
                height: m(32),
                marginLeft: w(-16)
              }}
            />
          </View>
        </View>
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: h(25)
        }}>
          <Button
            onPress={() => {this.props.denyInvoice()}}
            backgroundColor={Colors.white.base}
            text="Deny"
            width="100%"
            color={Colors.primary.base}
            size={fontSizes.medium}
            height={m(56)}
            semiBold
            style={{flex: 0.45}}
          />
          <Button 
            onPress={() => {this.props.acceptInvoice()}}
            borderColor={Colors.primary.base}
            backgroundColor={Colors.primary.base}
            text="Pay"
            color={Colors.white.base}
            size={fontSizes.medium}
            height={m(56)}
            semiBold
            style={{flex: 0.45}}
          />
        </View>
      </View>
    )
  }
}

const AddNewCard = props => {
  return(
    <Modal isVisible={true}>
      <View style={{ 
          height: '55%', 
          backgroundColor: 'white', 
          borderRadius: 10,
          justifyContent: 'space-between',
      }}>
        <TouchableOpacity onPress={() => {props.closeModal()}}>
          <Image 
            source={images['close_modal']}
            style={{
              width: m(13),
              height: m(13),
              alignSelf: 'flex-end',
              marginRight: w(11),
              marginTop: h(11)
            }}
          />
        </TouchableOpacity>
        <Text 
          text="You don’t have any card yet :("
          size={fontSizes.larger}
          color={Colors.black.base}
          style={{
            width: '80%', 
            marginRight: 'auto', 
            marginLeft: 'auto'
          }}
        />
        <Text 
          text="Create new card to have a possibility to pay this split. You will always have the option to change or delete the card. "
          color={Colors.grey.lighter}
          style={{
            width: '80%', 
            marginRight: 'auto', 
            marginLeft: 'auto'
          }}
        />
        <Button 
          text="Add new card"
          borderColor={Colors.blue.base}
          backgroundColor={Colors.blue.base}
          size={fontSizes.medium}
          width={'80%'}
          height={m(56)}
          semiBold
          onPress={() => {props.chooseCard()}}
          style={{
            alignSelf: 'center',
            marginBottom: h(30)
          }}
        />
      </View>
    </Modal>
  )
}
const ChooseCard = props => {
  console.log('currentCard', props.currentCard);
  return(
    <Modal isVisible={true}>
      <KeyboardAvoidingView contentContainerStyle={{ 
          flexDirection: 'column',
          height: '90%', 
          backgroundColor: 'white', 
          borderRadius: 10,
          justifyContent: 'space-between',
      }} behavior="position">
        <TouchableOpacity onPress={() => {props.closeModal()}}>
          <Image 
            source={images['close_modal']}
            style={{
              width: m(13),
              height: m(13),
              alignSelf: 'flex-end',
              marginRight: w(11),
              marginTop: h(11)
            }}
          />
        </TouchableOpacity>
        <Text 
          text="Choose your card to pay with"
          size={fontSizes.larger}
          color={Colors.black.base}
          style={{
            width: '80%', 
            marginRight: 'auto', 
            marginLeft: 'auto',
            marginTop: h(15)
          }}
        />
        <View 
          style={{
            width: '80%',
            marginRight: 'auto',
            marginLeft: 'auto'
        }}>
          <TouchableOpacity onPress={() => {this.pickerRef.show()}}>
            <LabelText 
              editable={false}
              onTouch={() => this.pickerRef.show()}
              name={'card'}
              label={'Choose your card'}
              text={props.currentCard} 
              color={Colors.black.base}
              onChangeText={() => {return}}
              dropdown
              style={{marginTop: h(25)}}
            />
          </TouchableOpacity>
          <ReactNativePickerModule
            pickerRef={e => this.pickerRef = e}
            value={props.currentCard === props.cards[0] ? 0 : 1}
            title={"Select the Card"}
            items={props.cards}
            onValueChange={card => props.changeCard(card)}
          />
          <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: h(25)
          }}>
            <LabelText 
              name={'cardType'}
              label={'Card Type'}
              text={props.cardType}
              onChangeText={props.changeCardInfo}
              color={Colors.black.base}
            />
            <LabelText 
              name={'cardExpireDate'}
              label={'Date of Expire'}
              text={props.cardExpireDate}
              onChangeText={props.changeCardInfo} 
              color={Colors.black.base}
            />
          </View>
          <LabelText 
            name={'cardCVV'}
            label={'CVV'}
            text={props.cardCVV} 
            placeholder="Enter CVV code to confirm payment"
            onChangeText={props.changeCardInfo}
            color={Colors.black.base}
            style={{marginTop: h(25)}}
            keyboardType="numeric"
          />
        </View>
        <Button 
          text="Confirm Payment"
          borderColor={Colors.blue.base}
          backgroundColor={Colors.blue.base}
          size={fontSizes.medium}
          width={'80%'}
          height={m(56)}
          semiBold
          onPress={() => {props.confirmPayment()}}
          style={{
            alignSelf: 'center',
            marginTop: h(20),
            marginBottom: h(30)
          }}
        />
      </KeyboardAvoidingView>
    </Modal>
  )
}
export default class ChatRoom extends Component {
  state = {
    messages: [
      {
        id: 1,
        fromUser: JHON,
        toUser: LINA,
        avatar: 'msg_avatar1',
        messages: `Love the refresh and I'm pretty confident with the direction DN is headed, but you guys should rethink.`,
        time: '3:28 PM',
        isRead: true
      },
      {
        id: 2,
        fromUser: LINA,
        toUser: JHON,
        avatar: 'sarah',
        messages: 'Agree with John. I think you should add padding!',
        time: '3:29 PM',
        isRead: true
      },
      {
        id: 3,
        fromUser: JHON,
        toUser: LINA,
        avatar: 'msg_avatar1',
        messages: 'Agreed on the line-height! My eyes are going a bit crazy. But technical updates are awesome.',
        time: '3:32 PM',
        isRead: true
      },
      {
        id: 4,
        fromUser: LINA,
        toUser: JHON,
        avatar: 'sarah',
        messages: 'Sends Location to Meet for Split Open Google Maps or Waze',
        time: '3:35 PM',
        isRead: true
      }
    ],
    showInvoice: true,
    showAddNewCard: false,
    showCofirmPayment: false,
    cardType: 'Master Card',
    cardExpireDate: '12 / 02',
    cardCVV: '',
    cards: [
      'xxxx xxxx xxxx 0123',
      'xxxx xxxx xxxx 0554'
    ],
    currentCard: 'xxxx xxxx xxxx 0123'
  }

  goToBack = () => {
    this.props.navigation.goBack();
  }

  onCheckMsg = () => {
    this.props.navigation.navigate('MessagesScreen');
  }

  _renderItem = message => {
    return <MessageContent message={message.item} />
  }

  onDenyInvoice = () => {
    this.setState({showInvoice: false});
  }
  
  onAccpetInvoice = () => {
    this.setState({showAddNewCard: true});
  }

  onCloseModal = () => {
    this.setState({
      showAddNewCard: false,
      showCofirmPayment: false
    });
  }

  onChangeCardInfo = (name, text) => {
    this.setState({[name]: text});
  }

  onChangeCard = card => {
    this.setState({currentCard: card});
  }

  onChooseCard = () => {
    this.setState({
      showAddNewCard: false,
      showCofirmPayment: true
    });
  }

  onConfirmPayment = () => {
    this.onCloseModal();
  }

  componentDidMount() {
    setTimeout(()=> {
      this.scrollView.scrollToEnd({animated: true});
    }, 500);
  }

  render() {
    const { 
      messages,
      showInvoice,
      showAddNewCard,
      showCofirmPayment,
      cardType,
      cardExpireDate,
      cardCVV,
      currentCard,
      cards
    } = this.state;

    return(
      <Container>
        <View style={{flex: 1}}>
          <Header 
            chatHeader
            onLeftIconPress={this.goToBack}
            onRightIconPress={() => {return}}
            leftIcon="back_arrow"
            title="Comments"
            rightIcon="chat_menu_icon"
            rightIconSize={{
              width: m(27),
              height: m(27)
            }}
            clientAvatar="msg_avatar1"
            clientName="Ryan Stevens Jr."
            lastSeen="was here at 9:39"
          />
          <ScrollView 
            ref={ref => this.scrollView = ref}
            style={[
              styles.container, 
              { marginTop: h(26) }
            ]}
            showsVerticalScrollIndicator={false}
          >
            <FlatList
              data={messages}
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={this._renderItem}
            />
            {showInvoice && (
              <Invoice
                denyInvoice={this.onDenyInvoice}
                acceptInvoice={this.onAccpetInvoice} />
            )}
          </ScrollView>
          {showAddNewCard && (
            <AddNewCard 
              closeModal={this.onCloseModal}
              chooseCard={this.onChooseCard}  
            />
          )}
          {showCofirmPayment && (
            <ChooseCard 
              changeCardInfo={this.onChangeCardInfo}
              cardType={cardType}
              cardExpireDate={cardExpireDate}
              cardCVV={cardCVV}
              currentCard={currentCard}
              cards={cards}
              changeCard={this.onChangeCard}
              confirmPayment={this.onConfirmPayment}
              closeModal={this.onCloseModal}
            />
          )}
        </View>
        <KeyboardAvoidingView 
          behavior='padding' 
          keyboardVerticalOffset={ 0 } 
          contentContainerStyle={{ display: 'none' }}
        >
          <TextInput 
            leftIcon="sarah"
            rightIcon="send"
            rightIconSize={23}
            leftIconSize={32}
            leftIconPadding={8}
            placeholder="Type your message…"
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
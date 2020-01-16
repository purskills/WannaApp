import React, { Component } from 'React';
import _ from 'lodash';
import { Item, Input, Icon, Button as NButton, Content, CardItem, Left, Body, Right, Card, Text as NText, Col } from 'native-base';
import { Header, Text, Button, FeedCard, Badge } from 'components';
import { Image, StyleSheet, FlatList, View, ScrollView, Dimensions, TouchableOpacity, TextInput, Picker, KeyboardAvoidingView } from 'react-native';
import commonStyle, { fontSizes } from 'common/themes/styles';
import { w, m, h } from 'common/helpers';
import Colors from 'common/themes/colors';
import images from 'images';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');
const stepAddContents = [
  {icon: 'step_pencil', title: 'Add title', width: m(14), height: m(14)},
  {icon: 'step_pencil', title: 'Add description', width: m(14), height: m(14)},
  {icon: 'step_location', title: 'Add location', width: m(14), height: m(16)},
  {icon: 'step_radius', title: 'Add radius', width: m(15), height: m(15)},
  {icon: 'step_tag', title: 'Add tags', width: m(13), height: m(13)},
  {icon: 'step_clock', title: 'Add time', width: m(14), height: m(15)},
  {icon: 'step_price', title: 'Add price', width: m(20), height: m(20)},
  {icon: 'step_people', title: 'Add splitters', width: m(18), height: m(12)},
  {icon: 'step_invitation', title: 'Invite people', width: m(12), height: m(14)},
]
class Step extends Component {
  componentDidMount() {
   // setTimeout(() => {this.scrollView.scrollTo({x: 100, animated: true})}, 500);
  }

  componentWillReceiveProps(props) {
    if (props.currentStep < 3) {
      return;
    }
    
    if (props.currentStep < 9) {
      this.scrollView.scrollTo({x: props.currentStep * w(67), animated: true});
    }
  }

  render() {
    const { stepTitles } = this.props;

    return(
      <ScrollView
        style={{height: '100%'}}
        ref={ref => this.scrollView = ref}
        contentContainerStyle={{
          justifyContent: 'flex-start', 
          alignSelf: 'flex-end',
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        canCancelContentTouches={false}
      >
      <Image 
          source={images['line']}
          style={{
            position: 'absolute',
            bottom: h(37),
            left: 20,
            width: m(845),
            height: 1
          }}
         /> 
      {_.map(stepTitles, (item, index) => {
          const fontColor = item.active ? Colors.white.base : Colors.grey.lighter;
          const borderColor = item.active ? Colors.blue.base : Colors.grey.lightest;
          const backgroundColor = item.active ? Colors.blue.base : Colors.white.base;
          const stepTextColor = item.active ? Colors.blue.base : Colors.grey.lighter;
          const type = item.done ? 'image' : 'text';

          return (
            <View
              key={index} 
              style={{
                flexDirection: 'column', 
                marginRight: w(50)
            }}>
              <Badge 
                count={index + 1}
                size={24}
                contentContainerStyle={{
                  alignSelf: 'center',
                  marginLeft: m(24),
                  marginBottom: h(6),
                }}
                type={type}
                color={fontColor}
                borderColor={borderColor}
                backgroundColor={backgroundColor}
              />
              <Text
                text={item.title}
                size={fontSizes.small}
                color={stepTextColor}
                bold
                style={{
                  marginTop: h(30),
                  letterSpacing: m(0.5),
                  textTransform: 'uppercase'
                }}
              /> 
            </View>
      )})}
      </ScrollView>
    )
  }
}

class InputModal extends Component {
  
  state ={ 
    text: ''
  }

  onAdd = () => {
    const { text } = this.state;
    this.props.onAddText(text);
  }

  render() {
    const { showModal, text } = this.state;

    return(
      <Modal isVisible={true}>
        <KeyboardAvoidingView 
          contentContainerStyle={{ 
            height: '70%', 
            backgroundColor: 'white', 
            borderRadius: 10,
            justifyContent: 'space-between'
          }}
          behavior="position"
        >
          <Text 
            text="Set the value"
            size={fontSizes.bigger}
            color={Colors.primary.base}
            semiBold
            style={{
              marginTop: h(15),
              alignSelf: 'center'
            }}
          />
          <View style={{
            borderColor: Colors.grey.light,
            borderWidth: 1,
            marginHorizontal: w(15),
            flex: 0.8
          }}>
            <TextInput
              keyboardType={this.props.keyboardType}
              multiline={true}
              numberOfLines={4}
              onChangeText={text => this.setState({text})}
              value={text}
              style={{
                height: '100%',
                paddingHorizontal: w(10)
              }}
            />
          </View>
          <Button 
            text="ADD"
            borderColor={Colors.blue.base}
            backgroundColor={Colors.blue.base}
            size={fontSizes.medium}
            width={m(150)}
            height={m(50)}
            bold
            onPress={this.onAdd}
            style={{
              alignSelf: 'center',
              marginBottom: h(15)
            }}
          />
        </KeyboardAvoidingView>
      </Modal>
    )
  }
}
class RadiusPicker extends Component {
  state = {
    mile: 0,
    labels: [
      {label: '1', value: 0},
      {label: '2-5', value: 1},
      {label: '5-10', value: 2}
    ]
  }

  render() {
    const { labels, mile } = this.state;

    return(
      <View style={{
        flex: 1,
        marginBottom: h(30)
      }}>
        <Picker
          selectedValue={this.state.mile}
          itemStyle={{
            height: 120, 
            fontFamily: 'Montserrat'
          }}
          onValueChange={(itemValue, itemIndex) =>{
            this.setState({mile: itemValue});        
          }}>
          {_.map(labels, (item, index) => {
            return(
              <Picker.Item 
                key={index}
                label={item.label + ' miles'} 
                value={item.value} 
              />
            )
          })}
        </Picker>
      </View>
    )
  }
}
class TimePicker extends Component {
  state = {
    hour: 12,
    minute: 15,
    day: 3
  }

  render() {
    const {
      hour,
      minute,
      day
    } = this.state;

    return(
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
        <View style={{flex: 0.3}}>
          <Picker 
            selectedValue={hour}
            onValueChange={(itemValue) => this.setState({hour: itemValue}, () => {this.props.updateTime(day, itemValue, minute)})}
            itemStyle={{fontFamily: 'Montserrat'}}
          >
            {_.map(Array(24), (item, index) => {
              return (
                <Picker.Item 
                  key={index}
                  label={index.toString() + ' hour'} 
                  value={index} 
                />
              )
            })}
          </Picker>
        </View>
        <View style={{flex: 0.3}}>
          <Picker 
            selectedValue={minute}
            onValueChange={(itemValue) => this.setState({minute: itemValue}, () => {this.props.updateTime(day, hour, itemValue)})}
            itemStyle={{fontFamily: 'Montserrat'}}
          >
            {_.map(Array(60), (item, index) => {
                return (
                  <Picker.Item 
                    key={index}
                    label={index.toString() + ' min'} 
                    value={index} 
                  />
                )
            })}
          </Picker>
        </View>
        <View style={{flex: 0.3}}>
          <Picker 
            selectedValue={day}
            onValueChange={(itemValue) => this.setState({day: itemValue}, () => {this.props.updateTime(itemValue, hour, minute)})}
            itemStyle={{fontFamily: 'Montserrat'}}
          >
            {_.map(Array(7), (item, index) => {
                return (
                  <Picker.Item 
                    key={index}
                    label={index.toString() + ' day'} 
                    value={index}
                  />
                )
            })}
          </Picker>
        </View>
      </View>
    )
  }
}
export default class Compose extends Component {
  
  state = {
    currentStep: 0,
    splitInfo: {
      // splitTitle: 'Let’s share a cup of coffee!',
      // splitComment: 'Just saw #Starbucks has a 2 for 1 deal, I’m around for 10 mins. #WannaSplit ?',
      // splitTags: '#Starbucks #coffee',
      // cost: '-$10',
      // numberOfPeople: '/ 2 People',
      // time: '15 min'
      splitTitle: '',
      splitComment: '',
      splitTags: '',
      cost: '',
      numberOfPeople: '',
      time: ''
    },
    stepTitles: [
      {title: 'title', active: true, done: false},
      {title: 'description', active: false, done: false},
      {title: 'location', active: false, done: false},
      {title: 'radius', active: false, done: false},
      {title: 'tags', active: false, done: false},
      {title: 'time', active: false, done: false},
      {title: 'price', active: false, done: false},
      {title: 'splitters', active: false, done: false},
      {title: 'invite', active: false, done: false}
    ],
    showInputModal: false,
    completeStep: false,
    showRadius: false,
    showTime: false,
    showPrice: false,
    showPeople: false,
    showLocationMark: false,
    keyboardType: 'default',
    time: {
      day: 3,
      hour: 12,
      minute: 15
    },
    cost: 0,
    numberOfPeople: 0
  }

  onNextStep = () => {
    const { 
      stepTitles, 
      currentStep,
      cost,
      numberOfPeople
     } = this.state;

    if ((currentStep === 6 && cost === 0) || (currentStep === 7 && numberOfPeople === 0)) {
      return;
    }

    if (currentStep === 8) {
      this.props.navigation.navigate('Main');
    }

    if (currentStep === 2) {
      this.setState({showLocationMark: true});
    }

    if (currentStep === 5) {
      const { time, splitInfo } = this.state;
      const day = time.day === 0 ? '' : `${time.day} DAY `;
      const hour = time.hour === 0 ? '' : `${time.hour} HOUR `;
      const minute = time.minute === 0 ? '' : `${time.minute} MIN`;
      splitInfo.time = `${day}${hour}${minute}`;
      this.forceUpdate();
    }
    stepTitles[currentStep].done = true;
    
    if (currentStep != 8) {
      stepTitles[currentStep + 1].active = true;
    }
    
    this.forceUpdate();
    this.setState({
      completeStep: false,
      showRadius: false,
      showTime: false,
      showPrice: false,
      showPeople: false
    });

    if (currentStep === 8)
      return;

    this.setState(prevState => ({
      currentStep: prevState.currentStep + 1,
    }));
  }

  onAddText = text => {
    if (text === '') {
      return;
    }

    const { currentStep, splitInfo } = this.state;
    let key = '';

    switch (currentStep) {
      case 0:
        key='splitTitle';
        break;
      case 1:
        key='splitComment';
        break;
      case 4:
        key='splitTags';
        break;
      case 6:
        if (isNaN(text)) {
          return;
        }
        key='cost';
        this.setState({cost: parseInt(text)});
        break;
      case 7:
        if (isNaN(text)) {
          return;
        }
        key='numberOfPeople';
        this.setState({numberOfPeople: parseInt(text)});
        break;
    }
   
    splitInfo[key] = text;
    this.setState({showInputModal: false, completeStep: true});
    this.forceUpdate();
  }
  
  onShowStepContent = () => {
    const { currentStep } = this.state;

    switch (currentStep) {
      case 0: case 1: case 4:
        this.setState({
          showInputModal: true,
          keyboardType: 'default'
        });
        break;
      case 2:
        this.props.navigation.navigate('LocationScreen');
        this.setState({completeStep: true});
        break;
      case 3: 
        this.setState({showRadius: true, completeStep: true});
        break;
      case 5:
        this.setState({showTime: true, completeStep: true});
        break;
      case 6:
        this.setState({showPrice: true, completeStep: true});
        break;
      case 7:
        this.setState({showPeople: true, completeStep: true});
        break;
      case 8:
        this.props.navigation.navigate('InviteScreen');
        this.setState({completeStep: true});
        break;
    }
  }

  onUpdateTime = (day, hour, minute) => {
    this.setState({time: {day: day, hour: hour, minute: minute}});
  }

  render() {
    const { 
      splitInfo, 
      currentStep,
      showInputModal,
      completeStep,
      showRadius,
      showTime,
      showPrice,
      showPeople,
      showLocationMark,
      cost,
      numberOfPeople,
      keyboardType
    } = this.state;

    return(
      <View style={[styles.container, {
          flex: 1,
          flexDirection: 'column'
      }]}>
       
        <ScrollView 
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({animated: true});
          }}
          style={{flex: 0.9}}
          showsVerticalScrollIndicator={false}
        >
          <Image 
            source={images['feed_coffee']}
            style={{
              width: w(345),
              height: m(340),
              marginTop: h(30)
            }}
          />
          {showLocationMark&& (
            <Image 
            source={images['location']}
            style={{
              position: 'absolute',
              width: m(19),
              height: m(22),
              left: w(310),
              top: h(330) 
            }}
          /> 
          )}
          <View style={{
              flexDirection: 'row', 
              alignSelf: 'flex-end',
              marginTop: h(10)
            }}
          >
            <View style={{
                flexDirection: 'row',
                marginRight: w(7)
              }}
            >
              <Text 
                text={splitInfo.cost === '' ? '' : `$${splitInfo.cost}`}
                color={Colors.primary.base}
                medium
              />
              <Text 
                text={splitInfo.numberOfPeople === '' ? '' : ` * ${splitInfo.numberOfPeople} People`}
                color={Colors.grey.dark}
                medium
              />
            </View>
          </View>
          <Text 
            text={splitInfo.splitTitle}
            color={Colors.grey.dark}
            size={fontSizes.bigger}
            style={{marginTop: h(10)}}
            semiBold
          />
          <Text
            text={splitInfo.splitComment}
            color={Colors.white.light}
            style={{
              marginTop: h(10),
              lineHeight: h(21)
            }}
          />
           <Text
            text={splitInfo.splitTags}
            color={Colors.grey.dark}
            style={{
              marginTop: h(10)
            }}
          />
          {currentStep >= 6 && (
            <View style={{
              flexDirection: 'row',
              marginVertical: h(20)
            }}>
              <Image 
                source={images['clock']}
                style={{
                  width: m(20),
                  height: m(20),
                  marginRight: w(7)
                }}
              />
              <Text 
                text={splitInfo.time}
                color={Colors.grey.dark}
                bold
              />
            </View>
          )}
          {showRadius && (
            <>
              <Text 
                text="Choose radius"
                size={fontSizes.bigger}
                semiBold
                color={Colors.primary.base}
                textAlign="center"
              />
              <RadiusPicker />
            </>
          )}
          {showTime && (
            <>
              <Text 
                text="Choose time"
                size={fontSizes.bigger}
                semiBold
                color={Colors.primary.base}
                textAlign="center"
              />
              <TimePicker updateTime={this.onUpdateTime}/>
            </>
          )}
          {showPrice && (
            <>
              <Text 
                text="Set the price"
                size={fontSizes.bigger}
                semiBold
                color={Colors.primary.base}
                textAlign="center"
                style={{marginTop: h(10)}}
              />
              <TouchableOpacity onPress={() => this.setState({showInputModal: true, keyboardType: 'numeric'})}>
                <Text 
                  text={`$${cost}`}
                  medium
                  color={Colors.primary.base}
                  textAlign="center"
                  style={{marginVertical: h(20)}}
                />
              </TouchableOpacity>
            </>
          )}
          {showPeople && (
            <>
              <Text 
                text="Set number of splitters"
                size={fontSizes.bigger}
                semiBold
                color={Colors.primary.base}
                textAlign="center"
                style={{marginTop: h(10)}}
              />
              <TouchableOpacity onPress={() => this.setState({showInputModal: true, keyboardType: 'numeric'})}>
                <Text 
                  text={`${numberOfPeople}`}
                  medium
                  color={Colors.primary.base}
                  textAlign="center"
                  style={{marginVertical: h(20)}}
                />
              </TouchableOpacity>
            </>
          )}
          {showInputModal &&
            <InputModal 
              keyboardType={keyboardType}
              onAddText={this.onAddText}
            />
          }
          {!completeStep ? (
            <TouchableOpacity onPress={() => this.onShowStepContent()}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: h(10),
                marginBottom: h(15)
              }}>
                <Image 
                  source={images[stepAddContents[currentStep].icon]}
                  style={{
                    width: stepAddContents[currentStep].width,
                    height: stepAddContents[currentStep].height,
                    marginRight: w(10)
                  }}
                />
                <Text 
                  text={stepAddContents[currentStep].title}
                  size={fontSizes.bigger}
                  color={Colors.primary.base}
                  semiBold
                />
              </View>
            </TouchableOpacity>
          ) : (
            <Button 
              text="Done"
              borderColor={Colors.primary.base}
              color={Colors.primary.base}
              width={m(85)}
              height={m(36)}
              semiBold
              style={{
                alignSelf: 'center',
                marginBottom: h(15)
              }}
              onPress={() => this.onNextStep()}
            />
          )}
        </ScrollView>

        <View style={{flex: 0.1}}>
          <Step 
            currentStep={this.state.currentStep}
            stepTitles={this.state.stepTitles}
          />
        </View>
      </View>
    )    
  }
}

const styles = StyleSheet.create({
  ...commonStyle
});
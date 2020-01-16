import React, { Component } from 'React';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Item, Input, Icon, Button as NButton, Content, CardItem, Left, Body, Right, Card, Text as NText, Col } from 'native-base';
import images from 'images';
import { w, m, h, isIphoneX } from 'common/helpers';
import { Svg, Ellipse, Circle, Path, G } from 'react-native-svg';
import { Text, Button } from 'components';
import Colors from 'common/themes/colors';
import { fontSizes } from 'common/themes/styles';
import _ from 'lodash';

const { width, height } = Dimensions.get('window');

const getResolution = () => {
  const height = 587;
  const path = 'M220.048 0c-9.277 12.974-25.76 21.605-44.548 21.605S140.229 12.975 130.952 0H7.2C6.08 0 5.52 0 5.092.218a2 2 0 0 0-.874.874C4 1.52 4 2.08 4 3.2v572.6c0 1.12 0 1.68.218 2.108.192.376.498.682.874.874.428.218.988.218 2.108.218h128.271c9.63-9.913 23.989-16.203 40.029-16.203 16.04 0 30.399 6.29 40.029 16.203H344.8c1.12 0 1.68 0 2.108-.218.376-.192.682-.498.874-.874.218-.428.218-.988.218-2.108V3.2c0-1.12 0-1.68-.218-2.108a2.003 2.003 0 0 0-.874-.874C346.48 0 345.92 0 344.8 0H220.048z';
  
  return {height, path};
}

const  FeedContent = props => {
  return(
    <View style={{marginLeft: w(17)}}>
      <FeedDesc 
        onPressDescIcon={iconName => props.onPressDescIcon(iconName)}
        ownerAvatar={props.ownerAvatar}
        ownerBrandAvatar={props.ownerBrandAvatar}
        onPressAvatar={props.onPressAvatar}
        splitType={props.splitType}
      />
      <View style={{
          flexDirection: 'row', 
          justifyContent: 'space-between',
        }}
      >
        <View style={{marginBottom: h(13)}}>
          <Text 
            text={props.ownerName}
            color={Colors.grey.medium}
          />
          {props.brandName &&
            <Text text="with ">
              <Text 
                text={props.brandName}
                color={Colors.grey.medium}
              />
            </Text>
          }
        </View>
        <View style={{
            flexDirection: 'row',
            marginRight: w(7)
          }}
        >
          <Text 
            text={props.cost}
            color={Colors.primary.base}
            medium
          />
          <Text 
            text={props.numberOfPeople}
            color={Colors.grey.dark}
            medium
          />
        </View>
      </View>
      <Text 
        text={props.splitTitle}
        color={Colors.grey.dark}
        size={fontSizes.bigger}
        style={{marginBottom: h(10)}}
        medium
      />
      <Text
        text={props.splitComment}
        color={Colors.white.light}
        style={{lineHeight: h(21)}}
      />
    </View>
  )
}

const  FeedSubmit = props => {
  let borderColor = Colors.primary.base;
  let color = Colors.primary.base;
  let text = props.splitStatus;
  
  if (props.splitStatus !== 'active') {
    borderColor = Colors.grey.light;
    color = Colors.grey.lighter;
  }
  else {
    text = 'split it'
  }

  return(
    <View style={{
        marginHorizontal: w(17),
        marginBottom: h(20)
      }}
    >
      <View style={{
          width: width - w(60),
          // width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{
            flexDirection: 'row', 
            flex: 0.5
          }}
        >
          <Image 
            source={images['clock']}
            style={{
              width: m(20),
              height: m(20),
              marginRight: w(7)
            }}
          />
          <Text 
            text={props.time}
            color={Colors.grey.dark}
            bold
          />
        </View>
        <TouchableOpacity onPress={() => props.onPressSplit(props.splitStatus)}>
          <View style={{
            borderStyle: "dashed",
            borderRadius: 4,
            borderWidth: 2,
            borderColor: borderColor,
            flex: 0.5,
            // justifyContent: 'flex-end'
          }}>
            <Text 
              text={text}
              size={m(14)}
              color={color}
              bold
              style={{
                paddingHorizontal: w(17),
                paddingVertical: h(8),
                textTransform: 'uppercase'
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

class FeedDesc extends Component {
  state = {
    descIcons: [
      {
        name: 'favour',
        image: images['favour'],
        padding: w(24),
        width: m(21),
        height: m(20),
        active: false
      },
      {
        name: 'comment',
        image: images['comment'],
        padding: w(24),
        width: m(22),
        height: m(20)
      },
      {
        name: 'location',
        image: images['location'],
        padding: w(5),
        width: m(19),
        height: m(22)
      }
    ]
  } 

  onPressDescIcon = iconName => {   
    if (iconName === 'favour') {
      const { descIcons } = this.state;
      descIcons[0].image = descIcons[0].active === false ? images['favour_active'] : images['favour'];
      descIcons[0].active = !descIcons[0].active;
      this.setState({ descIcons });
    }
    
    this.props.onPressDescIcon(iconName);
  }

  render() {
      const { descIcons } = this.state;

      return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: h(32)
          }}
        >
          <TouchableOpacity onPress={() => this.props.onPressAvatar(this.props.splitType)}>
            <View style={{
                flexDirection: 'row'
              }}
            >
              <Image 
                source={images[this.props.ownerAvatar]}
                style={{
                  width: m(50),
                  height: m(50),
                }}
              />
              <Image 
                source={images[this.props.ownerBrandAvatar]}
                style={{
                  width: m(50),
                  height: m(50),
                  marginLeft: w(-25)
                }}
              />
          </View>
        </TouchableOpacity>
          <View style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}
          >
          {_.map(descIcons, (icon, key) => {
              return (
                <TouchableOpacity 
                  key={key}
                  onPress={() => this.onPressDescIcon(icon.name)}
                >
                  <Image
                    source={icon.image}
                    style={{
                      marginRight: icon.padding,
                      width: icon.width,
                      height: icon.height,
                    }}
                  />
                </TouchableOpacity>
            )})
          }
          </View>
      </View> 
    )
  }
}

export default class FeedCard extends Component {
  render() {
    const {height, path} = getResolution();
    const scale = `scale(${w(1)})`;

    return (
      <View style={{marginBottom: h(15)}}>
        <View style={styles.cardStyles}>
          <Svg width={w(352)} height={w(height)} fill="none" >
            <G transform={scale}>
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d={path}
                fill="#fff"
              />
            </G>
            <Image 
              source={images[this.props.splitImage]}
              style={{
                marginLeft: w(3),
                width: w(345),
                height: 350
              }}
            />
             <Image 
              source={images['bounds']}
              style={{
                position: 'absolute',
                right: w(4),
                width: m(24),
                height: m(40)
              }}
            />
            <Text
              text={this.props.splitType === 'Person' ? 'P' : 'B'}
              color={Colors.white.base}
              medium
              style={{
                position: 'absolute',
                right: w(10),
                top: h(6)
              }}
            />
          </Svg>
        </View>
        <View style={{
            position: 'absolute', 
            top: 280
          }}
        >
          <FeedContent 
            onPressDescIcon={iconName => this.props.onPressDescIcon(iconName)}
            onPressAvatar={this.props.onPressAvatar}
            ownerAvatar={this.props.ownerAvatar}
            ownerBrandAvatar={this.props.ownerBrandAvatar}
            ownerName={this.props.ownerName}
            brandName={this.props.brandName}
            cost={this.props.cost}
            numberOfPeople={this.props.numberOfPeople}
            splitTitle={this.props.splitTitle}
            splitType={this.props.splitType}
            splitComment={this.props.splitComment}
            time={this.props.time}
          />
        </View>
        <View style={{
            position: 'absolute', 
            bottom: 0
          }}
        >
          <FeedSubmit
            time={this.props.time} 
            onPressSplit={this.props.onPressSplit}
            splitStatus={this.props.splitStatus}
            splitType={this.props.splitType}
          />
        </View>
        <View 
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            width: w(34),
            height: m(34),
            top:  -22,
            left: (width - w(30)) / 2 - w(16),
            borderRadius: m(17),
            transform: [{scaleX: 2.5}, {scaleY: 1.4}]
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardStyles: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2
  }
});

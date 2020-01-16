import React, { Component } from 'React';
import { Container, Header as NHeader, Title, Button, Icon, Left, Right, Body, View, Text as NText } from "native-base";
import { w, m, h } from 'common/helpers';
import { Text, Badge } from 'components';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import images from 'images';
import { fontSizes } from 'common/themes/styles';
import Colors from 'common/themes/colors';

export default class Header extends Component {

  render() {
    const {
      title = "",
      leftIcon = "",
      leftIconSize = {width: m(16), height: m(12)},
      rightIcon = "",
      badgeNumber = 0,
      badgeSize = 21,
      rightIconSize = {width: m(26), height: m(23)},
      rightText = "",
      chatHeader,
      clientAvatar,
      clientName,
      lastSeen,
      onLeftIconPress = () => {},
      style = {}
    } = this.props;
    
    return (
      <View style={[styles.container, {...style}]} >
          <TouchableOpacity 
            onPress={() => onLeftIconPress()} 
            style={styles.leftIcon}
          >
            <Image
              source={images[leftIcon]}
              style={leftIconSize}
            />
          </TouchableOpacity>
          <View style={styles.main} >
            {!chatHeader ? (
                <Text
                  size={fontSizes.big}
                  color={Colors.black.base}
                  text={title}
                />
              ) : (
                <>
                  <View 
                    style={{
                      flex: 0.3,
                      marginRight: w(8),
                      alignItems: 'flex-end'
                  }}> 
                    <Image 
                      source={images[clientAvatar]}
                      style={{
                        width: m(40),
                        height: m(40)
                      }}
                    />
                  </View>
                  <View 
                    style={{
                      flex: 0.7,
                      alignSelf: 'center',
                      justifyContent: 'center'
                  }}>
                    <Text 
                      text={clientAvatar}
                      color={Colors.grey.medium}
                      style={{marginBottom: h(2)}}
                    />
                    <Text 
                      text={lastSeen}
                      color={Colors.grey.lightest}
                      size={fontSizes.small}
                    />
                  </View>
                </>
            )}
          </View>
          <TouchableOpacity 
            onPress={() => this.props.onRightIconPress()} 
            style={styles.rightIcon}
          >
            <Image
              source={images[rightIcon]}
              style={rightIconSize}
            />
            {badgeNumber !== 0 && (
              <Badge 
                count={badgeNumber}
                size={badgeSize}
                style={{
                  position: 'absolute',
                  top: -20,
                  right: -10,
                }}
              />
            )}
            <Text text={rightText} />
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center', 
    height: h(60),
    marginTop: h(20),
    borderWidth: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 0.05,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  leftIcon: {
    flex: 0.2, 
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingLeft: w(30)
  },
  rightIcon: {
    flex: 0.2,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: w(30)
  },
  main: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'row'
  }
});
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import images from 'images';
import { w, m, h } from 'common/helpers';

export default class Camera extends Component {
  state = {
    flashStatus: true,
    cameraType: true
  }

  onSwitchFlash = () => {
    this.setState((prevState) => ({
      flashStatus: !prevState.flashStatus
    }));
  }

  onSwitchCamera = () => {
    this.setState((prevState) => ({
      cameraType: !prevState.cameraType
    }));
  }

  render() {
    const { flashStatus, cameraType } = this.state;
    
    return (
      <View style={styles.container}>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: w(30),
            marginTop: h(20)
          }}
        >
          <TouchableOpacity onPress={this.onSwitchFlash}>
            <Image 
              source={images['flash_off']}
              style={{
                width: m(28),
                height: m(32)
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onSwitchCamera}>
            <Image 
              source={images['camera_type']}
              style={{
                width: m(37),
                height: m(29)
              }}
            />
          </TouchableOpacity>
        </View>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={cameraType ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front}
          flashMode={flashStatus ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.takePicture()} style={styles.capture}>
            <Image 
              source={images['capture']}
              style={{
                width: m(90),
                height: m(90)
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  async takePicture (){
    console.log('camear', this.camera);
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      
      this.props.navigation.navigate('ComposeScreen');
      // console.log('camroll', CameraRoll);
      // CameraRoll.saveToCameraRoll( data.uri )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    marginBottom: h(25)
  },
});
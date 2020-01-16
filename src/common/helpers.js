import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
console.log('width', width, height);
const isPortrait = height > width;

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = size => isPortrait ? (width / guidelineBaseWidth) * size : (height / guidelineBaseWidth) * size;
const heightScale = size => isPortrait ? (height / guidelineBaseHeight) * size : (width / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
const isIphoneX = () => {
    return Platform.OS === 'ios' && (height == 812 || width == 812);
};

export { scale as w, heightScale as h, moderateScale as m, isIphoneX };

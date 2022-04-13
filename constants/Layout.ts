import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//is this affecting anything?
export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

import { Dimensions } from 'react-native';

export const orientationChangeListener = () => {
  Dimensions.addEventListener('change', ({ screen }) => {
    console.log('Orientation has changed: ', screen);
  });
};

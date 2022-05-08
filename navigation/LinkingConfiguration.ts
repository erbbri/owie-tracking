/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          User: {
            screens: {
              UserScreen: 'user',
            },
          },
          Calendar: {
            screens: {
              CalendarScreen: 'calendar',
            },
          },
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },

          Edit: {
            screens: {
              EditScreen: 'edit',
            },
          },
           Pdf: {
            screens: {
              PdfScreen: 'pdf',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
      Create: 'add'
    },
  },
};

export default linking;

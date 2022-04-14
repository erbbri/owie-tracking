/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import EditScreen from '../screens/EditScreen';
import PdfScreen from '../screens/PdfScreen';
import UserScreen from '../screens/UserScreen';
import CalendarScreen from '../screens/CalendarScreen';
import AddScreen from '../screens/AddScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import {TrackersContextProvider} from '../context/TrackersContext'
import { HistoryContextProvider } from '../context/HistoryContext';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {

  return (
      //provide context to all screens
      <HistoryContextProvider>
      <TrackersContextProvider>
      <NavigationContainer
        linking={LinkingConfiguration}>
        <RootNavigator />
      </NavigationContainer>
      </TrackersContextProvider>
      </HistoryContextProvider>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="Create" component={AddScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveBackgroundColor: Colors[colorScheme].tabIconDefault,
        tabBarActiveBackgroundColor: Colors[colorScheme].tabIconSelected,
      }}>
       <BottomTab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel:() => {return null},
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={24} color="#f1f2f3" />
          ),
        }}
      />
       <BottomTab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel:() => {return null},
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="calendar" size={24} color="#f1f2f3" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          tabBarLabel:() => {return null},
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color="#f1f2f3" />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
       <BottomTab.Screen
        name="Edit"
        component={EditScreen}
        options={{
          tabBarLabel:() => {return null},
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="edit" size={24} color="#f1f2f3" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Pdf"
        component={PdfScreen}
        options={{
          tabBarLabel:() => {return null},
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pdffile1" size={24} color="#f1f2f3" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

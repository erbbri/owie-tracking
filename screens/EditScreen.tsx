import { StyleSheet, SafeAreaView, Platform, StatusBar, Button, Pressable, Modal} from 'react-native';
import React, { useState } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { AntDesign } from '@expo/vector-icons'; 

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { colors } from 'react-native-elements';



export default function EditScreen({ navigation }: RootTabScreenProps<'Edit'>) {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: Colors[colorScheme].background}]}>
      <View
        style={{
          backgroundColor: Colors[colorScheme].tabIconDefault,
          width: "100%",
          height: "10%",
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <View style={[styles.header, {backgroundColor: Colors[colorScheme].tabIconDefault}]}>
          <Text style={styles.title}>OwieTracking</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <Pressable
              onPress={() => navigation.navigate('Create')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <AntDesign
                name="pluscircle"
                size={40}
                color= {Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
            </View>
      <EditScreenInfo path="/screens/EditScreen.tsx" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: "#f1f2f3",
    alignSelf: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  header: {
    width: '100%',
    justifyContent:'center',
  },

  bottom: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'flex-end',
  }
});

import {StyleSheet, SafeAreaView, Platform, StatusBar, Button, Image} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export default function UserScreen() {

  const colorScheme = useColorScheme();

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
         <Image 
            source={require('../assets/images/owietracking-logo.png')}
            resizeMode={'contain'}
            style={[styles.logo]}
          />
        <Text style={styles.title}>OwieTracking</Text>
      </View>
    </View>
    <EditScreenInfo path="/screens/UserScreen.tsx" />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    paddingLeft: 10, 
    fontSize: 35,
    fontWeight: 'bold',
    color: "#f1f2f3",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  logo: {
    width: 45, 
    height: 45
  },
  header: {
    paddingTop: 25, 
    flexDirection: "row",
    backgroundColor: "#3a5140",
    justifyContent:'center',
  }
});


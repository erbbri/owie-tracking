import { StyleSheet, SafeAreaView, Platform, StatusBar, Button, Image} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export default function PdfScreen({ navigation }: RootTabScreenProps<'Pdf'>) {

  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: Colors[colorScheme].background}]}>
     <Text style={[styles.title, {color: Colors[colorScheme].text}]}> Export To PDF</Text>
      {/*<View
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
      </View> */}
      <EditScreenInfo path="/screens/PdfScreen.tsx" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
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

import { StyleSheet, SafeAreaView, Platform, StatusBar, Button} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function EditScreen({ navigation }: RootTabScreenProps<'Edit'>) {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: "#aad5b5",
          width: "100%",
          height: "10%",
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <View style={styles.header}>
          <Text style={styles.title}>OwieTracking</Text>
        </View>
        <View style={styles.header}>
          <Button color="#3a5140" title="Menu" onPress={() => console.log("Menu pressed")} />
        </View>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
    color: "#3a5140",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  header: {
    backgroundColor: "#aad5b5",
    justifyContent:'center',
  }
});

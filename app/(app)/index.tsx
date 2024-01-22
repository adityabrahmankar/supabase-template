import { StyleSheet, TextInput, useColorScheme } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useSupabase } from '@/hooks/useSupabase';

export default function TabOneScreen() {
  const session = useSupabase()
  const colorScheme = useColorScheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Geist-Medium',
      fontWeight: '300'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colorScheme === 'dark' ? 'cyan' : undefined
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    searchBox: {
      borderWidth: 1,
      borderColor: colorScheme === 'dark' ? '#fff' : undefined,
      width: '90%',
      flexDirection: 'row',
      display: 'flex',
      borderRadius: 100,
      padding: 12,
      position: 'absolute',
      bottom: 20
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Where knowledge begins</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.searchBox}>
        <TextInput
          style={{ color: '#fff', width: '90%', justifyContent: 'center' }}
          placeholder='Ask anything...'
          placeholderTextColor={colorScheme === 'dark' ? '#fff7f7' : undefined}
        />
      </View>
    </View>
  );
}



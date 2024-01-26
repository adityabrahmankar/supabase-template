import { Button, KeyboardAvoidingView, Pressable, StyleSheet, TextInput, useColorScheme } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet'

import { PrimaryButton, Text, View } from '@/components/Themed';
import { useSupabase } from '@/hooks/useSupabase';
import { useRef, useState } from 'react';

export default function TabOneScreen() {
  const colorScheme = useColorScheme()
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const session = useSupabase()
  console.log(modalVisible)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  function closeModal() {
    bottomSheetModalRef.current?.dismiss()
    setModalVisible(false)
  }

  function handlePresentModalPress() {
    if (modalVisible) {
      closeModal()
    } else {
      bottomSheetModalRef.current?.present()
      setModalVisible(true)
    }
  }

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
      padding: 16,
      position: 'absolute',
      bottom: 20
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Where knowledge begins</Text>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <Pressable onPress={handlePresentModalPress} style={styles.searchBox} >
        <Text>Ask anything...</Text>
      </Pressable>
      <BottomSheetModalProvider>
        <BottomSheetModal
          onDismiss={() => setModalVisible(false)}
          ref={bottomSheetModalRef}
          enableDynamicSizing={true}
          backdropComponent={(props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />}
          enableDismissOnClose
          enablePanDownToClose
          backgroundStyle={{ backgroundColor: 'red', flex: 1 }}
        >
          <BottomSheetView>
            <KeyboardAvoidingView>
              <Text>Hello</Text>
              <TextInput
                placeholder='Ask anything...'
              />
            </KeyboardAvoidingView>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </View>
  );
}



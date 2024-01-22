import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type HeaderProps = {
    name : string
}

const Header = ({name}: HeaderProps) => {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        textAlign: 'center',
        backgroundColor: 'red',
        flexDirection: 'row'
    }
})
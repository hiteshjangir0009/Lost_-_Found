import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Home } from './screens/Home'
import { Stack_nav } from './navigation/Stack_nav/Stack_nav'


const App = () => {

  return (
    <NavigationContainer>
      <Stack_nav />
    </NavigationContainer>
  )
}

export default App
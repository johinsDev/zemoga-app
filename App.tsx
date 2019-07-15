import * as React from 'react'
import { StyleSheet, Text, ActivityIndicator } from 'react-native'
import { View } from 'native-base'

import { cacheImages } from './src/utils/cacheImages'
import images from './src/theme/images'
import Navigation from './src/navigation'
import { ListProvider } from './src/modules/posts/list/store/reducer'

export default function App() {
  const [isReady, setIsReady] = React.useState()

  React.useEffect(() => {
    cacheAssets()
  }, [])

  const cacheAssets = async () => {
    const imagesAssets = cacheImages([...Object.values(images)])

    try {
      await Promise.all([...imagesAssets])

      setIsReady(true)
    } catch (error) {
      console.log('ERROR LOADING IMAGES')
    }
  }

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <ListProvider>
      <Navigation />
    </ListProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

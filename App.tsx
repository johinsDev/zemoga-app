import * as React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { View } from 'native-base'
import { Font } from 'expo'

import { cacheImages } from './src/utils/cacheImages'
import images from './src/theme/images'
import Navigation from './src/navigation'
import { ListProvider } from './src/modules/posts/list/store/reducer'

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font))
}

export default function App() {
  const [isReady, setIsReady] = React.useState()

  React.useEffect(() => {
    cacheAssets()
  }, [])

  const cacheAssets = async () => {
    const imagesAssets = cacheImages([...Object.values(images)])
    const fontAssets = cacheFonts([
      { Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf') },
    ])

    try {
      await Promise.all([...imagesAssets, ...fontAssets])

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

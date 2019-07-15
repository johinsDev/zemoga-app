import * as React from 'react'
import { View, Text } from 'native-base'
import { Image } from 'react-native'

import fonts from '../../theme/fonts'
import images from '../../theme/images'
import colors from '../../theme/colors'
import { NavigationScreenProps } from 'react-navigation'

function SplashScreen({ navigation }: NavigationScreenProps) {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate('ListPost')
    }, 0)
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View padder={true}>
          <Image source={images.logo} />
        </View>
        <View padder={true}>
          <Text style={{ fontSize: fonts.size['2xl'] }}>
            JSON
            <Text style={{ fontSize: fonts.size['2xl'], color: colors.green }}>
              Placeholder
            </Text>
          </Text>
        </View>
        <Text style={{ fontSize: fonts.size.sm }}>Zemoga APP</Text>
      </View>
    </View>
  )
}

export default SplashScreen

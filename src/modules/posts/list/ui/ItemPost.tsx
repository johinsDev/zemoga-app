import * as React from 'react'
import { ListItem, Left, Icon, Text, Right } from 'native-base'
import { StyleSheet, Platform } from 'react-native'

import colors from '../../../../theme/colors'
import isPlatform from '../../../../utils/isPlatform'

const iosRightIcon = <Icon name="arrow-forward" />

const stylesStarIcon = StyleSheet.create({
  android: {
    marginLeft: 10,
  },
  ios: {
    marginRight: 10,
  },
})

const styles = StyleSheet.create({
  starIcon: {
    color: colors.yellow,
    alignSelf: 'center',
  },
  list: {
    minHeight: 90,
  },
  text: {
    color: colors.gray,
  },
  circleIcon: {
    color: colors.blue,
    marginRight: 10,
    alignSelf: 'center',
  },
})

const stylesLit = StyleSheet.create({
  android: {
    backgroundColor: colors.transparent,
  },
  ios: {
    backgroundColor: colors.white,
  },
})

export default function ItemPost() {
  const starIcon = (
    <Icon name="star" style={[styles.starIcon, stylesStarIcon[Platform.OS]]} />
  )

  return (
    <ListItem
      noIndent={true}
      button={true}
      onPress={console.log}
      style={[styles.list, stylesLit[Platform.OS]]}
    >
      <Left>
        {/* <Icon
          name="circle"
          style={styles.circleIcon}
          type="FontAwesome"
        /> */}
        {isPlatform({ platform: 'ios', isComponent: starIcon })}
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate,
          minus delectus qui amet reprehenderit nobis officiis maxime sit quas
          laudantium. Repellendus quo aspernatur aut alias atque quaerat.
          Minima, molestias veniam.
        </Text>
        {isPlatform({ platform: 'android', isComponent: starIcon })}
      </Left>
      <Right>
        {isPlatform({ platform: 'ios', isComponent: iosRightIcon })}
      </Right>
    </ListItem>
  )
}

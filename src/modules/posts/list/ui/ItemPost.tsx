import * as React from 'react'
import { View, Left, Icon, Text, Right, SwipeRow, Button } from 'native-base'
import { StyleSheet, Platform } from 'react-native'

import colors from '../../../../theme/colors'
import isPlatform from '../../../../utils/isPlatform'
import { IItem, useList } from '../store/reducer'
import pathOr from 'ramda/es/pathOr'
import actions from '../store/actions'
import { NavigationScreenProps, withNavigation } from 'react-navigation'

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
    fontSize: 14,
  },
  list: {
    minHeight: 90,
  },
  text: {
    color: colors.gray,
    alignSelf: 'center',
  },
  circleIcon: {
    color: colors.blue,
    marginRight: 10,
    fontSize: 14,
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

export function ItemPost({
  post,
  index,
  navigation,
}: {
  post: IItem
  index: number
} & NavigationScreenProps) {
  const [_, dispatch] = useList()

  const removeItem = React.useCallback(
    () => actions.removeItem(dispatch, index),
    [post]
  )

  const goTo = React.useCallback(() => {
    actions.updateItem(dispatch, index, { read: true })
    navigation.navigate('ShowPost', { post, index })
  }, [post, index])

  const iosRightIcon = React.useMemo(
    () => (
      <Button transparent={true} onPress={goTo}>
        <Icon name="arrow-forward" style={{ color: colors.gray }} />
      </Button>
    ),
    []
  )

  const starIcon = React.useMemo(
    () => (
      <Button transparent={true}>
        <Icon
          name="star"
          type="FontAwesome"
          style={[styles.starIcon, stylesStarIcon[Platform.OS]]}
        />
      </Button>
    ),
    []
  )

  const renderIcon = () => {
    if (!pathOr(false, ['read'], post)) {
      return (
        <Button transparent={true}>
          <Icon name="circle" style={styles.circleIcon} type="FontAwesome" />
        </Button>
      )
    }

    if (pathOr(false, ['isFavorite'], post)) {
      return isPlatform({
        platform: 'ios',
        isComponent: starIcon,
        notComponent: <View padder={true} />,
      })
    }

    return <View padder={true} />
  }

  return (
    <SwipeRow
      disableRightSwipe={true}
      recalculateHiddenLayout={true}
      rightOpenValue={-75}
      style={[styles.list, stylesLit[Platform.OS]]}
      right={
        <Button danger={true} onPress={removeItem}>
          <Icon active={true} name="trash" />
        </Button>
      }
      body={
        <View padder={true} style={{ flexDirection: 'row' }}>
          <Left style={{ flexDirection: 'row', flex: 4 }}>
            {renderIcon()}
            <Text style={styles.text}>{pathOr('', ['title'], post)}</Text>
            {pathOr(false, ['isFavorite'], post) &&
              isPlatform({ platform: 'android', isComponent: starIcon })}
          </Left>
          <Right style={{ flex: 1 }}>
            {isPlatform({ platform: 'ios', isComponent: iosRightIcon })}
          </Right>
        </View>
      }
    />
  )
}

export default withNavigation(ItemPost)

import * as React from 'react'
import { View, Left, Icon, Text, Right, SwipeRow, Button } from 'native-base'
import { StyleSheet, Platform, Alert, TouchableOpacity } from 'react-native'
import pathOr from 'ramda/es/pathOr'
import { NavigationScreenProps, withNavigation } from 'react-navigation'

import colors from '../../../../theme/colors'
import isPlatform from '../../../../utils/isPlatform'
import { IItem, useList } from '../store/reducer'
import actions from '../store/actions'

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
    backgroundColor: colors.background,
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

  const removeItem = React.useCallback(() => {
    Alert.alert(
      'Warning',
      'Are you sure to delete this post?',
      [
        {
          text: 'Cancel',
          onPress: () => ({}),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => actions.removeItem(dispatch, index) },
      ],
      { cancelable: false }
    )
  }, [post])

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
        <TouchableOpacity onPress={goTo} style={{ flex: 1, marginLeft: 15 }}>
          <View padder={true} style={{ flexDirection: 'row' }}>
            <Left style={{ flexDirection: 'row', flex: 4 }}>
              {renderIcon()}
              <Text style={styles.text}>{pathOr('', ['title'], post)}</Text>
            </Left>
            <Right style={{ flex: 1 }}>
              {isPlatform({
                platform: 'ios',
                isComponent: iosRightIcon,
              })}
              {pathOr(false, ['isFavorite'], post) &&
                isPlatform({ platform: 'android', isComponent: starIcon })}
            </Right>
          </View>
        </TouchableOpacity>
      }
    />
  )
}

export default withNavigation(ItemPost)

import * as React from 'react'
import {
  Container,
  View,
  Button,
  Icon,
  H1,
  Content,
  Text,
  ListItem,
  Spinner,
} from 'native-base'
import { Platform } from 'react-native'

import Header from '../../shared/Header'
import { styles, stylesDescription, styleCommentHeader } from './styles'
import { useList, IItem, IComment } from '../list/store/reducer'
import actions from '../list/store/actions'
import { NavigationScreenProps, FlatList } from 'react-navigation'
import pathOr from 'ramda/es/pathOr'
import colors from '../../../theme/colors'
import map from 'ramda/es/map'
import hasPath from 'ramda/es/hasPath'

export default function ShowPostView({ navigation }: NavigationScreenProps) {
  const [{ data }, dispatch] = useList()

  const index = navigation.getParam('index', {})
  const post: IItem = data[index]

  React.useEffect(() => {
    if (!hasPath(['user'], post)) {
      actions.getUser(dispatch, post.userId, index)
    }
    if (!hasPath(['comments'], post)) {
      actions.loadComments(dispatch, post.id, index)
    }
  }, [])

  const rightComponent = (
    <Button
      transparent={true}
      onPress={() => {
        actions.updateItem(dispatch, index, {
          isFavorite: pathOr(false, ['isFavorite'], post) ? false : true,
        })
      }}
    >
      <Icon
        style={[
          styles.starIcon,
          {
            color: pathOr(false, ['isFavorite'], post)
              ? colors.yellow
              : colors.white,
          },
        ]}
        name={pathOr(false, ['isFavorite'], post) ? 'star' : 'star-o'}
        type="FontAwesome"
      />
    </Button>
  )

  const renderComment = React.useCallback(
    ({ item }: { item: IComment; index: number }) => {
      return (
        <ListItem style={styles.commentCard} noIndent={true} key={item.id}>
          <Text style={styles.comment}>{pathOr('', ['body'], item)}</Text>
        </ListItem>
      )
    },
    []
  )

  return (
    <Container style={styles.container}>
      <Header back={true} rightComponent={rightComponent} title="Post" />

      <Content>
        <View padder={true}>
          <H1 style={styles['mh-10']}>Description</H1>

          <Text
            style={[
              styles['mh-10'],
              styles.colorGray,
              stylesDescription[Platform.OS],
            ]}
          >
            {pathOr('', ['body'], post)}
          </Text>

          <H1 style={styles['mh-10']}>User</H1>

          <Text style={[styles['mh-10'], styles.colorGray]}>
            Name: {pathOr('', ['user', 'name'], post)}
          </Text>
          <Text style={[styles['mh-10'], styles.colorGray]}>
            Email {pathOr('', ['user', 'email'], post)}
          </Text>
          <Text style={[styles['mh-10'], styles.colorGray]}>
            Phone: {pathOr('', ['user', 'phone'], post)}
          </Text>
          <Text style={[styles['mh-10'], styles.colorGray]}>
            Website: {pathOr('', ['user', 'website'], post)}
          </Text>
        </View>

        <View style={styles.commentHeader}>
          <Text style={styleCommentHeader[Platform.OS]}>COMMENTS</Text>
        </View>

        <View style={{ flex: 1 }} padder={Platform.OS === 'ios' ? true : false}>
          {!post.comments ? (
            <Spinner color={colors.green} />
          ) : (
            <FlatList
              data={post.comments}
              style={styles.container}
              renderItem={renderComment}
              initialNumToRender={20}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              removeClippedSubviews={true}
              keyExtractor={(item: IComment) => {
                return `item-${item.id}`
              }}
              onEndReachedThreshold={0.7}
            />
          )}
        </View>
      </Content>
    </Container>
  )
}

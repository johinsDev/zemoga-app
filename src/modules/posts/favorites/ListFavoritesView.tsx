import * as React from 'react'
import { Container, View } from 'native-base'
import { FlatList, StyleSheet } from 'react-native'

import colors from '../../../theme/colors'
import ListEmptyComponent from '../../shared/ListEmptyComponent'
import useFavorites from '../list/store/useFavorites'
import { IItem, useList } from '../list/store/reducer'
import actions from '../list/store/actions'
import DeleteAllButton from '../list/ui/DeleteAllButton'
import ItemPost from '../list/ui/ItemPost'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})

export default function ListFavoritesView() {
  const [state, dispatch] = useList()
  const favorites = useFavorites()

  React.useEffect(() => {
    actions.loadPosts(dispatch, state.page)
  }, [state.page])

  const renderItem = ({ item, index }: { item: IItem; index: number }) => (
    <ItemPost post={item} index={index} />
  )

  const _listEmptyComponent = React.useCallback(() => {
    return <ListEmptyComponent />
  }, [state.loading])

  return (
    <Container style={{ backgroundColor: colors.background }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={favorites}
          style={styles.container}
          renderItem={renderItem}
          initialNumToRender={20}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          removeClippedSubviews={true}
          ListEmptyComponent={_listEmptyComponent}
          keyExtractor={(item: IItem) => {
            return `item-${item.id}`
          }}
        />
      </View>

      <DeleteAllButton onPress={() => actions.removeAll(dispatch)} />
    </Container>
  )
}

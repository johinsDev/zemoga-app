import * as React from 'react'
import { Container, View, Button, Icon } from 'native-base'
import { FlatList, StyleSheet } from 'react-native'

import Header from '../../shared/Header'
import colors from '../../../theme/colors'
import Tabs from '../../shared/Tabs'
import DeleteAllButton from './ui/DeleteAllButton'
import ItemPost from './ui/ItemPost'
import { useList, IItem } from './store/reducer'
import actions from './store/actions'
import ListEmptyComponent from '../../shared/ListEmptyComponent'
import FooterLoading from '../../shared/FooterLoading'

const tabs = [{ title: 'ALL' }, { title: 'FAVORITES' }]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})

export default function ListPostsView() {
  const [state, dispatch] = useList()

  React.useEffect(() => {
    actions.loadPosts(dispatch, state.page)
  }, [state.page])

  const renderItem = ({ item, index }: { item: IItem; index: number }) => (
    <ItemPost post={item} index={index} />
  )

  const handleOnEndReached = React.useCallback(() => {
    const { loading, totalPages, page } = state

    if (!loading && page <= totalPages && totalPages > 1) {
      dispatch({ type: 'INC_PAGE' })
    }
  }, [state.page, state.totalPages, state.loading])

  const handleRefresh = React.useCallback(() => {
    dispatch({ type: 'INIT_PAGE' })
  }, [])

  const _listEmptyComponent = React.useCallback(() => {
    return <ListEmptyComponent />
  }, [state.loading])

  const renderFooter = React.useCallback(() => <FooterLoading />, [])

  return (
    <Container style={{ backgroundColor: colors.background }}>
      <Header
        hasTabs={true}
        title="Posts"
        rightComponent={
          <Button
            transparent={true}
            onPress={() => actions.refreshPosts(dispatch)}
          >
            <Icon name="refresh" style={{ color: colors.white }} />
          </Button>
        }
      />

      <Tabs tabs={tabs} />

      <View style={{ flex: 1 }}>
        <FlatList
          data={state.data}
          style={styles.container}
          renderItem={renderItem}
          initialNumToRender={20}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          removeClippedSubviews={true}
          ListEmptyComponent={_listEmptyComponent}
          ListFooterComponent={renderFooter}
          refreshing={state.refreshing}
          onRefresh={handleRefresh}
          keyExtractor={(item: IItem) => {
            return `item-${item.id}`
          }}
          onEndReachedThreshold={0.7}
          onEndReached={handleOnEndReached}
        />
      </View>

      <DeleteAllButton onPress={() => actions.removeAll(dispatch)} />
    </Container>
  )
}

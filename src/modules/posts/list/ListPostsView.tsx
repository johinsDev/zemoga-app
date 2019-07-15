import * as React from 'react'
import { Container, View, Button, Icon } from 'native-base'
import { FlatList, StyleSheet } from 'react-native'

import Header from '../../shared/Header'
import colors from '../../../theme/colors'
import Tabs from '../../shared/Tabs'
import DeleteAllButton from './ui/DeleteAllButton'
import ItemPost from './ui/ItemPost'

const tabs = [{ title: 'ALL' }, { title: 'FAVORITES' }]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})

export default function ListPostsView() {
  const renderItem = () => <ItemPost />

  return (
    <Container style={{ backgroundColor: colors.background }}>
      <Header
        hasTabs={true}
        title="Posts"
        rightComponent={
          <Button transparent={true}>
            <Icon name="refresh" style={{ color: colors.white }} />
          </Button>
        }
      />

      <Tabs tabs={tabs} />

      <View style={{ flex: 1 }}>
        <FlatList
          data={['1', '2']}
          style={styles.container}
          renderItem={renderItem}
          initialNumToRender={20}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          removeClippedSubviews={true}
          keyExtractor={index => `item-${index}`}
          onEndReachedThreshold={0.7}
        />
      </View>

      <DeleteAllButton />
    </Container>
  )
}

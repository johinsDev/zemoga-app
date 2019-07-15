import { Content, Spinner, Text } from 'native-base'
import * as React from 'react'
import colors from '../../theme/colors'
import { useList } from '../posts/list/store/reducer'

export default function ListEmptyComponent() {
  const [{ loading }] = useList()

  let node = (
    <Text note={true} style={{ marginTop: 50 }}>
      No hay datos
    </Text>
  )

  if (loading) {
    node = <Spinner color={colors.green} />
  }

  return (
    <Content
      padder={true}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      style={{ flex: 1 }}
    >
      {node}
    </Content>
  )
}

import * as React from 'react'
import { View, Spinner } from 'native-base'
import { useList } from '../posts/list/store/reducer'

export default function FooterLoading() {
  const [{ loading, data }] = useList()

  if (loading && data.length !== 0) {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderColor: '#CED0CE',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spinner color="#ffaf4d" />
      </View>
    )
  }
  return <View />
}

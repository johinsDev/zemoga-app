import * as React from 'react'
import Header from '../../shared/Header'
import { Button, Icon } from 'native-base'
import Tabs from '../../shared/Tabs'
import colors from '../../../theme/colors'
import actions from '../list/store/actions'
import { useList } from '../list/store/reducer'
import { withNavigation, NavigationScreenProps } from 'react-navigation'

const tabs = [
  { route: 'ListPost', title: 'ALL' },
  { route: 'FavoroitesPosts', title: 'FAVORITES' },
]

export function HeaderWithTabs({ navigation }: NavigationScreenProps) {
  const [_, dispatch] = useList()

  return (
    <>
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

      <Tabs
        tabs={tabs}
        onChangeTab={({ i }) => navigation.navigate(tabs[i].route)}
      />
    </>
  )
}

export default withNavigation(HeaderWithTabs)

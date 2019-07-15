import * as React from 'react'
import { Tabs as TabsNV, Tab, NativeBase } from 'native-base'
import { StyleSheet, Platform } from 'react-native'
import colors from '../../theme/colors'
import map from 'ramda/es/map'
import findIndex from 'ramda/es/findIndex'
import propEq from 'ramda/es/propEq'

// STYLES GLOBAL
const styles = StyleSheet.create({
  content: {
    flex: 0,
  },
})

// STYLES TABS WRAPPER
const tabsStyle = StyleSheet.create({
  ios: {
    padding: 10,
    backgroundColor: colors.transparent,
  },
  android: {},
})

// STYLES FOR ACTIVE TAB
const tabBarUnderlineStyle = StyleSheet.create({
  android: {
    backgroundColor: colors.white,
  },
  ios: {
    backgroundColor: colors.transparent,
  },
})

// STYLES FOR EACH TAB
const tabStyle = StyleSheet.create({
  borderLeft: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  borderRight: {
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  iostabColor: {
    backgroundColor: colors.transparent,
    borderColor: colors.green,
    borderWidth: 1,
  },
  iostextColor: {
    color: colors.green,
  },
  iostabColorActive: {
    backgroundColor: colors.green,
  },
  iostextColorActive: {
    color: colors.white,
  },
  androidtabColor: {
    backgroundColor: colors.primary,
  },
  androidtextColor: {
    color: colors.white,
  },
  androidtabColorActive: {
    backgroundColor: colors.primary,
  },
  androidtextColorActive: {
    color: colors.white,
  },
})

export interface ITabsProps extends NativeBase.Tabs {
  tabs: Array<{ title: string }>
}

function Tabs({ tabs, ...rest }: ITabsProps) {
  const renderTab = React.useCallback(
    ({ title }) => {
      const index = findIndex(propEq('title', title), tabs)
      const isLastIndex = index === tabs.length - 1

      let tabStyles = {}

      if (Platform.OS === 'ios') {
        tabStyles = isLastIndex ? tabStyle.borderRight : tabStyle.borderLeft
      }

      return (
        <Tab
          key={`tab-${title}`}
          tabStyle={[tabStyle[`${Platform.OS}tabColor`], tabStyles]}
          activeTabStyle={[tabStyle[`${Platform.OS}tabColorActive`], tabStyles]}
          activeTextStyle={tabStyle[`${Platform.OS}textColorActive`]}
          textStyle={tabStyle[`${Platform.OS}textColor`]}
          heading={title}
        />
      )
    },
    [tabs]
  )

  return (
    <TabsNV
      {...rest}
      locked={true}
      style={[styles.content, tabsStyle[Platform.OS]]}
      tabBarUnderlineStyle={tabBarUnderlineStyle[Platform.OS]}
    >
      {map(renderTab, tabs)}
    </TabsNV>
  )
}

export default Tabs

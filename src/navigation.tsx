import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation'
import * as React from 'react'

import ListPostsView from './modules/posts/list/ListPostsView'
import HeaderWithTabs from './modules/posts/shared/HeaderWithTabs'
import ListFavoritesView from './modules/posts/favorites/ListFavoritesView'
import ShowPostView from './modules/posts/show/ShowPostView'

const PostTanTop = createMaterialTopTabNavigator(
  {
    ListPost: { screen: ListPostsView },
    FavoroitesPosts: { screen: ListFavoritesView },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarComponent: () => {
      return <HeaderWithTabs />
    },
  }
)

const PostStack = createStackNavigator(
  {
    Tab: PostTanTop,
    ShowPost: { screen: ShowPostView },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  }
)

const MainNavigator = createStackNavigator(
  {
    Posts: PostStack,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  }
)

const AppNavigator = createSwitchNavigator(
  {
    Splash: {
      getScreen: () => require('./modules/splash/SplashView').default,
    },
    Main: MainNavigator,
  },
  {
    initialRouteName: 'Splash',
  }
)

export default createAppContainer(AppNavigator)

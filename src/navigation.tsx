import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation'

const PostStack = createStackNavigator({
  ListPosts: {
    getScreen: () => require('./modules/posts/list/ListPostsView').default,
  },
})

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

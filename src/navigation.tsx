import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
} from 'react-navigation'

const PostStack = createStackNavigator({
  ListPosts: {
    getScreen: () => require('./modules/posts/list/ListPostsView').default,
    navigationOptions: {
      header: null,
    },
  },
  ShowPost: {
    getScreen: () => require('./modules/posts/show/ShowPostView').default,
    navigationOptions: {
      header: null,
    },
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
